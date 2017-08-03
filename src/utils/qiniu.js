export function putb64(fileData, fileLength, fileKey, uptoken, callback) {

    let userDetail = _vue.$storage.getItem('userDetail')
    console.log('uptoken', uptoken)
    var result = ''
    var fileLength = -1
    var pic = fileData.substring(fileData.indexOf('base64,') + 7);
    var url = "http://up-z2.qiniu.com/putb64/" + fileLength + "/key/" + _vue.$util.base64encode(fileKey);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var resObj = JSON.parse(xhr.responseText);
            if (resObj.key !== undefined) {
                result = userDetail.qiniuHost + '/' + resObj.key;
            } else if (resObj.hash !== undefined) {
                result = userDetail.qiniuHost + '/' + resObj.hash;
            } else {
                console.log('失败')
                _vue.$toast.show(resObj.error);
            }

            callback && callback(result)
        }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("Authorization", "UpToken " + uptoken.token);
    xhr.send(pic);
};