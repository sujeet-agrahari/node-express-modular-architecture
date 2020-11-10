/* eslint-disable no-console */
const http = require('http');

const stoppable = require('stoppable');

const app = require('./app');

const normalizePort = require('./utils/normalize-port');

const gracefulShutdown = require('./utils/graceful-shutdown');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  console.info(`Listening on ${bind}`);
}

// stoppable server for graceful shutdown
const stoppableServer = stoppable(server);

// quit on ctrl+c when running docker in terminal
process.on('SIGINT', () => {
  console.info('Got SIGINT (aka ctrl+c in docker). Graceful shutdown', new Date().toISOString());
  gracefulShutdown(stoppableServer);
});

// quit properly on docker stop
process.on('SIGTERM', () => {
  console.log('Got SIGTERM (docker container stop).Graceful shutdown', new Date().toISOString());
  gracefulShutdown(stoppableServer);
});
