import { ServerResponse } from 'http';

export const writeStatus201 = (res:ServerResponse) => {
  res.writeHead(201, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify({ message: 'form submitted successfully' }));
};
