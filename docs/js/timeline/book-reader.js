// Mon Oct 23 2023
// require function ajax

const symbols = ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳', '㉑', '㉒', '㉓', '㉔', '㉕', '㉖', '㉗', '㉘', '㉙', '㉚', '㉛', '㉜', '㉝', '㉞', '㉟', '㊱', '㊲', '㊳', '㊴', '㊵', '㊶', '㊷', '㊸', '㊹', '㊺', '㊻', '㊼', '㊽', '㊾', '㊿'];

const censored = ["中國", "中国", "中共國", "中共国", "共匪國", "共匪国", "大陸", "大陆", "美國", "美国", "淪陷區", "沦陷区", "匪佔區", "匪占区", "共產主義", "共产主义", "共產黨", "共产党", "中共", "共匪", "共黨", "共党", "赤黨", "赤党", "赤匪", "匪黨", "匪党", "匪諜", "匪谍", "毛賊", "毛贼", "黨中央", "党中央", "紅色政權", "CCP", "天安門", "天安门", "中華民國", "中华民国", "國民黨", "国民党", "反共", "滅共", "灭共"];

const src = getParameter("src");
if (src != undefined) {
    ajax(src, undefined, function (responseText) {
        console.log("responseText: ", responseText);

        responseText = responseText.replaceAll("<", "&lt;");

        // highlight all the symbols like ①, ②, ③.
        for (const symbol of symbols) {
            const replacement = "<span class='highlight-red'>" + symbol + "</span>";
            responseText = responseText.replaceAll(symbol, replacement);
        }

        // censor all the censored words
        for (const item of censored) {
            const replacement = "<span class='censored'>" + "█".repeat(item.length) + "</span>";
            responseText = responseText.replaceAll(item, replacement);
        }

        if (window.peoplesNames != undefined) {
            window.peoplesNames = window.peoplesNames.sort((a, b) => {
                return b[0].split(";")[0].length - a[0].split(";")[0].length;
            });
            for (const i in window.peoplesNames) {
                const items = window.peoplesNames[i];
                for (const item of items) {
                    const name = item.split(";")[0];
                    let info = item.split(";")[1];
                    if (info == undefined) {
                        info = "点击搜索";
                    }
                    let nameLink = document.createElement("div");
                    nameLink.classList.add("name-link");
                    nameLink.setAttribute("data-info", info);
                    nameLink.setAttribute("data-name-index", i);
                    nameLink.setAttribute("onclick", "searchElement(this)");
                    nameLink.innerHTML = "<span>" + name.split("").join("</span><span>") + "</span>";
                    responseText = responseText.replaceAll(name, nameLink.outerHTML);
                }
            }
        }

        const pre = document.getElementsByClassName("container")[0].getElementsByTagName("pre")[0];
        pre.innerHTML = responseText;
    });
}

const isIframe = getParameter("is-iframe");
if (isIframe == "true") {
    document.body.setAttribute("is-iframe", "true");
}