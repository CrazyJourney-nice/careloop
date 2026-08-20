import express from 'express';
import http from 'node:http';
import { WebSocketServer } from 'ws';
import ordersRouter from './orders';
import adminRouter from './admin';
import { addClient } from './realtime';

export const app = express();
app.use(express.json());
app.use('/api',ordersRouter);
app.use('/api/admin',adminRouter);
app.get(['/staff','/staff/'],(_req,res)=>res.sendFile('staff.html',{root:'src/ui'}));
app.get(['/admin','/admin/'],(_req,res)=>res.sendFile('admin.html',{root:'src/ui'}));
app.use(express.static('src/ui'));

if (process.env.NODE_ENV !== 'test') {
  const server=http.createServer(app);
  const wss=new WebSocketServer({server,path:'/ws'});
  wss.on('connection',socket=>{addClient(socket);socket.send(JSON.stringify({type:'connected',payload:{version:'0.1.0'}}));});
  const port = Number(process.env.PORT || 3100);
  server.listen(port,()=>console.log(`CareLoop API running on http://localhost:${port}`));
}
export default app;
