import { ServerResponse } from 'http';

import { findAllUsers } from '../models/userModel';

export const getUsers = async (res:ServerResponse) => {
  try {
    const users = await findAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (e) {
    throw new Error('Operation failed');
  }
};
