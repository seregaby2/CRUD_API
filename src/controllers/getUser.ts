import { ServerResponse } from 'http';
import { valid } from '../utils/validate';
import { findUserById } from '../models/userModel';

export const getUser = async (res:ServerResponse, id: string) => {
  const user = await findUserById(id);
  try {
    if (!valid(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify('Bad Request'));
    } else if (!user) {
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
