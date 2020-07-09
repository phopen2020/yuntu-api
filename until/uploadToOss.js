import getSTS from './getSTS'
let OSS = require('ali-oss');

const multipartUpload  = (token,data,callback,progress)=> {
  getSTS(async (res)=>{
    let client = new OSS({
      // region以杭州为例（oss-cn-hangzhou），其他region按实际情况填写。
      region: 'oss-cn-hangzhou',
      // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录RAM控制台创建RAM账号。
      accessKeyId: res.AccessKeyId,
      accessKeySecret: res.AccessKeySecret,
      stsToken:res.SecurityToken,
      bucket: 'yuntu-resources'
    });
    let tempCheckpoint;
    try {
      let result = await client.multipartUpload ('/source/'+token, data, {
        progress: function (p, checkpoint) {
          // 断点记录点。浏览器重启后无法直接继续上传，您需要手动触发上传操作。
          tempCheckpoint = checkpoint;
          if(progress){
            progress(p*100);
          }
        }
      });
      if (callback) {
        callback(result);
      }
    } catch (e) {
      console.log(e);
    }
  })
}

export const uploadFile = {
  multipartUpload
}

