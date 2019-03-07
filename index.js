/* eslint-disable es5/no-es6-static-methods */
/* eslint-disable es5/no-block-scoping */
let postcss = require('postcss')
let OSS = require('ali-oss')
let path = require('path')
let md5File = require('md5-file')
let qiniuUpload = require('./qiniu')

function aliossUpload (remotePath, localFile, client) {
  return new Promise((resolve, reject) => {
    try {
      client
        .put(remotePath, localFile)
        .then(res => {
          let url = res.url
          resolve(url)
        })
        .catch(err => {
          reject(err)
        })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = postcss.plugin('postcss-assets-urls', opts => {
  opts = opts || {}

  // Work with options here

  return function (root) {
    let uploadList = []
    let client = opts.oss && new OSS(opts.oss)
    root.walkDecls(/background/, decl => {
      decl.value = decl.value.replace(/\/assets\/\S*.(png|svg|jpg)/, match => {
        let file = path.join(process.cwd(), match)
        let hash = md5File.sync(file, match)
        let upload = aliossUpload(hash, file, client)
        if (opts.qiniu) {
          upload = qiniuUpload(opts.qiniu, file)
        }
        client && uploadList.push(upload)
        return [opts.baseUrl || '', hash].join('/')
      })
    })
    return Promise.all(uploadList)
  }
})
