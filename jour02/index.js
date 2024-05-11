// index.js

import server from './server.js';
import { getAllTasks, createTask, updateTask, deleteTask } from './routes.js';

server.on('request', (req, res) => {
  if (req.url === '/tasks' && req.method === 'GET') {
    getAllTasks(req, res);
  } else if (req.url === '/tasks' && req.method === 'POST') {
    createTask(req, res);
  } else if (req.url.startsWith('/tasks/') && req.method === 'PUT') {
    updateTask(req, res);
  } else if (req.url.startsWith('/tasks/') && req.method === 'DELETE') {
    deleteTask(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route non trouvée');
  }
});

const PORT = 8888;
server.listen(PORT, 'localhost', () => {
  console.log(`Listening on 127.0.0.1:${PORT}`);
});
