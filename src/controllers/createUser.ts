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
      const {
        name, email, phone, date, message,
      } = JSON.parse(body);

      if (!name || !email || !phone || !message || !date) {
        writeStatus400(res);
      } else {
        const user: IPerson = {
          name,
          email,
          phone,
          message,
          date,
        };

        await create(user);

        writeStatus201(res);
      }
    });
  } catch (e) {
    writeStatus500(res);
  }
};
