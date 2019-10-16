const nodemon = require('nodemon');

function spawnNodemon(filePath) {
  nodemon({
    script: filePath,
    ext: 'js json'
  });

  nodemon
    .on('start', function() {
      console.log('App has started');
    })
    .on('quit', function() {
      console.log('App has quit');
    })
    .on('restart', function(files) {
      console.log('App restarted due to: ' + files);
    });

  process.once('SIGINT', function() {
    nodemon.once('exit', function() {
      process.exit();
    });
  });

  return nodemon;
}

exports.default = spawnNodemon;
