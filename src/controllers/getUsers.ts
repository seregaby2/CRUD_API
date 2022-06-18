import { ServerResponse } from 'http';
import { writeStatus200 } from '../utils/status/writeStatus200';

import { findAllUsers } from '../models/userModel';
import { writeStatus500 } from '../utils/status/writeStatus500';

export const getUsers = async (res:ServerResponse) => {
  try {
    const users = await findAllUsers();
    writeStatus200(res, users);
  } catch (e) {
    writeStatus500(res);
  }
};
