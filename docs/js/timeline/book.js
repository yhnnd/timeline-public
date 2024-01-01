const bookNumber = getParameter("book");
const rawLink = document.getElementById("raw-link");
if (rawLink != undefined) {
    rawLink.href = "raw-" + bookNumber + ".html";
    const bookNames = [
        "",
        "黑書 1",
        "黑書 2",
        "散逸 1",
        "黑書 3",
        "棕書 1",
        "大棕書",
        "棕書 2",
        "棕書 3",
        "黑書 4",
        "黑書 5",
        "出路 1",
        "出路 2",
        "出路 3"
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
        html += "<a class=\"item\" id=\"item-" + counter++ + "\" href=\"" + link + "\">";
        html += "<div class=\"cover\" data-folder=\"" + folder + "\" data-filename=\"" + filename + "\"></div>";
        html += "<iframe src=\"" + iframeSrc + "\" scrolling=\"no\"></iframe>";
        html += "</a>";
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