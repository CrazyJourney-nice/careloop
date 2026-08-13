import express from 'express';
import ordersRouter from './orders';

const app = express();
app.use(express.json());
app.use('/api', ordersRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(3000, () => {
  console.log('🚀 CareLoop API running on http://localhost:3000');
});

export default app;