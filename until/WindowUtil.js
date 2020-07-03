	const axios = require('axios');
	
	function saveDataToLocal(name, url) {
		axios.get(url)
  		.then(function (res) {
		// handle success
    		_export_raw(name, res);
  		})
  		.catch(function (error) {
   		 // handle error
    		console.log("saveDataToLocal 错误：" + JSON.stringify(error));
  		});
	}

	function _export_raw (name, data) {
		var urlObject = window.URL || window.webkitURL || window;
		var export_blob = new Blob([data.data]);
		var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
		save_link.download = name;
		if (window.URL.createObjectURL(new Blob()).indexOf(location.host) < 0) {
			window.navigator.msSaveOrOpenBlob(export_blob, name);
		} else {
			save_link.href = urlObject.createObjectURL(export_blob);
		}
		_fake_click(save_link);
	}
	
	function _fake_click(obj) {
		var ev = document.createEvent("MouseEvents");
		ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		obj.dispatchEvent(ev);
	}

	export default { saveDataToLocal }
