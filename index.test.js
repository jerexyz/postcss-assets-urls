/* eslint-disable jest/no-focused-tests */
var postcss = require('postcss')
var path = require('path')

var plugin = require('./')

function run (input, output, opts) {
  return postcss([plugin(opts)])
    .process(input)
    .then(function (result) {
      expect(result.css).toEqual(output)
      expect(result.warnings()).toHaveLength(0)
    })
}

it('does something', function () {
  return run('a{ }', 'a{ }', {})
})

it('resolves urls', function () {
  return run(
    "a { background: url('/assets/opo9828c.jpg') }",
    "a { background: url('http://example.com/wp-content/themes78d01ea36bc481d6e154c691347243e5') }",
    {
      baseUrl: 'http://example.com/wp-content/themes',
      // oss: {
      //   accessKeyId: 'accessKeyId',
      //   accessKeySecret: 'accessKeySecret',
      //   bucket: 'xmpt-sit',
      //   endpoint: 'https://oss-cn-shenzhen.aliyuncs.com',
      //   https: true,
      //   delDistImg: false,
      //   region: 'oss-cn-shenzhen'
      // }
    }
  )
})
