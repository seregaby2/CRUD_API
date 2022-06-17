import { ServerResponse } from 'http';
import { writeStatus200 } from '../utils/status/writeStatus200';

import { findAllUsers } from '../models/userModel';

export const getUsers = async (res:ServerResponse) => {
  try {
    const users = await findAllUsers();
    writeStatus200(res, users);
  } catch (e) {
    throw new Error('Operation failed');
  }
};
