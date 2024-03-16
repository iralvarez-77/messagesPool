import express from 'express';

import v1messageRoute from './routes/message.routes.js';

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/v1/messages', v1messageRoute);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});





// app.get('/messages', async (req, res) => {
// 	try {

//     const [result] = await connection.query('SELECT * FROM messages;');
//     res.json(result)

//   } catch (error) {}
// });

// app.post('/messages', (req, res) => {
// 	const {name} = req.body
// 	res.send(`mensaje ${name} creado`);
// });

// app.put('/messages/:id', (req, res) => {
// 	const { id } = req.params;
// 	res.send(`mensaje ${id} actualizado`);
// });

// app.delete('/messages/:id', (req, res) => {
// 	const { id } = req.params;
// 	res.send(`mesaje ${id} eliminado`);
// });

