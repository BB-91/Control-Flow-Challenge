function titleCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1); // non-first uppercase letters may be desired for abbreviations, etc.
}

function getNoun(count, singular) {
    return `${count == 1 ? singular : singular + "s"}`
}

function strCount(str, subStr) {
    let count = 0;
    let temp = str;

    if (typeof str != "string") {
        throw new Error(`Not a string: ${str}`)
    }
    if (typeof subStr != "string") {
        throw new Error(`Not a string: ${subStr}`)
    }

    while (temp.includes(subStr)) {
        count++;
        let index = temp.indexOf(subStr);
        temp = temp.slice(index + subStr.length)
    }
    return count;
}

function getCommaSeparatedArrayAndStr(str, shouldSort, requiredElementCount = 3) {
    let dataArray = [];
    let fStr = str.trim();

    if (str === "") {
        return dataArray;
    }
    
    fStr = fStr.replaceAll(" ", ",")
    fStr = fStr.replaceAll("\t", ",")

    while (strCount(fStr, ",,") > 0) {
        fStr = fStr.replaceAll(",,", ",");
    }

    while (fStr.endsWith(",")) {
        fStr = fStr.slice(0, fStr.length - 1);
    }

    while (fStr.startsWith(",")) {
        fStr = fStr.slice(1);
    }

    fStr = fStr.replaceAll(",", ", ");
    let subStrings = fStr.split(", ");

    if (subStrings.length != 3) {
        throw {name: "InvalidElementCount",
                message: `Please enter ${requiredElementCount} comma-separated values. (Got ${subStrings.length})`,
                fStr: fStr,
                subStrings: subStrings,
        };
    } else {

        if (shouldSort) {
            if (isNumStrArray(subStrings)) {
                let numArray = numStrArrayToNumArray(subStrings);
                numArray.sort((a, b) => a - b);
                subStrings = numArray.map(num => String(num));
            } else {
                subStrings.sort();
            }

        }

        let arrayStr = String(subStrings).replaceAll(",", ", ");
        dataArray.push(subStrings);
        dataArray.push(arrayStr);
    }

    return dataArray;
}