export class PhysicalCard {
  id: string;
  userId: string;
  cardTokenHash: string; // 不可逆 token 哈希
  status: 'ACTIVE' | 'USED' | 'EXPIRED' | 'BLOCKED';
  issuedAt: Date;
  lastUsedAt?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<PhysicalCard>) {
    this.id = data.id || `CARD-${Date.now().toString(36).substring(2)}`;
    this.userId = data.userId!;
    this.cardTokenHash = data.cardTokenHash!;
    this.status = data.status || 'ACTIVE';
    this.issuedAt = data.issuedAt || new Date();
    this.lastUsedAt = data.lastUsedAt;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  markUsed() {
    this.status = 'USED';
    this.lastUsedAt = new Date();
    this.updatedAt = new Date();
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      cardTokenHash: this.cardTokenHash,
      status: this.status,
      issuedAt: this.issuedAt,
      lastUsedAt: this.lastUsedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}