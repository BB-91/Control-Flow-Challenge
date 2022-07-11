function back(array) {
    return array[array.length - 1];
}

function titleCaseArray(array) {
    return array.map(str => titleCase(str));
}

function titleCaseArrayStr(array) {
    return String(titleCaseArray(array)).replaceAll(",", ", ");
}

function isTypedArray(array, type) {
    if (typeof type != "string") {
        throw new Error(`Second arg 'type' is not a string`)
    }
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (typeof element != type) {
            return false;
        }
    }
    return true;
}

function isNumStrArray(array) {
    if (!isTypedArray(array, "string")) {
        return false;
    } else {
        array.forEach(str => {
            if (isNaN(str)) {
                return false;
            }
        });
    }
    return true;
}

function numStrArrayToNumArray(array) {
    if (!isNumStrArray) {
        throw new Error(`Not a number string array`);
    } else {
        return array.map(numStr => Number(numStr));
    }
}

function allNumbersPositive(numbers) {
    if (!isTypedArray(numbers, "number")) {
        throw new Error(`Not a number array`)
    }
    return isNumberPositive(Math.min(...numbers));
}