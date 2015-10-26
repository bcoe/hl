#!/usr/bin/env node

var chalk = require('chalk')
var fs = require('fs')
var hl = require('../')
var yargs = require('yargs')
  .usage('$0 <' + chalk.green('path to source file') + '>')
  .option('o', {
    alias: 'output',
    describe: 'output the ansi-highlighted code to a file'
  })
  .help('help')
  .alias('h', 'help')
  .version(require('../package.json').version, 'v')
  .alias('v', 'version')
  .demand(1, chalk.red('you must provide a path to source file to highlight'))
var argv = yargs.argv

process.on('uncaughtException', function (err) {
  yargs.showHelp()
  console.log(chalk.red(err.message))
})

var out = hl(argv._[0])
if (argv.output) {
  fs.writeFileSync(argv.output, out, 'utf-8')
} else {
  console.log(out)
}
