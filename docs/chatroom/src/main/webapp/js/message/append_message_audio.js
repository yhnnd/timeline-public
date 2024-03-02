function append_message_audio(messageText, data) {
    // 创建播放器
    let audioPlayer = $('<audio controls>')
        .css({"display": "inline-block"});
    // 创建下载链接
    let downloadLink = $('<a>')
        .css({"font-size": ".75rem", "font-weight": "400"})
        .addClass("text-primary")
        .text("download");
    // 解析音频文件
    try {
        let message = JSON.parse(data.message);
        if (message) {
            let url = message.data;
            let filename = message.filename;
            audioPlayer
                .attr("src", url);
            downloadLink
                .attr("href", url)
                .attr("download", filename);
        }
    } catch (e) {
        if(localStorage.getItem("application-language")==="lang-zh"){
            downloadLink.text("消息已失效");
        } else {
            downloadLink.text("message expired");
        }
    }
    // 创建下载链接 row
    let downloadLinkRow = $('<div>')
        .addClass("w-100 text-center")
        .append(downloadLink);
    // 生成消息内容
    $(messageText)
        .css({"text-align": "center"})
        .append(audioPlayer)
        .append(downloadLinkRow);
    // 消息内容宽度适配手机屏幕
    if (isMobile()) {
        $(messageText).css({"padding-left": "0", "padding-right": "0", "max-width": ""});
    }
}