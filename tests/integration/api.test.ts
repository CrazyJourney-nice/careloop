import { describe, expect, it } from 'vitest';
import { preview, orders, kitchen, menuItems } from '../../src/api/orders';
import { Order } from '../../packages/domain/src/models/Order';
import { OrderStatus } from '../../packages/domain/src/models/OrderStatus';

describe('order service/API contract',()=>{it('previews, confirms and creates a kitchen task',()=>{const p=preview({tableId:'TBL-A12',items:[{dishId:'DISH-003',quantity:1}]});expect(p.tableNumber).toBe('A12');const o=new Order({id:`IT-${Date.now()}`,canteenId:'CAN001',createdByUserId:'USR-002',customerUserId:'USR-002',tableId:p.tableId,items:p.items});orders.set(o.id,o);o.updateStatus(OrderStatus.CONFIRMED);o.updateStatus(OrderStatus.PAY_AT_COUNTER);o.updateStatus(OrderStatus.SENT_TO_KITCHEN);const task=kitchen.create(o.id);expect(task.orderId).toBe(o.id);});it('rejects invalid table numbers and unknown dishes',()=>{expect(()=>preview({tableNumber:'Z99',items:[{dishId:'DISH-003'}]})).toThrow();expect(()=>preview({tableId:'TBL-A12',items:[{dishId:'unknown'}]})).toThrow();expect(menuItems.size).toBeGreaterThan(5);});});
