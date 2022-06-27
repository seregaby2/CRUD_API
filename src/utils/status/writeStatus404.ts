import { ServerResponse } from 'http';

export const writeStatus404 = (res:ServerResponse) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify('message: User Not Found'));
};
