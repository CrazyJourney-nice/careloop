import { z } from 'zod';

export class MenuItem {
  id: string;
  canteenId: string;
  name: string;
  description: string;
  priceCents: number;
  category: 'STARTER' | 'MAIN' | 'SIDE' | 'DRINK' | 'DESSERT' | 'SET';
  available: boolean = true;
  allergens: string[] = [];
  supportedModifiers: string[] = [];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<MenuItem>) {
    this.id = data.id || `DISH-${Date.now().toString(36).substring(2)}`;
    this.canteenId = data.canteenId!;
    this.name = data.name!;
    this.description = data.description!;
    this.priceCents = data.priceCents!;
    this.category = data.category || 'MAIN';
    this.available = data.available !== undefined ? data.available : true;
    this.allergens = data.allergens || [];
    this.supportedModifiers = data.supportedModifiers || [];
    this.imageUrl = data.imageUrl;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  updateAvailability(available: boolean) {
    this.available = available;
    this.updatedAt = new Date();
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      canteenId: this.canteenId,
      name: this.name,
      description: this.description,
      priceCents: this.priceCents,
      category: this.category,
      available: this.available,
      allergens: this.allergens,
      supportedModifiers: this.supportedModifiers,
      imageUrl: this.imageUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}