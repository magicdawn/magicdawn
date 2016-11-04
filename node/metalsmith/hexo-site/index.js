const site = require('./site');
const fs = require('fs');
const chokidar = require('chokidar');
const logSymbols = require('log-symbols');

// build
const build = () => {
  console.log(`${ logSymbols.success } rebuilding`);
  site.build(e => e && console.error(e.stack || e));
};

// build for the first time
build();

// argv
const argv = require('yargs')
  .boolean('watch')
  .alias('w', 'watch')
  .argv;

// watch
if (argv.watch) {
  // create watcher
  const watcher = chokidar.watch([
    __dirname + '/source',
    __dirname + '/layouts'
  ]);

  watcher.on('ready', () => {
    // watch
    [
      'add', 'unlink', 'change',
      'addDir', 'unlinkDir'
    ].forEach(e => watcher.on(e, build));

    console.log('Watching source, layouts ...');
  });
}