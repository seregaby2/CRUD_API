import { createServer, IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import { updateUser } from './controllers/updateUser';
import { getUsers } from './controllers/getUsers';
import { getUser } from './controllers/getUser';
import { createUser } from './controllers/createUser';

dotenv.config();

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const id = req.url?.split('/')[3] || '';

  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(res);
  } else if (req.url?.includes('/api/users') && id.length > 0 && req.method === 'GET') {
    getUser(res, id);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    createUser(req, res);
  } else if (req.url?.includes('/api/users') && id.length > 0 && req.method === 'PUT') {
    updateUser(res, req, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  }
});
const PORT = process.env.PORT || 5000;

server.listen(PORT);
