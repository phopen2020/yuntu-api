import io from 'socket.io-client'
var _socket = null;
function _init(callback) {
  if (!_socket) {
    _socket = io('')//socket的地址
    _socket.on('connect', function (res) {
      if (callback) {
        callback(_socket);
      }
    })
  } else {
    if (callback) {
      callback(_socket);
    }
  }
}

function send(json, successCallback, failCallback) {
  _init(function () {
    if (_socket) {
      _socket.on("error", function (data) {
        if (failCallback) {
          failCallback(data);
        }
      });

      _socket.emit("yuntu", json, function (data) {
        if (successCallback) {
          successCallback(data);
        }
      })
    }
  });
}

export default { send: send }
