export type ConveyorStatus='READY'|'IN_PROGRESS'|'DELIVERED'|'FAILED';
export interface ConveyorTask{id:string;orderId:string;trayCode:string;tableNumber:string;status:ConveyorStatus;audit:string[];createdAt:string;updatedAt:string;}
export class ConveyorSimulator{
 private tasks=new Map<string,ConveyorTask>();
 create(orderId:string,tableNumber:string){if(!/^[AB]\d{2}$/.test(tableNumber))throw new Error('Invalid table number');const t:ConveyorTask={id:`CV-${Date.now()}`,orderId,trayCode:`TRAY-${String(this.tasks.size+1).padStart(3,'0')}`,tableNumber,status:'READY',audit:['created'],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};this.tasks.set(t.id,t);return t;}
 list(){return [...this.tasks.values()];}
 update(id:string,status:ConveyorStatus){const t=this.tasks.get(id);if(!t)throw new Error('Conveyor task not found');const allowed:Record<ConveyorStatus,ConveyorStatus[]>={READY:['IN_PROGRESS','FAILED'],IN_PROGRESS:['DELIVERED','FAILED'],DELIVERED:[],FAILED:['READY']};if(!allowed[t.status].includes(status))throw new Error(`Invalid conveyor transition ${t.status} -> ${status}`);t.status=status;t.updatedAt=new Date().toISOString();t.audit.push(status.toLowerCase());return t;}
}
