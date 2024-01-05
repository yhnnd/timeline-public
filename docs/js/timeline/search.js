// Thu Dec 07 2023
// require function ajax

const articles = [];

const searchInfo = {
    counter: 0,
    isLoading: false,
    isReady: false,
    hasUnfinishedTask: false,
    keywords: []
};

function initSearch() {
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
    searchInfo.counter = 0;
    searchInfo.isLoading = true;
    searchInfo.isReady = false;
    for (const i in articles) {
        const url = articles[i].url;
        ajax(url, articles[i]["text"], function (responseText) {
            articles[i].text = responseText;
            if (++searchInfo.counter == articles.length) {
                searchInfo.isLoading = false;
                searchInfo.isReady = true;
                document.querySelector(".navbar .info").innerText = "Search Ready";
                if (searchInfo.hasUnfinishedTask) {
                    if (searchInfo.keywords.length) {
                        searchKeywords(searchInfo.keywords);
                    }
                    searchInfo.hasUnfinishedTask = false;
                    searchInfo.keywords = [];
                }
            } else {
                const indicator = "Search Loading " + searchInfo.counter + "/" + articles.length;
                document.querySelector(".navbar .info").innerText = indicator;
                resultWrapper.innerText = indicator;
            }
        });
    }
}

function searchInput(input) {
    if (input == undefined || input.value == undefined || input.value == "") {
        return false;
    }
    const keywords = input.value.split(",");
    searchKeywords(keywords);
}

function searchElement(element) {
    const nameIndex = element.getAttribute("data-name-index");
    if (nameIndex == undefined) {
        return false;
    }
    const keywords = window.peoplesNames[nameIndex];
    searchKeywords(keywords);
}

function searchKeywords(keywords) {
    const searchWrapper = document.getElementsByClassName("search")[0];
    const keywordWrapper = searchWrapper.getElementsByClassName("search-keyword")[0];
    document.body.classList.add("modal-open");
    searchWrapper.parentElement.classList.add("on");
    keywordWrapper.innerText = keywords.join(",");
    if (searchInfo.isReady) {
        const resultWrapper = searchWrapper.getElementsByClassName("search-result")[0];
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
                const nameSplit = item.url.split("/");
                item.filename = nameSplit.pop();
                item.folder = nameSplit.pop();
                link.innerHTML = "<a target='_self' href='book-reader.html?src=" + item.url + "'>"
                    + "<span class='folder'>" + item.folder + "</span> / <span>" + item.filename + "</span></a>"
                    + "<div class='cover-wrapper'><div class='cover' onclick=\"window.open('book-reader.html?src=" + item.url + "','_self');\"></div></div>"
                    + "<div class='text'><pre>" + highlight(item.text, keywords) + "</pre></div>";
                resultWrapper.appendChild(link);
            }
        }
    } else {
        searchInfo.hasUnfinishedTask = true;
        searchInfo.keywords = keywords;
        if (searchInfo.isLoading == false) {
            initSearch();
        }
    }
}

function highlight(text, keywords) {
    text = text.replaceAll("<", "&lt;");
    for (const keyword of keywords) {
        const marker = "<code class='marker-wrapper'><var class='marker'><span>" + keyword.split("").join("</span><span>") + "</span></var></code>";
        text = text.replaceAll(keyword, marker);
    }
    return text;
}

function closeSearch() {
    const target = document.getElementsByClassName("search-backdrop")[0];
    target.classList.remove("on");
    document.body.classList.remove("modal-open");
    searchInfo.hasUnfinishedTask = false;
    searchInfo.keywords = [];
}
