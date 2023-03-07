const tracer = require('dd-trace').init();
const http = require('http');
const ip = require("ip");
const { createLogger, format, transports } = require('winston');

const hostname = ip.address();
const port = 8080;

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: `${__dirname}/logs/hello-app.log` }),
  ],
});

module.exports = logger;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Client - Hello World\n');
  logger.log('info', 'Log - Hello World');
  console.log('Server - Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

