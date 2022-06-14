import { createServer, IncomingMessage, ServerResponse } from 'http';
import data from './data/data.json';
import dotenv from "dotenv";

dotenv.config();

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
});
const PORT = process.env.PORT || 5000;
console.log(process.env)

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
