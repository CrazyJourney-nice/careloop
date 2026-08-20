import type { WebSocket } from 'ws';

const clients = new Set<WebSocket>();
export function addClient(client:WebSocket){clients.add(client);client.on('close',()=>clients.delete(client));}
export function broadcast(type:string,payload:unknown){const message=JSON.stringify({type,payload,at:new Date().toISOString()});for(const client of clients){if(client.readyState===1)client.send(message);}}
