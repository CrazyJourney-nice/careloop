import express from 'express';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { MenuItem } from '../../packages/domain/src/models/MenuItem';
import { OrderStatus } from '../../packages/domain/src/models/OrderStatus';
import { emit, menuItems, orders, tables, users } from './orders';

export const adminRouter = express.Router();

const categories = ['STARTER', 'MAIN', 'SIDE', 'DRINK', 'DESSERT', 'SET'] as const;
const menuInput = z.object({
  name: z.string().trim().min(1, '菜品名称不能为空').max(60),
  nameEn: z.string().trim().min(1, '英文菜品名称不能为空').max(100),
  description: z.string().trim().max(240).default(''),
  descriptionEn: z.string().trim().max(300).default(''),
  priceCents: z.coerce.number().int().positive('价格必须大于 0'),
  category: z.enum(categories).default('MAIN'),
  available: z.boolean().default(true),
  allergens: z.array(z.string().trim().min(1)).default([]),
  supportedModifiers: z.array(z.string().trim().min(1)).default([]),
  imageUrl: z.string().trim().url('图片地址格式不正确').optional().or(z.literal(''))
});

const orderStatuses = new Set(Object.values(OrderStatus));
const revenueStatuses = new Set<OrderStatus>([
  OrderStatus.PAID, OrderStatus.SENT_TO_KITCHEN, OrderStatus.COOKING,
  OrderStatus.READY_FOR_DELIVERY, OrderStatus.DELIVERING, OrderStatus.DELIVERED,
  OrderStatus.COMPLETED
]);

function totalCents(order: { items: Array<{ unitPriceCents:number; quantity:number }> }) {
  return order.items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);
}

export function serializeAdminOrder(order: (typeof orders extends Map<string, infer T> ? T : never)) {
  const value = order.toJSON();
  const table = tables.get(order.tableId);
  const customer = users.get(order.customerUserId);
  return { ...value, tableNumber: table?.tableNumber || order.tableId, customerName: customer?.name || order.customerUserId, totalCents: totalCents(order) };
}

export function createMenuItem(input: unknown) {
  const data = menuInput.parse(input);
  const item = new MenuItem({
    id: `DISH-${randomUUID().slice(0, 8).toUpperCase()}`,
    canteenId: 'CAN001',
    ...data,
    imageUrl: data.imageUrl || undefined
  });
  menuItems.set(item.id, item);
  emit('menu.updated', { action:'CREATED', item:item.toJSON() });
  return item;
}

export function updateMenuItem(id: string, input: unknown) {
  const current = menuItems.get(id);
  if (!current) throw new Error('MENU_ITEM_NOT_FOUND');
  const data = menuInput.partial().parse(input);
  Object.assign(current, data, { imageUrl: data.imageUrl === '' ? undefined : data.imageUrl ?? current.imageUrl, updatedAt: new Date() });
  emit('menu.updated', { action:'UPDATED', item:current.toJSON() });
  return current;
}

