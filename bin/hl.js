#!/usr/bin/env node

var chalk = require('chalk')
var fs = require('fs')
var path = require('path')
var hl = require('../')
var yargs = require('yargs')
  .usage('$0 <' + chalk.green('path to source file') + '>')
  .option('o', {
    alias: 'output',
    describe: 'output the ansi-highlighted code to a file'
  })
  .option('p', {
    alias: 'pipe',
    boolean: true,
    default: false,
    describe: 'allow source code to be piped to hl via unix pipes'
  })
  .option('e', {
    alias: 'extension',
    describe: 'when using unix pipes an extension hint must be provided'
  })
  .help('help')
  .alias('h', 'help')
  .version(require('../package.json').version, 'v')
  .alias('v', 'version')

var argv = yargs.argv

if (!argv.pipe) {
  yargs.demand(1, chalk.red('you must provide a path to source file to highlight'))
  argv = yargs.argv
}

process.on('uncaughtException', function (err) {
  yargs.showHelp()
  console.log(chalk.red(err.message))
})

if (argv.pipe) {
  var code = ''

  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function (out) {
    code += out
  })
  process.stdin.on('end', function () {
    var extension = argv.extension ? argv.extension : 'js'
    output(code, extension)
    process.exit(0)
  })
} else if (argv._.length) {
  var file = argv._[0]
  var extension = argv.extension || path.extname(file)
  output(fs.readFileSync(file, 'utf-8'), extension || path.basename(file))
}

function output (code, extension) {
  var out = hl(code, extension)
  if (argv.output) {
    fs.writeFileSync(argv.output, out, 'utf-8')
  } else {
    console.log(out)
  }
}
