const bookNumber = getParameter("book");
const rawLink = document.getElementById("raw-link");
if (rawLink != undefined) {
    rawLink.href = "raw-" + bookNumber + ".html";
    const bookNames = [
        "",
        "黑書 1",// 1
        "黑書 2",// 2
        "散逸 1",// 3
        "黑書 3",// 4
        "棕書 1",// 5
        "大棕書",// 6
        "棕書 2",// 7
        "棕書 3",// 8
        "黑書 4",// 9
        "黑書 5",// 10
        "出路 1",// 11
        "出路 2",// 12
        "出路 3",// 13
        "獄中信",// 14
        "致王震書",// 15
        "王震來信",// 16
        "出路 4"// 17
    ];
    rawLink.innerText = "pics of book " + bookNumber + "《" + bookNames[bookNumber] + "》";
}
const indexWrapper = document.getElementById("index-list");
if (indexWrapper != undefined) {
    let list = books[bookNumber]["indexList"];
    let html = "";
    let counter = 1;
    for (let link of list) {
        let nameSplit = link.split("/");
        const filename = nameSplit.pop();
        const folder = nameSplit.pop();
        let iframeSrc = link;
        if (window.location.href.startsWith("file://")) {
        } else {
            link = "book-reader.html?src=" + link;
            iframeSrc = link + "&is-iframe=true";
        }
        html += "<div class=\"item\" id=\"item-" + counter++ + "\" onmouseover=\"previewFile('" + iframeSrc + "')\" onclick=\"openFile('" + link + "')\">";
        html += "<div class=\"cover\" data-folder=\"" + folder + "\" data-filename=\"" + filename + "\"></div>";
        html += "<iframe src=\"" + iframeSrc + "\" scrolling=\"no\"></iframe>";
        html += "</div>";
    }
    indexWrapper.innerHTML = html;

    if (window.location.href.startsWith("file://")) {
        let element = document.getElementById("online");
        element.parentElement.removeChild(element);
        let style = document.createElement("style");
        style.innerText = `
.index-wrapper>.item>.cover::before {
background-color: rgba(84, 6, 3, .75);
}`;
        document.body.appendChild(style);
    }
}

function previewFile(link) {
    document.querySelector(".reader>iframe").src = link;
}

function openFile(link) {
    if (link == undefined) {
        link = document.querySelector(".reader>iframe").src;
    }
    if (link) {
        window.open(link, "_blank");
    }
}