import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import runServer from './infra/http';

export const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  return res.json({ ok: true })
})

runServer()
app.listen(process.env.PORT || 3333, () => {
  console.log('[USER] Server running');
});