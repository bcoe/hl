/* global describe, it */

var assert = require('assert')
var hl = require('../')

describe('hl', function () {
  describe('map', function () {
    it('maps common extensions to highlights extension', function () {
      assert.equal(hl.map('.m'), 'source.objc')
      assert.equal(hl.map('.rb'), 'source.ruby')
      assert.equal(hl.map('.json'), 'source.json')
    })
  })

  describe('chalkify', function () {
    it('handles single classes', function () {
      var output = hl.chalkify('<div class="line"><span class="support"><span>return</span</span></div>')
      assert.equal(output, '\x1B[33mreturn\x1B[39m')
    })

    it('handles aggregate classes', function () {
      var output = hl.chalkify('<div class="line"><span class="meta preprocessor"><span>return</span</span></div>')
      assert.equal(output, '\x1B[34mreturn\x1B[39m')
    })
  })
})
