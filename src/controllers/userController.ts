import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import { IPerson } from 'src/interface';
import { findAllUsers, findUserById, create } from '../models/userModel';

export const getUsers = async (res:ServerResponse) => {
  try {
    const users = await findAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (e) {
    throw new Error('Operation failed');
  }
};

export const getUser = async (res:ServerResponse, id: string) => {
  const user = await findUserById(id);
  const valid = validate(id);

  try {
    if (!valid) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify('Bad Request'));
    }
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify('User Not Found'));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (e) {
    throw new Error('Operation failed');
  }
};

export const createUser = async (req: IncomingMessage, res:ServerResponse) => {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { name, age } = JSON.parse(body);

      if (!name || !age) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify('Bad Requst'));
      }

      const user: IPerson = {
        name,
        age,
      };

      const newUser = await create(user);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newUser));
    });
  } catch (e) {
    throw new Error('Operation failed');
  }
};
