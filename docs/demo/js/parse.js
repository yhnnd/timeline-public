function parseRichText(line) {
    if (!line || !line.length) {
        return "";
    }
    let parsedLine = "";
    // <span color=red>text</span>
    // 1    2         3    4     5
    // 1 labelOpen
    // 2 labelOpenFirstSpace
    // 3 labelOpenEnd
    // 4 labelClose
    // 5 labelCloseEnd
    for (i = 0; i < line.length; ++i) {
        if (line[i] === '<' && (i === 0 || line[i - 1] !== '<') && (i === line.length - 1 || line[i + 1] !== '<')) {
            // 1 labelOpen
            let j = i + 1;
            let labelInfo = {
                "labelOpen": i
            };
            // 2 labelOpenFirstSpace
            for (; j < line.length; ++j) {
                if (line[j] == ">") {
                    break;
                }
                if (line[j] == " ") {
                    labelInfo["labelOpenFirstSpace"] = j;
                    break;
                }
            }
            // 3 labelOpenEnd
            for (; j < line.length; ++j) {
                if (line[j] == ">") {
                    labelInfo["labelOpenEnd"] = j;
                    break;
                }
            }
            // 4 labelClose
            for (; j < line.length; ++j) {
                if (line[j] == "<" && line[j + 1] == "/") {
                    labelInfo["labelClose"] = j;
                    break;
                }
            }
            // 5 labelCloseEnd
            for (; j < line.length; ++j) {
                if (line[j] == ">") {
                    labelInfo["labelCloseEnd"] = j;
                    break;
                }
            }
            // check
            if (labelInfo.labelOpen >= 0 &&
                labelInfo.labelOpenEnd > labelInfo.labelOpen &&
                labelInfo.labelClose > labelInfo.labelOpenEnd &&
                labelInfo.labelCloseEnd > labelInfo.labelClose) {
                i = j;
                if (labelInfo.labelOpen + 1 < labelInfo.labelOpenFirstSpace) {
                    labelInfo.tagName = line.substring(labelInfo.labelOpen + 1, labelInfo.labelOpenFirstSpace);
                } else if (labelInfo.labelOpen + 1 < labelInfo.labelOpenEnd) {
                    labelInfo.tagName = line.substring(labelInfo.labelOpen + 1, labelInfo.labelOpenEnd);
                } else {
                    labelInfo.tagName = "";
                }
                if (labelInfo.labelOpenFirstSpace && labelInfo.labelOpenFirstSpace < labelInfo.labelOpenEnd) {
                    labelInfo.ogAttributes = line.substring(labelInfo.labelOpenFirstSpace + 1, labelInfo.labelOpenEnd).split(" ");
                    if (labelInfo.ogAttributes.length) {
                        labelInfo.attributes = {};
                        for (let i in labelInfo.ogAttributes) {
                            const pair = labelInfo.ogAttributes[i].split("=");
                            labelInfo.attributes[pair[0]] = pair[1];
                        }
                        let styleValue = "";
                        if (labelInfo.attributes.color) {
                            styleValue += "color:" + labelInfo.attributes.color + ";";
                        }
                        if (labelInfo.attributes.backgroundColor) {
                            styleValue += "background-color:" + labelInfo.attributes.backgroundColor + ";";
                        }
                        if (labelInfo.attributes.border) {
                            styleValue += "border:" + labelInfo.attributes.border + " solid gray;";
                            styleValue += "border-radius:3px;";
                        }
                        labelInfo.attributesLine = "";
                        if (styleValue.length) {
                            labelInfo.attributesLine += "style=\"" + styleValue + "\"";
                        }
                        if (labelInfo.tagName == "link") {
                            labelInfo.attributesLine += " class=\"openfile-link\" onclick=\"openFile('" + labelInfo.attributes.url + "')\"";
                        }
                    }
                }
                if (labelInfo.labelOpenEnd + 1 < labelInfo.labelClose) {
                    labelInfo.innerText = line.substring(labelInfo.labelOpenEnd + 1, labelInfo.labelClose);
                } else {
                    labelInfo.innerText = "";
                }
                if (labelInfo.tagName == "link") {
                    labelInfo.tagName = "span";
                }
                parsedLine += "<" + labelInfo.tagName + " " + labelInfo.attributesLine + ">" + labelInfo.innerText + "</" + labelInfo.tagName + ">";
            } else {
                parsedLine += line[i];
            }
        } else {
            if (line[i] === '<') {
                parsedLine += '&lt;';
            } else {
                parsedLine += line[i];
            }
        }
    }
    return parsedLine;
}