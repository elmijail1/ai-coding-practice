import express from 'express';
import { unitsRouter } from './routes/units.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('OK');
});

app.use('/units', unitsRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
