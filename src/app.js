import express from 'express';
import v1messageRoute from './routes/messageRoutes.js';
import v1userRoute from './routes/userRoutes.js';
import v1categoryRoute from './routes/categoryRoutes.js';
import v1AuthRoute from './routes/authRoutes.js'
import instanceDB from './services/mysql2/configDev.js';
import cookieParser from 'cookie-parser'
import { authRequired } from '../middlewares/validateToken.js';
import cors from 'cors'
// import cron from './helpers/cron.js'

const app = express();
app.disable('x-powered-by');

app.use(cors())
app.use(express.json());
app.use (cookieParser())
app.use('/api/v1/messages', authRequired, v1messageRoute);
app.use('/api/v1/users', authRequired, v1userRoute);
app.use('/api/v1/categories', v1categoryRoute);
app.use('/api/v1', v1AuthRoute)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

// cron.start()
await instanceDB.connect();