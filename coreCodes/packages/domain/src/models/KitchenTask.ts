export class KitchenTask {
  id: string;
  orderId: string;
  type: 'PREPARE' | 'COOK' | 'ASSEMBLE' | 'QUALITY_CHECK';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  assignedStaffId?: string;
  startTime?: Date;
  endTime?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<KitchenTask>) {
    this.id = data.id || `KT-${Date.now().toString(36).substring(2)}`;
    this.orderId = data.orderId!;
    this.type = data.type || 'PREPARE';
    this.status = data.status || 'PENDING';
    this.assignedStaffId = data.assignedStaffId;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.notes = data.notes;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  updateStatus(newStatus: KitchenTask['status'], notes?: string) {
    this.status = newStatus;
    this.updatedAt = new Date();
    if (newStatus === 'IN_PROGRESS' && !this.startTime) {
      this.startTime = new Date();
    }
    if (newStatus === 'COMPLETED' && !this.endTime) {
      this.endTime = new Date();
    }
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      orderId: this.orderId,
      type: this.type,
      status: this.status,
      assignedStaffId: this.assignedStaffId,
      startTime: this.startTime,
      endTime: this.endTime,
      notes: this.notes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}