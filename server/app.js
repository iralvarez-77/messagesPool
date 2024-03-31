import express from 'express';
import v1messageRoute from './routes/messageRoutes.js';
import v1userRoute from './routes/userRoutes.js';
import v1categoryRoute from './routes/categoryRoutes.js';
import v1AuthRoute from './routes/authRoutes.js'
import instanceDB from './services/mysql2/configDev.js';
import cron from './helpers/cron.js'

const app = express();
app.disable('x-powered-by');

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use('/api/v1/messages', v1messageRoute);
app.use('/api/v1/users', v1userRoute);
app.use('/api/v1/categories', v1categoryRoute);
app.use('/api/v1', v1AuthRoute)

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

cron.start()
await instanceDB.connect();