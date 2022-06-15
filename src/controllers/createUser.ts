import { IncomingMessage, ServerResponse } from 'http';
import { IPerson } from 'src/interface';
import { create } from '../models/userModel';

export const createUser = async (req: IncomingMessage, res:ServerResponse) => {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { name, age, hobby } = JSON.parse(body);

      if (!name || !age || !hobby) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify('Bad Requst'));
      }

      const user: IPerson = {
        name,
        age,
        hobby,
      };

      const newUser = await create(user);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newUser));
    });
  } catch (e) {
    throw new Error('Operation failed');
  }
};
