import { IncomingMessage, ServerResponse } from 'http';
import { IPerson } from 'src/utils/interface';
import { writeStatus201 } from '../utils/status/writeStatus201';
import { writeStatus400 } from '../utils/status/writeStatus400';
import { valid } from '../utils/validate';
import { findUserById, update } from '../models/userModel';
import { writeStatus404 } from '../utils/status/writeStatus404';
import { writeStatus500 } from '../utils/status/writeStatus500';

export const updateUser = async (res:ServerResponse, req: IncomingMessage, id: string) => {
  try {
    if (!valid(id)) {
      writeStatus400(res);
    }
    const user = await findUserById(id);
    if (!user) {
      writeStatus404(res);
    } else {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        const { name, age, hobby } = JSON.parse(body);

        if (!name || !age || !hobby) {
          writeStatus400(res);
        } else {
          const userData: IPerson = {
            name: name || user.name,
            age: age || age.name,
            hobby: hobby || hobby.name,
          };

          const updUser = await update(id, userData);

          writeStatus201(res, updUser);
        }
      });
    }
  } catch (e) {
    writeStatus500(res);
  }
};
