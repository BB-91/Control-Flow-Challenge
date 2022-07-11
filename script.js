"use strict";

function isPosOrNeg(event) {
    let value = event.target.value
    if (value === "") {
        return;
    }

    if (isNaN(value)) {
        setSiblingPopupDivInnerText(event.target, `'${value}' is not a number.`);
    } else if (isNumberPositive(value)) {
        if (value == 0) {
            value = Math.abs(0);
            event.target.value = value;
        }
        setSiblingPopupDivInnerText(event.target, `${value} is a positive number.`);
    } else {
        setSiblingPopupDivInnerText(event.target, `${value} is a negative number.`);
    }
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
        msg += `you should've retired ${Math.abs(yearsUntilRetirment)} ${yearStr} ago!`;
    }
    setSiblingPopupDivInnerText(event.target, msg);
}

function calculateDaysUntilWeekend(event) {
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
        setSiblingPopupDivInnerText(event.target, result)
    } else {
        const msg =
            match(result,
                {
                    0:`${fDay} is a weekend. Nice!`,
                    1:`There is 1 day between ${fDay} and Saturday.`
                },
                `There are ${result} days between ${fDay} and Saturday.`
            );

        setSiblingPopupDivInnerText(event.target, msg)
    }
}

function calculateNumberOfYears(event) {
    let days = event.target.value
    if (days === "") {
        return;
    }

    days = Math.abs(days);
    event.target.value = days;

    const years = days / 365.0;
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

    setSiblingPopupDivInnerText(event.target, msg);
}

function calculateLargestNumber(event) {
    let msg = "";
    let popupDiv = getSiblingPopupDiv(event.target);

    try {
        let str = event.target.value;
        const dataArray = getCommaSeparatedArrayAndStr(str, true);
        if (dataArray.length != 2) {
            return;
        }
    
        const sortedNumbers = dataArray[0].map(element => Number(element));
        const numbersStr = dataArray[1];
    
        if (numbersStr) {
            event.target.value = numbersStr;

            msg = `Sorted: ${numbersStr}\n`
                + `Largest: ${getLargestNumber(...sortedNumbers)}\n`
                + `All numbers positive: ${allNumbersPositive(sortedNumbers)}`
            
            popupDiv.classList.remove(CLASS.ERROR_MSG);
        }
    } catch (error) {
        msg = `${error.name}: ${error.message}`
        popupDiv.classList.add(CLASS.ERROR_MSG);
        event.target.value = error.fStr;
    }
    setSiblingPopupDivInnerText(event.target, msg);
}

function showLastName(event) {
    let msg = "";
    let popupDiv = getSiblingPopupDiv(event.target);

    try {
        let str = event.target.value;
        const dataArray = getCommaSeparatedArrayAndStr(str, false);
        if (dataArray.length != 2) {
            return;
        }

        const namesStr = titleCaseArrayStr(dataArray[0]);
    
        if (namesStr) {
            msg = `Last name entered: ${back(namesStr.split(", "))}`;
            popupDiv.classList.remove(CLASS.ERROR_MSG);
            event.target.value = namesStr;
        }        
    } catch (error) {
        msg = error.message;
        popupDiv.classList.add(CLASS.ERROR_MSG);
        event.target.value = titleCaseArrayStr(error.subStrings);
    }
    setSiblingPopupDivInnerText(event.target, msg)
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
    setChildPopupDivInnerText("group-vegetable", `${formatter.format(price)}/kg`);
}

window.onload = (event) =>  {
    const popupParents = Array.from(document.getElementsByTagName(TAG.POPUP_PARENT));

    popupParents.forEach(parent => {
        const newChild = document.createElement(TAG.POPUP_DIV);
        newChild.classList.add(TAG.POPUP_DIV)
        parent.appendChild(newChild);
    });
}