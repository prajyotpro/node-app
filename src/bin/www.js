const config = require('config');
const cluster = require('cluster');
const numCPUs = getProcessorCount();

/**
 * Returns number of processors.
 * @return {int} number of processors.
 */
function getProcessorCount() {
  if (config.get('app.server.multiprocessor') === true) {
    return require('os').cpus().length;
  } else {
    return 1;
  }
}

const app = require('../../app');
const port = process.env.PORT || config.get('app.server.port');


if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  app.listen(port);
  console.log(`Worker is up and running on process ${process.pid}`);
}
