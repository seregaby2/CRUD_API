import { ServerResponse } from 'http';
import { writeStatus404 } from '../utils/status/writeStatus404';
import { writeStatus400 } from '../utils/status/writeStatus400';
import { valid } from '../utils/validate';
import { findUserById } from '../models/userModel';
import { writeStatus200 } from '../utils/status/writeStatus200';
import { writeStatus500 } from '../utils/status/writeStatus500';

export const getUser = async (res:ServerResponse, id: string) => {
  try {
    if (!valid(id)) {
      writeStatus400(res);
    }
    const user = await findUserById(id);
    if (!user) {
      writeStatus404(res);
    } else {
      writeStatus200(res, user);
    }
  } catch (e) {
    writeStatus500(res);
  }
};
