import { z } from 'zod';

export class User {
  id: string;
  name: string;
  phone: string;
  preferredLanguage: 'zh-CN' | 'zh-HK' | 'en' = 'zh-CN';
  createdAt: Date;
  updatedAt: Date;
  isElder: boolean = true; // 默认老人账户

  constructor(data: Partial<User>) {
    this.id = data.id || `USR-${Date.now().toString(36).substring(2)}`;
    this.name = data.name!;
    this.phone = data.phone!;
    this.preferredLanguage = data.preferredLanguage || 'zh-CN';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.isElder = data.isElder !== undefined ? data.isElder : true;
  }

  updateLanguage(lang: User['preferredLanguage']) {
    this.preferredLanguage = lang;
    this.updatedAt = new Date();
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      preferredLanguage: this.preferredLanguage,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isElder: this.isElder
    };
  }
}