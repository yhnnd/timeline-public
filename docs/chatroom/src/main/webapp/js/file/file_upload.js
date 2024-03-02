function getCloudToken() {
    return "1o90vmY9OmRcueIeIeFBID6q2uy8peFiFBxpnM78:rdalpapK8yThJayH3FakQwqQbp8=:eyJzY29wZSI6InRlc3QiLCJkZWFkbGluZSI6MTYwNTA2NDI3MX0=";
}

function getCloudRootPath() {
    return "http://oleco2u3s.bkt.clouddn.com/";
}

// 上传文件到七牛云
function uploader(file, token, key, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', "http://up.qiniu.com", true);
    let formData = new FormData();
    formData.append('key', key);
    formData.append('token', token);
    formData.append('file', file);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            if (callback) {
                callback(data);
            } else {
                log.line({
                    title: "uploader()",
                    filename: "file/file_upload.js",
                    name: "upload file callback",
                    text: [
                        "<var>response</var><br/>" + xhr.responseText,
                        "<var>file url</var><br/>" + getCloudRootPath() + data.key
                    ]
                });
            }
        } else if (xhr.status != 200 && xhr.responseText) {
            console.log(xhr.responseText);
        }
    };
    xhr.send(formData);
}

// fileInput 是文件选择框的 id
// key 是文件名
function upload(fileInput, key, callback) {
    let file = $(fileInput)[0].files[0];
    let token = getCloudToken();
    uploader(file, token, key, callback);
}