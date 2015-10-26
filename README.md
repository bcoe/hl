# hl

Use Atom's syntax-highlighter from the command line.

Provides syntax highlighting for:

* JavaScript
* Ruby
* JSON
* ObjectiveC
* CPP

Open an issue or pull-request if we're missing a language you'd like to see!

## Usage

```
npm install hl -g
hl index.js
hl main.rb
hl foo.m
hl package.json
```

<img width="500" src="screen.png">

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
