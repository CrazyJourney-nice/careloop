import express from 'express';
import http from 'node:http';
import { WebSocketServer } from 'ws';
import ordersRouter from './orders';
import { addClient } from './realtime';

export const app = express();
app.use(express.json());
app.use('/api',ordersRouter);
app.use(express.static('src/ui'));

if (process.env.NODE_ENV !== 'test') {
  const server=http.createServer(app);
  const wss=new WebSocketServer({server,path:'/ws'});
  wss.on('connection',socket=>{addClient(socket);socket.send(JSON.stringify({type:'connected',payload:{version:'0.1.0'}}));});
  server.listen(Number(process.env.PORT||3000),()=>console.log('CareLoop API running on http://localhost:3000'));
}
export default app;
