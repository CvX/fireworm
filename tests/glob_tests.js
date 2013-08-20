var Glob = require('../lib/glob')
var assert = require('chai').assert
var path = require('path')

suite('baseDir', function(){
  test('star 1', function(){
    assertBaseDirIs('a/*/b/a.txt', 'a')
  })

  test('star 2', function(){
    assertBaseDirIs('a/b/*/a.txt', 'a/b')
  })

  test('star 3', function(){
    assertBaseDirIs('a/something*.txt', 'a')
  })

  test('absolute star', function(){
    assertBaseDirIs(path.resolve('a/*'), 'a')
  })

  test('no wild cards', function(){
    assertBaseDirIs('a/something.txt', 'a')
  })

  test('?', function(){
    assertBaseDirIs('a/?/b/c.txt', 'a')
  })

  test('escapes', function(){
    assertBaseDirIs('a/\\*/b/a.txt', 'a/*/b')
    assertBaseDirIs('a/\\?/b/a.txt', 'a/?/b')
  })

  test('character group', function(){
    assertBaseDirIs('a/[bc]/d/a.txt', 'a')
    assertBaseDirIs('a/\\[bc]/d/a.txt', 'a/[bc]/d')
    assertBaseDirIs('a/[bc\\]/d/a.txt', 'a/[bc]/d')
  })

  function assertBaseDirIs(glob, baseDir){
    glob = new Glob(glob)
    assert.equal(
      glob.baseDir(),
      path.join(process.cwd(), baseDir))
  }

})
