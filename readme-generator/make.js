#!/usr/bin/env node

'use strict';

/**
 * module dependencies
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const R = require('ramda');
const chokidar = require('chokidar');
const njk = require('nunjucks');
const _ = require('lodash');
const debug = require('debug')('magicdawn:readme');

/**
 * argv
 */

const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    w: 'watch'
  }
});

/**
 * utils
 */
const readSync = R.curry(fs.readFileSync)(R.__, 'utf8');

/**
 * make & debounce
 */

const make = _.debounce(() => {
  console.log("[INFO]: start building");

  // locals
  let toc = yaml.load(readSync(__dirname + '/readme.yml'));
  toc = _.map(toc, (v,k) => {
    return {
      title: k,
      items: v && v.map(item => {
        return {
          title: _.keys(item)[0],
          num: _.values(item)[0]
        };
      })
    };
  });

  debug('toc: %j', toc);

  const readme = njk.render(__dirname + '/README.md.njk', {
    toc: toc
  });
  fs.writeFileSync(__dirname + '/../README.md', readme, 'utf8');
  console.log('[INFO]: OK');
}, 500);

if(argv.watch){
  chokidar.watch(__dirname + '/*.*')
    .on('all', function (e, p) {
      make();
    });
}

make();