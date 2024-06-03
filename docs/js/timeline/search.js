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

function initSearch(resultWrapper, configs) {
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
                document.querySelector(".global-navbar .info").innerText = "Search Ready";
                if (searchInfo.hasUnfinishedTask) {
                    if (searchInfo.keywords.length) {
                        searchKeywords(searchInfo.keywords, configs);
                    }
                    searchInfo.hasUnfinishedTask = false;
                    searchInfo.keywords = [];
                }
            } else {
                const indicator = "Search Loading " + searchInfo.counter + "/" + articles.length;
                document.querySelector(".global-navbar .info").innerText = indicator;
                resultWrapper.innerText = indicator;
            }
        });
    }
}

function searchInput(input, configs) {
    if ((input == undefined || input.value == undefined || input.value == "") && (!configs || !configs.type || ["text", "title"].includes(configs.type))) {
        return false;
    }
    const keywords = input.value.split(",");
    searchKeywords(keywords, configs);
}

function searchElement(element) {
    const nameIndex = element.getAttribute("data-name-index");
    if (nameIndex == undefined) {
        return false;
    }
    const keywords = window.peoplesNames[nameIndex];
    searchKeywords(keywords);
}

function searchKeywords(keywords, configs) {
    const searchWrapper = document.getElementsByClassName("search")[0];
    const keywordWrapper = document.getElementsByClassName("search-keyword")[0];
    const resultWrapper = searchWrapper.getElementsByClassName("search-result")[0];
    document.body.classList.add("modal-open");
    searchWrapper.parentElement.classList.add("on");
    keywordWrapper.innerText = keywords.join(",");
    keywordWrapper.parentElement.classList.add("on");
    if (searchInfo.isReady) {
        resultWrapper.innerHTML = "";
        for (const item of articles) {
            let times = 0;
            let isMatched = false;
            for (const keyword of keywords) {
                if (!configs || !configs.type || configs.type === "text") {
                    if (item.text.includes(keyword)) {
                        isMatched = true;
                        times += item.text.split(keyword).length - 1;
                    }
                } else if (configs.type === "image") {
                    if (item.text.split("\n").find(line => line.includes("<img ") && line.includes(keyword))) {
                        isMatched = true;
                        times += item.text.split("\n").filter(line => line.includes("<img ") && line.includes(keyword)).length;
                    }
                } else if (configs.type === "filename") {
                    const urlSegments = item.url.split("/");
                    const filename = urlSegments.pop();
                    if (filename.includes(keyword)) {
                        isMatched = true;
                        times += filename.split(keyword).length - 1;
                    }
                } else if (configs.type === "folder") {
                    const urlSegments = item.url.split("/");
                    urlSegments.pop();
                    const folder = urlSegments.pop();
                    if (folder.includes(keyword)) {
                        isMatched = true;
                        times += folder.split(keyword).length - 1;
                    }
                }
            }
            if (isMatched == true) {
                let link = document.createElement("div");
                link.classList.add("link");
                link.setAttribute("data-times", times);
                const nameSplit = item.url.split("/");
                item.filename = nameSplit.pop();
                item.folder = nameSplit.pop();
                const folder = (configs && configs.type === "folder") ? highlight(item.folder, keywords, configs) : item.folder;
                const filename = (configs && configs.type === "filename") ? highlight(item.filename, keywords, configs) : item.filename;
                const textContent = (!configs || !configs.type || ["text", "image"].includes(configs.type)) ? highlight(item.text, keywords, configs) : item.text;
                link.innerHTML = "<a target='_self' href='book-reader.html?src=" + item.url + "'>"
                    + "<span class='folder'>" + folder + "</span> / <span>" + filename + "</span></a>"
                    + "<div class='cover-wrapper'><div class='cover' onclick=\"window.open('book-reader.html?src=" + item.url + "','_self');\"></div></div>"
                    + "<div class='text'><pre>" + textContent + "</pre></div>";
                resultWrapper.appendChild(link);
            }
        }
        if (resultWrapper.innerHTML === "") {
            resultWrapper.innerHTML = "No Result";
        }
    } else {
        searchInfo.hasUnfinishedTask = true;
        searchInfo.keywords = keywords;
        if (searchInfo.isLoading == false) {
            initSearch(resultWrapper, configs);
        }
    }
}

function highlight(text, keywords, configs) {
    text = text.replaceAll("<", "&lt;");
    for (const keyword of keywords) {
        if (!configs || !configs.type || ["text", "folder", "filename"].includes(configs.type)) {
            const marker = "<code class='marker-wrapper'><var class='marker'><span>" + keyword.split("").map(ch => ch === '<' ? "&lt;" : ch).join("</span><span>") + "</span></var></code>";
            text = text.replaceAll(keyword.replaceAll("<", "&lt;"), marker);
        } else if (configs.type === "image") {
            text = text.split("\n").map(line => {
                if (line.includes("&lt;img ") && line.includes(keyword) && !line.includes("<code class='marker-wrapper'><var class='marker'>")) {
                    const tmp = document.createElement("div");
                    tmp.innerHTML = line.replace("&lt;img ", "<img ");
                    if (!tmp.querySelector("img").classList.contains("thumbnail")) {
                        tmp.querySelector("img").classList.add("thumbnail-2x");
                    }
                    return "<code class='marker-wrapper'><var class='marker'><span>" + tmp.innerHTML + "</span></var></code>";
                } else {
                    return line;
                }
            }).join("\n");
        }
    }
    return text;
}

function closeSearch() {
    const target = document.getElementsByClassName("search-backdrop")[0];
    target.classList.remove("on");
    const searchBar = document.getElementsByClassName("search-bar")[0];
    searchBar.classList.remove("on");
    document.body.classList.remove("modal-open");
    searchInfo.hasUnfinishedTask = false;
    searchInfo.keywords = [];
}
