import { z } from 'zod';
import { OrderStatus } from './OrderStatus';
import { User } from './User';
import { Table } from './Table';
import { Dish } from './Dish';
import { Canteen } from './Canteen';

export class Order {
  id: string;
  orderNumber: string;
  canteenId: string;
  createdByUserId: string;
  customerUserId: string;
  payerUserId?: string;
  tableId: string;
  source: 'SELF' | 'FOR_OTHERS' | 'STAFF' | 'VOICE';
  status: OrderStatus;
  paymentMethod?: 'CASH' | 'WECHAT' | 'ALIPAY' | 'COUNTER';
  language: 'zh-CN' | 'zh-HK' | 'en';
  voiceTranscript?: string;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
  statusHistory: OrderStatusHistory[];

  constructor(data: Partial<Order> & { items?: OrderItem[] }) {
    this.id = data.id || this.generateOrderId();
    this.orderNumber = data.orderNumber || this.generateOrderNumber();
    this.canteenId = data.canteenId!;
    this.createdByUserId = data.createdByUserId!;
    this.customerUserId = data.customerUserId!;
    this.payerUserId = data.payerUserId;
    this.tableId = data.tableId!;
    this.source = data.source || 'SELF';
    this.status = data.status || OrderStatus.DRAFT;
    this.paymentMethod = data.paymentMethod;
    this.language = data.language || 'zh-CN';
    this.voiceTranscript = data.voiceTranscript;
    this.specialInstructions = data.specialInstructions;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.items = data.items || [];
    this.statusHistory = data.statusHistory || [];

    this.validate();
  }

  private generateOrderId(): string {
    return `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 8)}`;
  }

  private generateOrderNumber(): string {
    const canteenCode = this.canteenId.slice(0, 3).toUpperCase();
    return `CL${canteenCode}-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
  }

  private validate() {
    if (!this.createdByUserId) throw new Error('createdByUserId is required');
    if (!this.customerUserId) throw new Error('customerUserId is required');
    if (!this.tableId) throw new Error('tableId is required');
    if (!this.items || this.items.length === 0) throw new Error('At least one item is required');
    this.items.forEach(item => item.validate());
    this.statusHistory.push({
      status: this.status,
      timestamp: this.createdAt,
      notes: 'Initial order created'
    });
  }

  updateStatus(newStatus: OrderStatus, notes?: string) {
    this.status = newStatus;
    this.updatedAt = new Date();
    this.statusHistory.push({
      status: newStatus,
      timestamp: this.updatedAt,
      notes: notes || `Status changed to ${newStatus}`
    });
    return this;
  }

  addItem(item: OrderItem) {
    this.items.push(item);
    this.updatedAt = new Date();
    return this;
  }

  removeItem(dishId: string) {
    this.items = this.items.filter(item => item.dishId !== dishId);
    this.updatedAt = new Date();
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      orderNumber: this.orderNumber,
      canteenId: this.canteenId,
      createdByUserId: this.createdByUserId,
      customerUserId: this.customerUserId,
      payerUserId: this.payerUserId,
      tableId: this.tableId,
      source: this.source,
      status: this.status,
      paymentMethod: this.paymentMethod,
      language: this.language,
      voiceTranscript: this.voiceTranscript,
      specialInstructions: this.specialInstructions,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      items: this.items.map(item => item.toJSON()),
      statusHistory: this.statusHistory
    };
  }
}

export class OrderItem {
  id: string;
  dishId: string;
  dishNameSnapshot: string;
  unitPriceCents: number;
  quantity: number;
  modifiers: any = {};
  allergenWarnings: any = {};
  specialInstructions?: string;

  constructor(data: Partial<OrderItem>) {
    this.id = data.id || `ITEM-${Date.now().toString(36).substring(2)}`;
    this.dishId = data.dishId!;
    this.dishNameSnapshot = data.dishNameSnapshot!;
    this.unitPriceCents = data.unitPriceCents!;
    this.quantity = data.quantity || 1;
    this.modifiers = data.modifiers || {};
    this.allergenWarnings = data.allergenWarnings || {};
    this.specialInstructions = data.specialInstructions;
  }

  validate() {
    if (!this.dishId) throw new Error('dishId is required');
    if (!this.dishNameSnapshot) throw new Error('dishNameSnapshot is required');
    if (this.unitPriceCents <= 0) throw new Error('unitPriceCents must be positive');
    if (this.quantity < 1) throw new Error('quantity must be at least 1');
  }

  toJSON() {
    return {
      id: this.id,
      dishId: this.dishId,
      dishNameSnapshot: this.dishNameSnapshot,
      unitPriceCents: this.unitPriceCents,
      quantity: this.quantity,
      modifiers: this.modifiers,
      allergenWarnings: this.allergenWarnings,
      specialInstructions: this.specialInstructions
    };
  }
}

export class OrderStatusHistory {
  status: OrderStatus;
  timestamp: Date;
  notes: string;
}

export enum OrderStatus {
  DRAFT = 'DRAFT',
  PENDING_CONFIRMATION = 'PENDING_CONFIRMATION',
  CONFIRMED = 'CONFIRMED',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  PAID = 'PAID',
  PAY_AT_COUNTER = 'PAY_AT_COUNTER',
  SENT_TO_KITCHEN = 'SENT_TO_KITCHEN',
  COOKING = 'COOKING',
  READY_FOR_DELIVERY = 'READY_FOR_DELIVERY',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
  NEEDS_STAFF = 'NEEDS_STAFF'
}