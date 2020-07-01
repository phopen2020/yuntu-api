import socket from './socket'

function getSTS(callback) {
   var params = {
      action: 'UploadFileAction'
    }
      socket.send(params, function (res) {
         if (res && res.json && res.json.authorizationInfo) {
           if(callback) {
              callback(res.json.authorizationInfo)
           }
         }
       }.bind(this))
}

module.exports = getSTS