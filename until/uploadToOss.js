import getSTS from './getSTS'
let OSS = require('ali-oss');

const putObject = (token,data,callback)=> {
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
  
    try {
      let result = await client.put('/source/'+token, data);
      if (callback) {
        callback(result);
      }
    } catch (e) {
      console.log(e);
    }
  })
}

export const uploadFile = {
  putObject
}

