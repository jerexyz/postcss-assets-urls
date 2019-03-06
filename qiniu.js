let qiniu = require('qiniu')
let md5File = require('md5-file')


function qiniuUpload ({ accessKey, secretKey, hash, bucket, localFile, zone }) {
  let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

  let options = {
    scope: bucket
  }
  let putPolicy = new qiniu.rs.PutPolicy(options)
  let uploadToken = putPolicy.uploadToken(mac)
  let config = new qiniu.conf.Config()
  config.zone = qiniu.zone[zone]
  config.useCdnDomain = true
  let resumeUploader = new qiniu.resume_up.ResumeUploader(config)
  let putExtra = new qiniu.resume_up.PutExtra()
  putExtra.fname = hash
  putExtra.resumeRecordFile = hash
  putExtra.progressCallback = function (uploadBytes, totalBytes) {
    console.log('progress:' + uploadBytes + '(' + totalBytes + ')')
  }

  // file
  resumeUploader.putFile(
    uploadToken,
    null,
    localFile,
    putExtra,
    (respErr, respBody, respInfo) => {
      if (respErr) {
        throw respErr
      }

      if (respInfo.statusCode === 200) {
        console.log(respBody)
      } else {
        console.log(respInfo.statusCode)
        console.log(respBody)
      }
    }
  )
}

console.log(md5File.sync('/Volumes/code/github.com/jerexyz/postcss-assets-urls/index.js'))
