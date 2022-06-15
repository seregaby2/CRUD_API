import { IncomingMessage, ServerResponse } from 'http';
import { IPerson } from 'src/interface';
import { valid } from 'src/utils/validate';
import { findUserById, update } from '../models/userModel';

export const updateUser = async (res:ServerResponse, req: IncomingMessage, id: string) => {
  try {
    const user = await findUserById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify('User Not Found'));
    } else if (!valid(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify('Bad Request'));
    } else {
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

        const userData: IPerson = {
          name: name || user.name,
          age: age || age.name,
          hobby: hobby || hobby.name,
        };

        const updUser = await update(id, userData);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(updUser));
      });
    }
  } catch (e) {
    throw new Error('Operation failed');
  }
};
