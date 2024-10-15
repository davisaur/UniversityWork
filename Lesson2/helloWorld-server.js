const { createServer } = require('node:http');
// By writing surround the variable in curly braces, (destructuring)
// you're telling Node.js to extract only the createServer 
// function from the module's exports.

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
€
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
