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

export class OrderStatusHistory {
  status: OrderStatus;
  timestamp: Date;
  notes: string;

  constructor(status: OrderStatus, notes: string) {
    this.status = status;
    this.timestamp = new Date();
    this.notes = notes;
  }
}