# hl

[![Build Status](https://travis-ci.org/bcoe/hl.svg)](https://travis-ci.org/bcoe/hl)
[![Coverage Status](https://coveralls.io/repos/bcoe/hl/badge.svg?branch=master)](https://coveralls.io/r/bcoe/hl?branch=master)
[![NPM version](https://img.shields.io/npm/v/hl.svg)](https://www.npmjs.com/package/hl)

Use Atom's syntax-highlighter from the command line.

```sh
npm install hl -g
```

<img width="500" src="screen.png">

Provides syntax highlighting for:

* JavaScript
* Ruby
* JSON
* ObjectiveC
* CPP
* Markdown

Open an [issue](https://github.com/bcoe/hl/issues/new) or [pull-request](https://github.com/bcoe/hl/compare) if we're missing a language you'd like to see!

## Usage

```sh
hl index.js
hl main.rb
hl foo.m
hl package.json
```

You can also use unix pipes:

```sh
cat index.rb | hl --extension=rb --pipe
```

## API

```js
var hl = require('hl')
var out = hl('index.js', {
  numeric: 'yellow'
})
console.log(out)
```

## License

ISC
