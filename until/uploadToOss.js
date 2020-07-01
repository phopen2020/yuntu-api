import getSTS from './getSTS'
let OSS = require('ali-oss');



const putObject = (token,data)=> {
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
      // object-key可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
      let result = await client.put('/source/'+token, data);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  })
}

export const uploadFile = {
  putObject
}

