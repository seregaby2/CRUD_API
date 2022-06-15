import { ServerResponse } from 'http';
import { valid } from 'src/utils/validate';
// import { IPerson } from 'src/interface';
import { findUserById, remove } from '../models/userModel';

export const deleteUser = async (res:ServerResponse, id: string) => {
  try {
    const user = await findUserById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User Not Found' }));
    } else if (!valid(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify('Bad Request'));
    } else {
      await remove(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User with Id: ${id} removed` }));
    }
  } catch (error) {
    throw new Error('Operation failed');
  }
};
