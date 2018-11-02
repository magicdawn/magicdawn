#!/usr/bin/env node

const { join } = require('path')
const { ln } = require('shelljs')

// proxychains4
ln(
  '-sf',
  join(__dirname, './proxychains4/proxychains.conf'),
  '/usr/local/etc/proxychains.conf'
)

// zsh
ln('-sf', join(__dirname, '.zshrc'), '~/.zshrc')
