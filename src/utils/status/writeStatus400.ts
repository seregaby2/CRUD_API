import { ServerResponse } from 'http';

export const writeStatus400 = (res:ServerResponse) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  return res.end('Error: Bad Request');
};
