import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 5000;
//const port =  5000;

app.use(cors());
app.use(json());

import userRoutes from './routes/users.route.js';
app.use('/users', userRoutes); 

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
