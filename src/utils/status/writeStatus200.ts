import { ServerResponse } from 'http';
import { IPerson } from '../interface';

export const writeStatus200 = (res:ServerResponse, user: IPerson | IPerson[]) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
};
