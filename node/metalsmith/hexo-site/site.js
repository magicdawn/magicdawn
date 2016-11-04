'use strict';

const Metalsmith = require('metalsmith');
const $ = require('load-metalsmith-plugins')();
const moment = require('moment');

// site, src & dest
const site = Metalsmith(__dirname)
  .source('source')
  .destination('build');

site.use((files) => {
  for (let f of Object.keys(files)) {
    var o = files[f];
    o.date = moment(o.date).format('YYYY-MM-DD HH:mm:ss');
  }
});

// collections
site.use($.collections({
  posts: {
    pattern: '*.md',
    sortBy: 'date',
    reverse: true
  }
}));

// templates 
// 1. in-place
site.use($.inPlace({
  engine: 'swig',
  // pattern: '**/*.md'
}));

// plugins
site.use($.markdown());



// templates
// 2. layouts
site.use($.layouts({
  engine: 'swig',
  directory: 'layouts'
}));


// exports
module.exports = site;