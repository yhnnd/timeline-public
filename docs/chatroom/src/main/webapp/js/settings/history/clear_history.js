// 清空历史记录
function clearHistory() {
    // 清空聊天窗口中的消息记录
    $('#messages').find('h5').remove();
}

// 清除所有 Cookies
function clearCookies() {
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    for (let key in keys) {
        document.cookie = key + '=0;expires=' + new Date(0).toUTCString();
    }
}

// 清除本地缓存（用户登录信息以及个性化设置）
function clearCache() {
    // localStorage.clear();
}