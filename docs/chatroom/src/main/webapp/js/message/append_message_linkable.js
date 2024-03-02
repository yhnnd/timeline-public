function getParameter(url, name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = url.substr(url.indexOf("?")).substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

function isURLSameRoot(url, host) {
    return (url.indexOf(host) >= 0 || (host.indexOf("www.") === 0 && url.indexOf(host.split("www.")[1]) >= 0));
}

function append_message_linkable(messageText, newText) {
    // replace "url" with "<a href='url'>" + url + "</a>"
    const host = window.location.host;
    const beginPattern = ["http://", "https://", "ftp://", "www.", "wap.", host];
    const endPattern = [".com", ".net", ".org", ".edu", ".gov", ".cn", ".us", ".jp", ".hk", ".tw", ".uk", ".fr", ".de", ".sg", ".it", ".tv", ".io", ".top"];
    let URL_FOUND = false;
    for (itBegin = 0; itBegin < beginPattern.length; ++itBegin) {
        // locate begin position "www."
        let begin = newText.indexOf(beginPattern[itBegin]);
        if (begin >= 0) {
            for (it = 0; it < endPattern.length; ++it) {
                // locate end position ".com"
                let end = newText.indexOf(endPattern[it]);
                if (end > begin + beginPattern[itBegin].length || isURLSameRoot(newText, host)) {
                    // locate real end position. eg. "www.example.com.cn/login"
                    while (end + endPattern[it].length < newText.length &&
                    newText[end + endPattern[it].length] !== ' ' &&
                    newText[end + endPattern[it].length] !== '\'' &&
                    newText[end + endPattern[it].length] !== '\"' &&
                    newText[end + endPattern[it].length] !== '>' &&
                    newText[end + endPattern[it].length] !== '<') {
                        ++end;
                    }
                    // embrace url with <a> tags
                    let Protocol = itBegin < 3 ? "" : "http://";
                    let url = Protocol + newText.substring(begin, end + endPattern[it].length);
                    // 如果是卡片链接
                    if (isURLSameRoot(url, host) && url.indexOf("card-page.html") > 0) {
                        let userInfo = {
                            "user-id": sessionStorage.getItem("user-id"),
                            "session-id": sessionStorage.getItem("session-id")
                        };
                        url += "&" + parseParam(userInfo);
                    }
                    // 生成 a 链接
                    let a = "<a class='d-inline-block text-color-animated' target='_blank' href='" + url + "' style='word-break: break-all;'>" +
                        newText.substring(begin, end + endPattern[it].length) +
                        "</a>";
                    // 如果链接地址是本网站地址
                    if (isURLSameRoot(url, host)) {
                        // 如果是邀请加入聊天室的链接
                        if (url.indexOf("room-page.html") > 0) {
                            // 解析链接中的 room-id
                            let room_id = getParameter($("<span>").html(url).text(), "roomid");
                            let room_name = getParameter($("<span>").html(url).text(), "name");
                            if (room_id && room_name) {
                                // 添加按钮区域
                                let button_field_id = ("button-room-link-" + Math.random()).split(".").join("");
                                let min_width = window.innerWidth * (window.innerWidth > 768 ? 0.3 : 0.6);
                                if (window.innerWidth > 768 && min_width > 400) min_width = 400;
                                if (window.innerWidth <= 768 && min_width > 300) min_width = 300;
                                a += '<div id="' + button_field_id + '" style="min-width:' + min_width + 'px;"></div>';
                                // 等待消息被加载到消息窗口后，给消息添加聊天室按钮
                                setTimeout(function () {
                                    append_message_room_link(room_id, room_name, button_field_id);
                                }, 100);
                            }
                        }
                    }
                    newText = newText.substr(0, begin) + a + newText.substr(end + endPattern[it].length);
                    // set new message after embrace <a> link
                    $(messageText).html(newText);
                    URL_FOUND = true;
                    break;
                }
            }
        }
        if (URL_FOUND == true) break;
    }
    // set new message if no URL was found
    if (URL_FOUND == false) {
        $(messageText).html(newText);
    }
}