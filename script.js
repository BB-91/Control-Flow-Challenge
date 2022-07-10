"use strict";

function match(key, obj, default_val) {
    const value = obj[key]
    return obj.hasOwnProperty(key) ? value : default_val
}

function titleCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function isNumberPositive(num) {
    if (num == 0) {
        throw new Error("number is zero.");
    } else {
        return num > 0;
    }
}

function convertDaysToAge(days) {
    return days / 365.0;
}

function getLargestNumber(num1, num2, num3) {
    return Math.max(num1, num2, num3);
}

function allNumbersPositive(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] < 0) { // counting 0 as positive
            return false;
        }
    }
    return true;
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

function isPosNegZeroNaN(event) {
    let value = event.target.value
    if (value === "") {
        return;
    }

    if (isNaN(value)) {
        alert(`'${value}' is not a number.`);
    } else if (value == 0) {
        alert("value is zero.");
    } else if (isNumberPositive(value)) {
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

        alert(msg);
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
    const currentAge = event.target.value;
    if (currentAge === "") {
        return;
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
        return;
    }

    while (fStr.endsWith(",")) {
        fStr = fStr.slice(0, fStr.length - 1);
    }

    let commaCount = strCount(fStr, ",");
    if (commaCount != requiredCommaCount) {
        alert(`Expected ${requiredCommaCount} commas, got ${commaCount}`);
        return;
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

    const sortedNumbers = dataArray[0];
    const numbersStr = dataArray[1];

    if (numbersStr) {
        alert(`Sorted: ${numbersStr}\nLargest: ${getLargestNumber(...sortedNumbers)}`);
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
    const elemID = "vegetable-price-displayer";
    let vegetablePriceDisplayer = document.getElementById(elemID);
    if (!vegetablePriceDisplayer) {
        throw new Error(`Can't find element with ID '${elemID}'`)
    }

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
    vegetablePriceDisplayer.innerText = `${formatter.format(price)}/kg`;
}