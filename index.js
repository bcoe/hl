var _ = require('lodash')
var chalk = require('chalk')
var cheerio = require('cheerio')
var fs = require('fs')
var Highlights = require('highlights')
var highlighter = new Highlights()
var path = require('path')

var languages = [
  'atom-language-nginx',
  'language-dart',
  'language-rust',
  'language-erlang',
  'language-glsl',
  'language-haxe',
  'language-ini',
  'language-stylus'
]

languages.forEach(function (language) {
  highlighter.requireGrammarsSync({
    modulePath: require.resolve(language + '/package.json')
  })
})

var opts = {
  numeric: 'magenta',
  comment: 'gray',
  support: 'yellow',
  string: 'green',
  boolean: 'green',
  operator: 'grey',
  modifier: 'blue',
  type: 'yellow',
  name: 'bold',
  parameter: 'blue',
  function: 'bold',
  variable: 'blue',
  entity: 'yellow',
  control: 'blue',
  null: 'green',
  constant: 'green',
  link: 'blue',
  'meta.preprocessor': 'blue'
}

var hl = function (file, _opts) {
  _.extend(opts, _opts)
  return hl.chalkify(hlCode(fs.readFileSync(file, 'utf-8'), file), opts)
}

function hlCode (code, file) {
  return highlighter.highlightSync({
    fileContents: code,
    scopeName: hl.map(file)
  })
}

var mappings = {
  '.rb': '.ruby',
  '.h': '.objc',
  '.m': '.objc'
}

hl.map = function (file) {
  var extension = path.extname(file)
  return 'source' + (mappings[extension] || extension)
}

hl.chalkify = function (codeHtml) {
  var $ = cheerio.load(codeHtml)
  var lines = []
  var elementNames = Object.keys(opts)

  $('.line').each(function () {
    // comments have a .line class, resulting in them
    // being printed twice.
    if (this.attribs.class.split(' ').length > 1) return

    var line = ''
    $(this).find('span:not(:has(*))').each(function () {
      var classes = []
      var color = null
      var parents = $(this).parents()
      for (var i = 0, parent; (parent = parents[i]) !== undefined; i++) {
        if (parent.attribs.class) {
          classes.push.apply(classes, parent.attribs.class.split(' '))
          break
        }
      }

      // uncomment when figuring out new coloring rules.
      // console.log(classes, $(this).text())
      for (var ii = 0, name; (name = elementNames[ii]) !== undefined; ii++) {
        if (_.every(name.split('.'), function (n) {
          return ~classes.indexOf(n)
        })) {
          color = opts[name]
          break
        }
      }

      if (color) line += chalk[color]($(this).text())
      else line += $(this).text()
    })

    lines.push(line)
  })

  return lines.join('\n')
}

module.exports = hl
