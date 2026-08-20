import { z } from 'zod';

export class Preference {
  id: string;
  userId: string;
  type: 'TASTE' | 'HEALTH' | 'ALLERGY' | 'DIET' | 'LANGUAGE';
  name: string;
  severity: 'OPTIONAL' | 'DEFAULT' | 'WARNING' | 'CRITICAL';
  source: 'USER' | 'STAFF' | 'SYSTEM';
  active: boolean = true;
  confirmedAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Preference>) {
    this.id = data.id || `PREF-${Date.now().toString(36).substring(2)}`;
    this.userId = data.userId!;
    this.type = data.type || 'TASTE';
    this.name = data.name!;
    this.severity = data.severity || 'OPTIONAL';
    this.source = data.source || 'USER';
    this.active = data.active !== undefined ? data.active : true;
    this.confirmedAt = data.confirmedAt;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  confirm() {
    this.active = true;
    this.confirmedAt = new Date();
    this.updatedAt = new Date();
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      name: this.name,
      severity: this.severity,
      source: this.source,
      active: this.active,
      confirmedAt: this.confirmedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}