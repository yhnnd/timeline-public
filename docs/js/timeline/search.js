// Thu Dec 07 2023
function ajax(url, responseText, callback) {
    if (responseText != undefined && callback && typeof callback === "function") {
        // short circuit.
        callback(responseText);
        return;
    }
    const req = new XMLHttpRequest();
    req.addEventListener("load", () => {
        if (callback && typeof callback === "function") {
            callback(req.responseText);
        } else {
            console.log("loadData: no callback");
        }
    });
    req.open("GET", url);
    req.send();
}

const articles = [];

function search(input) {
    if (input == undefined || input.value == undefined || input.value == "") {
        return false;
    }
    
    const keywords = input.value.split(",");

    document.body.classList.add("modal-open");
    // const keyword = element.innerText;
    const searchWrapper = document.getElementsByClassName("search")[0];
    searchWrapper.parentElement.classList.add("on");
    const keywordWrapper = searchWrapper.getElementsByClassName("search-keyword")[0];
    keywordWrapper.innerText = keywords.join(",");

    const resultWrapper = searchWrapper.getElementsByClassName("search-result")[0];

    if (articles.length == 0) {
        for (const book of window.books) {
            if (book != undefined && book["indexList"] != undefined) {
                for (const url of book["indexList"]) {
                    articles.push({
                        "url": url,
                        "text": undefined
                    });
                }
            }
        }
    }

    let counter = 0;
    for (const i in articles) {
        const url = articles[i].url;
        ajax(url, articles[i]["text"], function (responseText) {
            articles[i].text = responseText;
            if (++counter == articles.length) {
                resultWrapper.innerHTML = "";
                for (const item of articles) {
                    let times = 0;
                    let isMatched = false;
                    for (const keyword of keywords) {
                        if (item.text.includes(keyword)) {
                            isMatched = true;
                            times += item.text.split(keyword).length - 1;
                        }
                    }
                    if (isMatched == true) {
                        let link = document.createElement("div");
                        link.classList.add("link");
                        link.setAttribute("data-times", times);
                        link.innerHTML = "<div class='text'><pre>" + item.text + "</pre></div>" +
                            "<a target='_blank' href='book-reader.html?src=" + item.url + "'>" + item.url + "</a>";
                        resultWrapper.appendChild(link);
                    }
                }
            } else {
                resultWrapper.innerText = "searching " + counter + "/" + articles.length;
            }
        });
    }
}

function closeSearch() {
    const target = document.getElementsByClassName("search-backdrop")[0];
    target.classList.remove("on");
    document.body.classList.remove("modal-open");
}