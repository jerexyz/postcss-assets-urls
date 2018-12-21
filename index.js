/* eslint-disable es5/no-es6-static-methods */
/* eslint-disable es5/no-block-scoping */
var postcss = require('postcss')
const OSS = require('ali-oss')
var path = require('path')
var md5File = require('md5-file')

console.log(OSS)

function upload (remotePath, localFile, client) {
  return new Promise(function (resolve, reject) {
    try {
      client
        .put(remotePath, localFile)
        .then(function (res) {
          let url = res.url
          resolve(url)
        })
        .catch(function (err) {
          reject(err)
        })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = postcss.plugin('postcss-assets-urls', function (opts) {
  opts = opts || {}

  // Work with options here

  return function (root) {
    var uploadList = []
    var client = opts.oss && new OSS(opts.oss)
    root.walkDecls(/background/, function (decl) {
      decl.value = decl.value.replace(/\/assets\/\S*.(png|svg|jpg)/, function (
        match
      ) {
        var file = path.join(process.cwd(), match)
        var hash = md5File.sync(file, match)
        client && uploadList.push(upload(hash, file, client))
        return opts.baseUrl + hash
      })
    })
    return Promise.all(uploadList)
  }
})
