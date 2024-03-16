import express from 'express';

import v1messageRoute from './routes/message.routes.js';

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/v1/messages', v1messageRoute);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
