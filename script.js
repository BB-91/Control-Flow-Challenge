"use strict";

function getElem(elementID) {
    let element = document.getElementById(elementID);
    if (!element) {
        throw new Error(`Can't find element with ID '${elementID}'`)
    }
    return element;
}

function setElemInnerText(elementID, newInnerText){
    getElem(elementID).innerText = newInnerText;
}

function match(key, obj, default_val) {
    const value = obj[key]
    return obj.hasOwnProperty(key) ? value : default_val
}

function titleCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function isNumberPositive(num) {
    return num >= 0; // counting 0 as positive
}

function convertDaysToAge(days) {
    return days / 365.0;
}

function getLargestNumber(num1, num2, num3) {
    return Math.max(num1, num2, num3);
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

function allNumbersPositive(numbers) {
    if (!isTypedArray(numbers, "number")) {
        throw new Error(`Not a number array`)
    }
    return isNumberPositive(Math.min(...numbers));
}

function back(array) {
    return array[array.length - 1];
}

function getLastName(names) {
    return back(names);
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

function isPosOrNeg(event) {
    let value = event.target.value
    if (value === "") {
        return;
    }

    if (isNaN(value)) {
        alert(`'${value}' is not a number.`);
    } else if (isNumberPositive(value)) {
        if (value == 0) {
            value = Math.abs(0);
            event.target.value = value;
        }
        alert(`${value} is a positive number.`);
    } else {
        alert(`${value} is a negative number.`);
    }
}

function calculateDaysUntilWeekend(event){
    const day = event.target.value
    if (day === "") {
        return;
    }

    const fDay = titleCase(day)
    event.target.value = fDay

    const result = 
        match(fDay,
            {
                Monday:5,
                Tuesday:4,
                Wednesday:3,
                Thursday:2,
                Friday:1,
                Saturday:0,
                Sunday:0,
            },
            `'${fDay}' is not a valid day. (e.g. Monday, Tuesday, Wednesday, etc.)`
        );

    if (isNaN(result)) {
        alert(result);
    } else {
        const msg =
            match(result,
                {
                    0:`${fDay} is a weekend. Nice!`,
                    1:`There is 1 day between ${fDay} and Saturday.`
                },
                `There are ${result} days between ${fDay} and Saturday.`
            );

        // alert(msg);
        setElemInnerText("weekend-distance-displayer", msg)
    }
}

function getNoun(count, singular) {
    return `${count == 1 ? singular : singular + "s"}`
}

function truncate(num, maxDecimalCount) {
    let numStr = String(num);
    if (strCount(numStr, ".") == 0) {
        return numStr;
    } else {
        return numStr.slice(0, numStr.indexOf(".") + maxDecimalCount);
    }
}

function calculateNumberOfYears(event) {
    let days = event.target.value
    if (days === "") {
        return;
    }

    days = Math.abs(days);
    event.target.value = days;

    const years = convertDaysToAge(days);
    const dayNoun = getNoun(days, "day");
    const yearNoun = getNoun(years, "year");
    const yearsStr = String(years);
    const maxDecimalCount = 4;

    let fYearsStr = truncate(years, maxDecimalCount); // Number.toFixed() uses rounding
    while (fYearsStr.endsWith("0")) {
        fYearsStr = fYearsStr.slice(0, fYearsStr.length - 1);
    }

    if (fYearsStr.endsWith(".")) {
        fYearsStr = fYearsStr.replaceAll(".", "");
    }

    let msg = `${days} ${dayNoun} = ${fYearsStr} ${yearNoun}`;

    if (yearsStr.valueOf() !== fYearsStr.valueOf()) {
        msg += " (truncated)"
    }

    alert(msg);
}

function calculateYearsUntilRetirement(event) {
    let currentAge = event.target.value;
    if (currentAge === "") {
        return;
    }

    if (currentAge < 0) {
        currentAge = Math.max(0, currentAge);
        event.target.value = currentAge;
    }

    const yearsUntilRetirment = 65 - currentAge;
    const yearStr = Math.abs(yearsUntilRetirment) == 1 ? "year" : "years";
    
    let msg = `At age ${currentAge}, `;

    if (yearsUntilRetirment > 0) {
        msg += `you have ${yearsUntilRetirment} ${yearStr} until retirement.`
    } else if (yearsUntilRetirment == 0) {
        msg += `you can retire now!`
    } else {
        msg += `you should have retired ${Math.abs(yearsUntilRetirment)} ${yearStr} ago!`
    }
    alert(msg)
}

function getCommaSeparatedArrayAndStr(str, shouldSort, requiredElementCount = 3) {
    let dataArray = [];
    const requiredCommaCount = requiredElementCount - 1
    let fStr = str.trim();

    if (str === "") {
        return dataArray;
    }

    while (fStr.endsWith(",")) {
        fStr = fStr.slice(0, fStr.length - 1);
    }

    let commaCount = strCount(fStr, ",");
    if (commaCount != requiredCommaCount) {
        alert(`Expected ${requiredCommaCount} commas, got ${commaCount}`);
        return dataArray;
    }

    fStr = fStr.replaceAll(" ", "");
    let subStrings = fStr.split(",");

    if (subStrings.length != 3) {
        alert("Please enter exactly 3 values, separated by commas.")
    } else {
        if (shouldSort) {
            subStrings.sort();
        }
        let arrayStr = String(subStrings).replaceAll(",", ", ");
        dataArray.push(subStrings);
        dataArray.push(arrayStr);
    }

    return dataArray;
}

function calculateLargestNumber(event) {
    let str = event.target.value;
    const dataArray = getCommaSeparatedArrayAndStr(str, true);
    if (dataArray.length != 2) {
        return;
    }

    const sortedNumbers = dataArray[0].map(element => Number(element));
    const numbersStr = dataArray[1];

    if (numbersStr) {
        alert(`Sorted: ${numbersStr}\n`
                + `Largest: ${getLargestNumber(...sortedNumbers)}\n`
                + `All numbers positive: ${allNumbersPositive(sortedNumbers)}`
                );
        event.target.value = numbersStr;
    }
}

function showLastName(event) {
    let str = event.target.value;
    const dataArray = getCommaSeparatedArrayAndStr(str, false);
    if (dataArray.length != 2) {
        return;
    }

    const unsortedNames = dataArray[0].map(name => titleCase(name));
    const namesStr = String(unsortedNames).replaceAll(",", ", ");

    if (namesStr) {
        alert(`Last name entered: ${back(unsortedNames)}`);
        event.target.value = namesStr;
    }
}

function handleSelectVegetable(event) {
    const selection = event.target.value;

    const price = 
        match(selection,
            {
                potatoes: 2.64,
                carrots: 2.64,
                broccoli: 1.05,
                cabbage: 1.60,
                asparagus: 3.65,
            },
            0.0
        );

    let formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
    setElemInnerText("vegetable-price-displayer", `${formatter.format(price)}/kg`);
}