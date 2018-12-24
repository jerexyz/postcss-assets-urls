/* eslint-disable jest/no-focused-tests */
let postcss = require('postcss')

let plugin = require('./')

function run (input, output, opts) {
  return postcss([plugin(opts)])
    .process(input)
    .then(result => {
      expect(result.css).toEqual(output)
      expect(result.warnings()).toHaveLength(0)
    })
}

it('does something', () => {
  return run('a{ }', 'a{ }', {})
})

it('resolves urls', () => {
  return run(
    "a { background: url('/assets/opo9828c.jpg') }",
    "a { background: url('http://cdn.io/78d01ea36bc481d6e154c691347243e5') }",
    {
      baseUrl: 'http://cdn.io'
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
