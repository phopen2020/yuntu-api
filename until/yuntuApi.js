import socket from './socket'

function convert(token, outputType, fileName, callback) {
	var json = {
		action: 'Convert',
		outputType: outputType,
		from: 'miniYuntu',
		fileName: encodeURIComponent(fileName),
		creator: 'miniYuntu',
		docID: token,
		title: fileName
	}
	socket.send(json, callback)
}

function getResult(token, outputType, callback) {
	if (!callback) {
		return;
	}
	var queryParam = {
		action: 'GetOutputResult',
		docID: token,
		outputType: outputType
	}
	
	socket.send(queryParam, function (res) {
		callback(res);
	})
}

function queryState(token, callback) {
	if (!callback) {
		return;
	}
	
	var queryParam = {
		action: 'QueryStatus',
		docID: token
	}
	socket.send(queryParam, function (res) {
		if (res && res.json) {
			if (res.json.retCode == 0) {
				return callback(res)
			} else if (res.json.retCode == 1) {
				setTimeout(function () {
					queryState(token, callback)
				}, 500);
				return
			}
		}
		callback(null);
	})
}

export const yuntuApi = { convert, getResult, queryState }