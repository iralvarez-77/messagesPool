import express from 'express';
import v1messageRoute from './routes/message.routes.js';
import v1userRoute from './routes/user.routes.js';
import v1categoryRoute from './routes/category.routes.js';
import v1AuthRoute from './routes/auth.routes.js'
import instanceDB from './services/mysql2/configDev.js';
// import cookieParser from 'cookie-parser'
// import cron from './helpers/cron.js'

const app = express();
app.disable('x-powered-by');

app.use(express.json());
// app.use (cookieParser())
app.use('/api/v1/messages', v1messageRoute);
app.use('/api/v1/users', v1userRoute);
app.use('/api/v1/categories', v1categoryRoute);
app.use('/api/v1', v1AuthRoute)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

// cron.start()
await instanceDB.connect();