import express from 'express';

import mysql from 'mysql2/promise'

// Create the connection to database
const connection = await mysql.createConnection({
  host: process.env.HOST_DB,
  port: process.env.PORT_MYSQL,
  password: process.env.PASSWORD_DB,
  user: process.env.USER_DB ,
  database: process.env.NAME_DB,
});


const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json())

app.get('/messages', (req, res) => {
	res.send('holaaa gente');
});

app.post('/messages', (req, res) => {
	const {name} = req.body
	res.send(`mensaje ${name} creado`);
});

app.put('/messages/:id', (req, res) => {
	const { id } = req.params;
	res.send(`mensaje ${id} actualizado`);
});

app.delete('/messages/:id', (req, res) => {
	const { id } = req.params;
	res.send(`mesaje ${id} eliminado`);
});

app.listen(PORT, () => {
	console.log(`server is running on ${PORT}`);
});
