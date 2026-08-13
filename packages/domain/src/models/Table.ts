import { z } from 'zod';

export class Table {
  id: string;
  canteenId: string;
  tableNumber: string;
  area: string;
  capacity: number;
  status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'CLEANING';
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Table>) {
    this.id = data.id || `TBL-${Date.now().toString(36).substring(2)}`;
    this.canteenId = data.canteenId!;
    this.tableNumber = data.tableNumber!;
    this.area = data.area || 'A';
    this.capacity = data.capacity || 4;
    this.status = data.status || 'AVAILABLE';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  updateStatus(newStatus: Table['status']) {
    this.status = newStatus;
    this.updatedAt = new Date();
    return this;
  }

  isAvailable() {
    return this.status === 'AVAILABLE';
  }

  toJSON() {
    return {
      id: this.id,
      canteenId: this.canteenId,
      tableNumber: this.tableNumber,
      area: this.area,
      capacity: this.capacity,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}