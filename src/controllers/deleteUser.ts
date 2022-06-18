import { ServerResponse } from 'http';
import { valid } from '../utils/validate';
import { findUserById, remove } from '../models/userModel';
import { writeStatus400 } from '../utils/status/writeStatus400';
import { writeStatus404 } from '../utils/status/writeStatus404';
import { writeStatus500 } from '../utils/status/writeStatus500';

export const deleteUser = async (res:ServerResponse, id: string) => {
  try {
    if (!valid(id)) {
      writeStatus400(res);
    }
    const user = await findUserById(id);
    if (!user) {
      writeStatus404(res);
    } else {
      await remove(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User with Id: ${id} removed` }));
    }
  } catch (error) {
    writeStatus500(res);
  }
};