function dateStart(value: unknown) {
  if (!value) return undefined;
  const date = new Date(`${String(value)}T00:00:00`);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function dateEnd(value: unknown) {
  if (!value) return undefined;
  const date = new Date(`${String(value)}T23:59:59.999`);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

adminRouter.get('/summary', (_req, res) => {
  const all = [...orders.values()];
  const today = new Date();
  const todayOrders = all.filter(order => order.createdAt.toDateString() === today.toDateString());
  const revenueOrders = all.filter(order => revenueStatuses.has(order.status));
  const revenueCents = revenueOrders.reduce((sum, order) => sum + totalCents(order), 0);
  const dishSales = new Map<string, { name:string; quantity:number; revenueCents:number }>();
  all.filter(order => order.status !== OrderStatus.CANCELLED && order.status !== OrderStatus.REJECTED).forEach(order => order.items.forEach(item => {
    const dish = dishSales.get(item.dishId) || { name:item.dishNameSnapshot, quantity:0, revenueCents:0 };
    dish.quantity += item.quantity;
    dish.revenueCents += item.unitPriceCents * item.quantity;
    dishSales.set(item.dishId, dish);
  }));
  res.json({
    menuCount: menuItems.size,
    availableMenuCount: [...menuItems.values()].filter(item => item.available).length,
    orderCount: all.length,
    todayOrderCount: todayOrders.length,
    revenueCents,
    averageOrderCents: revenueOrders.length ? Math.round(revenueCents / revenueOrders.length) : 0,
    topDishes: [...dishSales.entries()].map(([dishId, value]) => ({ dishId, ...value })).sort((a,b) => b.quantity - a.quantity).slice(0,5)
  });
});

adminRouter.get('/menu', (req, res) => {
  const query = String(req.query.q || '').trim().toLowerCase();
  const category = String(req.query.category || '');
  const available = String(req.query.available || '');
  const items = [...menuItems.values()].filter(item =>
    (!query || `${item.name} ${item.nameEn || ''} ${item.description} ${item.descriptionEn || ''}`.toLowerCase().includes(query)) &&
    (!category || item.category === category) &&
    (!available || String(item.available) === available)
  ).sort((a,b) => Number(b.available) - Number(a.available) || b.updatedAt.getTime() - a.updatedAt.getTime());
  res.json(items.map(item => item.toJSON()));
});

adminRouter.post('/menu', (req, res) => {
  try { res.status(201).json(createMenuItem(req.body).toJSON()); }
  catch (error) { res.status(400).json({ error: error instanceof Error ? error.message : '菜品数据不正确' }); }
});

adminRouter.patch('/menu/:id', (req, res) => {
  try { res.json(updateMenuItem(req.params.id, req.body).toJSON()); }
  catch (error) {
    const message = error instanceof Error ? error.message : '菜品数据不正确';
    res.status(message === 'MENU_ITEM_NOT_FOUND' ? 404 : 400).json({ error: message === 'MENU_ITEM_NOT_FOUND' ? '菜品不存在' : message });
  }
});

adminRouter.delete('/menu/:id', (req, res) => {
  const item = menuItems.get(req.params.id);
  if (!item) return res.status(404).json({ error:'菜品不存在' });
  const referenced = [...orders.values()].some(order => order.items.some(line => line.dishId === item.id));
  if (referenced) return res.status(409).json({ error:'该菜品已有订单记录，请改为下架以保留历史数据' });
  menuItems.delete(item.id);
  emit('menu.updated', { action:'DELETED', itemId:item.id });
  res.status(204).send();
});

function filteredOrders(query: express.Request['query']) {
  const keyword = String(query.q || '').trim().toLowerCase();
  const status = String(query.status || '');
  const source = String(query.source || '');
  const from = dateStart(query.dateFrom);
  const to = dateEnd(query.dateTo);
  return [...orders.values()].filter(order => {
    const serialized = serializeAdminOrder(order);
    return (!keyword || `${serialized.id} ${serialized.orderNumber} ${serialized.customerName} ${serialized.tableNumber} ${order.items.map(i => i.dishNameSnapshot).join(' ')}`.toLowerCase().includes(keyword)) &&
      (!status || order.status === status) && (!source || order.source === source) &&
      (!from || order.createdAt >= from) && (!to || order.createdAt <= to);
  }).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
}

adminRouter.get('/orders', (req, res) => {
  const result = filteredOrders(req.query);
  const page = Math.max(1, Number(req.query.page || 1));
  const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize || 20)));
  const start = (page - 1) * pageSize;
  res.json({ items:result.slice(start, start + pageSize).map(serializeAdminOrder), meta:{ page, pageSize, total:result.length, totalPages:Math.max(1, Math.ceil(result.length / pageSize)) } });
});

adminRouter.get('/orders/export.csv', (req, res) => {
  const escape = (value: unknown) => `"${String(value ?? '').replaceAll('"','""')}"`;
  const rows = filteredOrders(req.query).map(order => {
    const value = serializeAdminOrder(order);
    return [value.orderNumber, value.createdAt, value.customerName, value.tableNumber, value.source, value.status, value.items.map(item => `${item.dishNameSnapshot}×${item.quantity}`).join('；'), (value.totalCents / 100).toFixed(2)].map(escape).join(',');
  });
  res.setHeader('Content-Type','text/csv; charset=utf-8');
  res.setHeader('Content-Disposition',`attachment; filename="careloop-orders-${new Date().toISOString().slice(0,10)}.csv"`);
  res.send(`\uFEFF订单号,下单时间,顾客,桌号,来源,状态,菜品,金额（元）\n${rows.join('\n')}`);
});

adminRouter.get('/orders/:id', (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error:'订单不存在' });
  res.json(serializeAdminOrder(order));
});

adminRouter.patch('/orders/:id/status', (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error:'订单不存在' });
  const status = String(req.body.status || '') as OrderStatus;
  if (!orderStatuses.has(status)) return res.status(400).json({ error:'订单状态不正确' });
  try {
    order.updateStatus(status, String(req.body.notes || '管理员更新订单状态'));
    res.json(serializeAdminOrder(order));
  } catch (error) { res.status(409).json({ error:error instanceof Error ? error.message : '无法更新订单状态' }); }
});

export default adminRouter;
