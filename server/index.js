const app = require('./app')
const cluster = require('cluster')
const os = require('os')

// load env vars
require('dotenv').load()

// Count the machine's CPUs
var WORKERS =  process.env.WORKERS || os.cpus().length

// Server code for master process
if (cluster.isMaster) {
    // Create a worker for each CPU
    for (var i = 0; i < WORKERS; i++) {
        cluster.fork();
    }
    // respawn
    cluster.on('exit', function (worker, code, signal) {
        console.warn('worker', worker.process.pid, 'died :(');
        console.warn('spawning a new worker');
        cluster.fork();
    })
} else {
  const port = process.env.PORT || 3050
  app.listen(port, () => {
    console.log('Worker listening on port %d', port)
  }) 
}
