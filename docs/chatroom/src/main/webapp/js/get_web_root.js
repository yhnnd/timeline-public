function getWebRoot() {
    // Scenario 1
    // window.location.href = "http://www.impte.com:8080/ChatRoom/index.html"
    // window.location.host = "www.impte.com:8080"
    // window.location.pathname = "/ChatRoom/index.html"
    //
    // Scenario 2
    // window.location.href = "http://www.impte.com/"
    // window.location.host = "www.impte.com"
    // window.location.pathname = "/"
    //
    // Scenario 3
    // window.location.href = "http://localhost:8080/index.html"
    // window.location.host = "localhost:8080"
    // window.location.pathname = "/index.html"
    //
    // Scenario 4
    // window.location.href = "http://localhost:8080/"
    // window.location.host = "localhost:8080"
    // window.location.pathname = "/"
    //
    let root = window.location.host;
    let folders = window.location.pathname.split("/");// ["", "ChatRoom", "index.html"]
    for (let i = 1; i < folders.length; ++i) {
        if (folders[i] === "" || folders[i].includes(".")) break;
        root = root + "/" + folders[i];
    }
    return root;
}

function getRandom() {
    let timestamp = (new Date()).getTime();
    let number = ("" + Math.random()).split(".").join("");
    return "" + timestamp + number;
}