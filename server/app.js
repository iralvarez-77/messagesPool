import express from 'express';
import v1messageRoute from './routes/message.route.js';
import v1userRoute from './routes/user.route.js';
import v1categoryRoute from './routes/category.route.js';
import v1categoryMessageRoute from './routes/categories_m.route.js';

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/v1/messages', v1messageRoute);
app.use('/api/v1/messages', v1categoryMessageRoute);
app.use('/api/v1/users', v1userRoute);
app.use('/api/v1/categories', v1categoryRoute);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
