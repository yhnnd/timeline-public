function ajax(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    // If specified, responseType must be empty string or "text"
    xhr.responseType = "text";
    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                callback(xhr.responseText, xhr.response);
            }
        }
    };
    xhr.send();
}

function openFile(filename, url) {
    if (url == undefined) {
        url = filename;
    }
    const modal = document.getElementsByClassName("modal")[0];
    if (modal != undefined) {
        modal.classList.add("opened");
        modal.innerHTML = "<div class='scroll'><div class='centered'>" +
            "<div class='title'>" + filename +
            "<button class='close float-right' onclick='closeModal()'>Close</button></div>" +
            "<div class='article-content'></div></div></div>";
        document.body.classList.add("modal-opened");
        ajax(url, function (text) {
            let content = "";
            for (let line of text.split("\n")) {
                let parsedLine = parseRichText(line);
                if (parsedLine == "") {
                    parsedLine = "<br>";
                }
                content += "<pre class=\"line\">" + parsedLine + "</pre>";
            }
            modal.querySelector(".article-content").innerHTML = content;
        });
    }
}

function openArticle(bookName, number) {
    const articles = window.books[bookName].indexList;
    const article = articles[number - 1];
    if (article != undefined) {
        openFile(article.split("/").pop(), article);
    }
}

function closeModal() {
    const modal = document.getElementsByClassName("modal")[0];
    modal.classList.remove("opened");
    modal.innerHTML = "";
    document.body.classList.remove("modal-opened");
}

function openBook(bookName) {
    const books = document.querySelectorAll(".book");
    for (const book of books) {
        book.classList.remove("opened");
        if (book.getAttribute("book-name") == bookName) {
            book.classList.add("opened");
        }
    }

    const articles = window.books[bookName].indexList;
    const container = document.getElementById("articles");
    container.innerHTML = "";
    let counter = 1;
    for (let article of articles) {
        const articleNumber = counter++;
        let div = document.createElement("div");
        div.classList = ["article"];
        div.id = "article-" + articleNumber;
        div.innerHTML = "<div>" + article.split("/").pop() + "</div><div class='text' style='max-height: 100px;overflow: hidden;'></div>";
        div.setAttribute("onclick", "openArticle('" + bookName + "','" + articleNumber + "')");
        container.append(div);

        ajax(article, function (responseText) {
            container.querySelector("#article-" + articleNumber + " > .text").innerText = responseText;
        });
    }
}

if (window.onload) {
    window.onloadprev = window.onload;
}
window.onload = function () {
    if (window.onloadprev) {
        window.onloadprev();
    }
    const container = document.getElementById("books");
    for (const [key, value] of Object.entries(window.books)) {
        let div = document.createElement("div");
        div.classList.add("book");
        div.innerHTML = (() => {
            if (value.indexList?.length) {
                const routeSegments = value.indexList[0].split("/");
                routeSegments.pop();
                const bookNameSegments = routeSegments.pop().split("-");
                return "<div class='book-id-indicator'>" + bookNameSegments[0] + "</div>" + bookNameSegments.pop();
            }
            return "<div class='book-id-indicator'>" + key + "</div>";
        })();
        div.setAttribute("book-name", key);
        div.setAttribute("onclick", "openBook('" + key + "')");
        container.append(div);
    }
    openBook(1);
}
