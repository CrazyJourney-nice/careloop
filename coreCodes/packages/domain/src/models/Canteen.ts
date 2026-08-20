import { z } from 'zod';

export class Canteen {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  status: 'OPEN' | 'CLOSED' | 'MAINTENANCE';
  operatingHours: any = { weekdays: '11:00-14:00,17:00-21:00' };
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Canteen>) {
    this.id = data.id || `CAN-${Date.now().toString(36).substring(2)}`;
    this.name = data.name!;
    this.address = data.address!;
    this.latitude = data.latitude || 22.3193;
    this.longitude = data.longitude || 114.1694;
    this.status = data.status || 'OPEN';
    this.operatingHours = data.operatingHours || { weekdays: '11:00-14:00,17:00-21:00' };
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude,
      status: this.status,
      operatingHours: this.operatingHours,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}