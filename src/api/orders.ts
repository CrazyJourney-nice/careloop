import express, { Request, Response } from 'express';
import { Order, OrderStatus } from '../../packages/domain/src/models/Order';
import { MenuItem } from '../../packages/domain/src/models/MenuItem';
import { Table } from '../../packages/domain/src/models/Table';
import { User } from '../../packages/domain/src/models/User';
import { KitchenTask } from '../../packages/domain/src/models/KitchenTask';

const router = express.Router();

// In-memory store for demo (v0.1.0)
const orders = new Map<string, Order>();
const tables = new Map<string, Table>();
const menuItems = new Map<string, MenuItem>();
const users = new Map<string, User>();
const kitchenTasks = new Map<string, KitchenTask>();

// Seed demo data
function seedDemoData() {
  // Users
  const user1 = new User({ name: '张三', phone: '13800138000', isElder: false });
  const user2 = new User({ name: '李阿姨', phone: '13900139000', isElder: true });
  users.set(user1.id, user1);
  users.set(user2.id, user2);

  // Tables
  const table1 = new Table({ canteenId: 'CAN001', tableNumber: 'A12', capacity: 4, area: 'A' });
  const table2 = new Table({ canteenId: 'CAN001', tableNumber: 'B05', capacity: 6, area: 'B' });
  tables.set(table1.id, table1);
  tables.set(table2.id, table2);

  // Menu Items
  const menuItemsData = [
    { name: '宫保鸡丁', description: '经典宫保鸡丁，口味浓郁', priceCents: 680, category: 'MAIN' as const },
    { name: '清蒸鱼', description: '清蒸鲜鱼，营养十足', priceCents: 920, category: 'MAIN' as const },
    { name: '红烧肉', description: '肥而不腻的红烧肉', priceCents: 750, category: 'MAIN' as const },
    { name: '酸辣土豆丝', description: '酸辣爽口下酒菜', priceCents: 420, category: 'SIDE' as const },
    { name: '可乐', description: '经典汽水', priceCents: 380, category: 'DRINK' as const },
  ];

  menuItemsData.forEach(item => {
    const dish = new MenuItem({ ...item, canteenId: 'CAN001' });
    menuItems.set(dish.id, dish);
  });

  // Initial order
  const order1 = new Order({
    createdByUserId: user1.id,
    customerUserId: user2.id,
    tableId: table1.id,
    items: [
      { dishId: menuItems.get('宫保鸡丁')!.id!, dishNameSnapshot: '宫保鸡丁', unitPriceCents: 680, quantity: 1 },
      { dishId: menuItems.get('可乐')!.id!, dishNameSnapshot: '可乐', unitPriceCents: 380, quantity: 2 }
    ],
    source: 'SELF'
  });
  orders.set(order1.id, order1);
}

seedDemoData();

// GET /api/orders
router.get('/orders', (req: Request, res: Response) => {
  const allOrders = Array.from(orders.values()).map(o => o.toJSON());
  res.json(allOrders);
});

// GET /api/orders/:id
router.get('/orders/:id', (req: Request, res: Response) => {
  const order = orders.get(req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order.toJSON());
});

// POST /api/orders
router.post('/orders', (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const newOrder = new Order({
      ...orderData,
      createdByUserId: 'USR-001', // demo
      customerUserId: 'USR-002',
      tableId: 'TBL-001'
    });
    orders.set(newOrder.id, newOrder);
    res.status(201).json(newOrder.toJSON());
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH /api/orders/:id/status
router.patch('/orders/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  const order = orders.get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  order.updateStatus(status);
  res.json(order.toJSON());
});

// POST /api/kitchen-tasks
router.post('/kitchen-tasks', (req: Request, res: Response) => {
  const task = new KitchenTask(req.body);
  kitchenTasks.set(task.id, task);
  res.status(201).json(task.toJSON());
});

export default router;