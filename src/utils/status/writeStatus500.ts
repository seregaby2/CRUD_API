import { ServerResponse } from 'http';

export const writeStatus500 = (res:ServerResponse) => {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify('message: Something were wrong'));
};
