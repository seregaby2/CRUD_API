import { ServerResponse } from 'http';
import { IPerson } from '../interface';

export const writeStatus201 = (res:ServerResponse, updUser: IPerson) => {
  res.writeHead(201, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify(updUser));
};
