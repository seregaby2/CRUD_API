import { IncomingMessage, ServerResponse } from 'http';
import { writeStatus400 } from '../utils/status/writeStatus400';
import { IPerson } from '../utils/interface';
import { create } from '../models/userModel';
import { writeStatus201 } from '../utils/status/writeStatus201';
import { writeStatus500 } from '../utils/status/writeStatus500';

export const createUser = async (req: IncomingMessage, res:ServerResponse) => {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { name, age, hobby } = JSON.parse(body);

      if (!name || !age || !hobby) {
        writeStatus400(res);
      } else {
        const user: IPerson = {
          name,
          age,
          hobby,
        };

        const newUser = await create(user);

        writeStatus201(res, newUser);
      }
    });
  } catch (e) {
    writeStatus500(res);
  }
};
