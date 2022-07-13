function isNumberPositive(num) {
    return Number(num) >= 0; // counting 0 as positive
}

function getLargestNumber(num1, num2, num3) {
    return Math.max(num1, num2, num3);
}

function truncate(num, maxDecimalCount) {
    let numStr = String(num);
    if (strCount(numStr, ".") == 0) {
        return numStr;
    } else {
        return numStr.slice(0, numStr.indexOf(".") + maxDecimalCount + 1);
    }
}