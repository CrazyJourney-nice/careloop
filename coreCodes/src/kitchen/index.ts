export type KitchenTaskStatus = 'QUEUED'|'COOKING'|'READY'|'HANDED'|'FAILED';
export interface KitchenTask { id:string; orderId:string; status:KitchenTaskStatus; createdAt:string; updatedAt:string; audit:string[]; }

export class KitchenSimulator {
  private tasks = new Map<string, KitchenTask>();
  create(orderId:string) { const task:KitchenTask={id:`KT-${Date.now()}`,orderId,status:'QUEUED',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),audit:['created']}; this.tasks.set(task.id,task); return task; }
  list(){return [...this.tasks.values()];}
  update(id:string,status:KitchenTaskStatus){const t=this.tasks.get(id);if(!t)throw new Error('Kitchen task not found');const allowed:Record<KitchenTaskStatus,KitchenTaskStatus[]>={QUEUED:['COOKING','FAILED'],COOKING:['READY','FAILED'],READY:['HANDED','FAILED'],HANDED:[],FAILED:['QUEUED']};if(!allowed[t.status].includes(status))throw new Error(`Invalid kitchen transition ${t.status} -> ${status}`);t.status=status;t.updatedAt=new Date().toISOString();t.audit.push(status.toLowerCase());return t;}
}
