import express from 'express';
import v1messageRoute from './routes/messageRoutes.js';
import v1userRoute from './routes/userRoutes.js';
import v1categoryRoute from './routes/categoryRoutes.js';
import dataBaseConnection from './services/mysql2/configDev.js';

const app = express();
app.disable('x-powered-by');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/v1/messages', v1messageRoute);
app.use('/api/v1/users', v1userRoute);
app.use('/api/v1/categories', v1categoryRoute);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

await dataBaseConnection.connect();
// await dataBaseConnection.disconnect();
