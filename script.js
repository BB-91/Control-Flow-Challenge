"use strict";

function getYearsUntilRetirement(currentAge) {
    const retirementAge = 65;
    return retirementAge - Number(currentAge);
}

function getDaysUntilWeekend(fDay) {
    if (typeof fDay != "string") {
        throw new Error(`Not a string: ${fDay}`)
    }

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
    return result;
}

function getVegetablePrice(vegetableName) {
    if (typeof vegetableName != "string") {
        throw new Error(`Not a string: ${vegetableName}`)
    }

    const price = 
        match(vegetableName,
            {
                potatoes: 2.64,
                carrots: 2.64,
                broccoli: 1.05,
                cabbage: 1.60,
                asparagus: 3.65,
            },
            -1
        );
    return price;
}

function getYearsFromDays(days) {
    if (isNaN(days)) {
        throw new Error(`Not a number: ${days}`)
    }
    return Number(days) / 365.0;
}

function handleInputNumber(event) {
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

function handleInputAge(event) {
    let currentAge = event.target.value;
    if (currentAge === "") {
        return;
    }

    if (currentAge < 0) {
        currentAge = Math.max(0, currentAge);
        event.target.value = currentAge;
    }
    
    const yearsUntilRetirment = getYearsUntilRetirement(currentAge);
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

function handleSelectVegetable(event) {
    const vegetableName = event.target.value;
    const price = getVegetablePrice(vegetableName)
    let formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
    setSiblingPopupDivInnerText(event.target, `${formatter.format(price)}/kg`);
}

function handleSelectDay(event) {
    const day = event.target.value
    if (day === "") {
        return;
    }

    const fDay = titleCase(day)
    event.target.value = fDay

    const result = getDaysUntilWeekend(fDay);

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

function handleInputNumberOfDays(event) {
    let days = event.target.value
    if (days === "") {
        return;
    }

    days = Math.abs(days);
    event.target.value = days;

    const years = getYearsFromDays(days)
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

function handleInput3Numbers(event) {
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
        msg = `${error.message}`
        popupDiv.classList.add(CLASS.ERROR_MSG);
        event.target.value = error.fStr;
    }
    setSiblingPopupDivInnerText(event.target, msg.replace("values", "numbers"));
}

function handleInput3Names(event) {
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
    setSiblingPopupDivInnerText(event.target, msg.replace("values", "names"));
}

function filterEventTargetValue(event, filterMethod) {
    event.target.value = filterMethod(event.target.value);
}

function handleEnterKeydown(event, handlerName) {
    console.log(`event.type: ${event.type} -- handlerName: ${handlerName}`);

    if (typeof handlerName == "function") {
        // can use function.name to convert to string, but prefer string literal.
        throw new Error("Passed function instead of function name. (Use quotes)")
    }
    if (typeof handlerName != "string") {
        throw new Error("Must pass handler name as string")
    }

    if (event.key == "Enter") {
        window[`${handlerName}`](event);
    }
}

window.onload = (event) =>  {
    const popupParents = Array.from(document.getElementsByTagName(TAG.POPUP_PARENT));

    popupParents.forEach(parent => {
        const newChild = document.createElement(TAG.POPUP_DIV);
        newChild.classList.add(TAG.POPUP_DIV)
        parent.appendChild(newChild);
    });

    const inputElements = Array.from(document.getElementsByTagName("input"));

    inputElements.forEach(element => {
        let filterMethodName = ""

        switch (element.getAttribute("type")) {
            case "number":
                filterMethodName = "toNumberStr";
                break;
            case "text":
                if (element.getAttribute("csnames")){
                    filterMethodName = "toNameStr";
                } else if (element.getAttribute("csnumbers")) {
                    filterMethodName = "toCSNumberStr";
                } else {
                    throw new Error("Missing expected attribute");
                }
                break;
        }
        
        if (!filterMethodName) {
            throw new Error("filterMethodName not set")
        }
        element.setAttribute("oninput", `filterEventTargetValue(event, ${filterMethodName})`);

        let handlerName = getHandlerNameFromElementID(element.id);
        getElem(element.id).setAttribute("onkeydown", `handleEnterKeydown(event, "${handlerName}")`);
    });

    console.log("window loaded.");
}