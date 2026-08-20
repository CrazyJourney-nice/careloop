import { afterEach, describe, expect, it } from 'vitest';
import { createMenuItem, serializeAdminOrder, updateMenuItem } from '../../src/api/admin';
import { menuItems, orders, preview } from '../../src/api/orders';
import { Order } from '../../packages/domain/src/models/Order';

const createdMenuIds: string[] = [];
const createdOrderIds: string[] = [];

afterEach(() => {
  createdMenuIds.splice(0).forEach(id => menuItems.delete(id));
  createdOrderIds.splice(0).forEach(id => orders.delete(id));
});

describe('admin management services', () => {
  it('creates and updates a menu item that is shared with ordering', () => {
    const item = createMenuItem({
      name:'时蔬汤', nameEn:'Seasonal vegetable soup', description:'每日时蔬', descriptionEn:'Daily seasonal vegetables', priceCents:480,
      category:'STARTER', available:true, supportedModifiers:['少盐'], allergens:[]
    });
    createdMenuIds.push(item.id);
    expect(menuItems.get(item.id)?.name).toBe('时蔬汤');
    expect(menuItems.get(item.id)?.nameEn).toBe('Seasonal vegetable soup');
    expect(preview({ tableId:'TBL-A12', items:[{ dishId:item.id }] }).totalCents).toBe(480);

    updateMenuItem(item.id, { available:false, priceCents:520, nameEn:'Garden vegetable soup' });
    expect(menuItems.get(item.id)).toMatchObject({ available:false, priceCents:520, nameEn:'Garden vegetable soup' });
    expect(() => preview({ tableId:'TBL-A12', items:[{ dishId:item.id }] })).toThrow('Dish is unavailable');
  });

  it('validates menu prices', () => {
    expect(() => createMenuItem({ name:'无效菜品', priceCents:0 })).toThrow();
  });

  it('adds customer, table and total fields to admin order data', () => {
    const orderPreview = preview({ tableId:'TBL-A12', items:[{ dishId:'DISH-003', quantity:2 }] });
    const order = new Order({
      id:`ADMIN-IT-${Date.now()}`, canteenId:'CAN001', createdByUserId:'USR-002',
      customerUserId:'USR-002', tableId:orderPreview.tableId, items:orderPreview.items
    });
    createdOrderIds.push(order.id);
    orders.set(order.id, order);
    expect(serializeAdminOrder(order)).toMatchObject({ customerName:'李阿姨', tableNumber:'A12', totalCents:1500 });
  });
});
