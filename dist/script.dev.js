"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function isPosOrNeg(event) {
  var value = event.target.value;

  if (value === "") {
    return;
  }

  if (isNaN(value)) {
    setSiblingPopupDivInnerText(event.target, "'".concat(value, "' is not a number."));
  } else if (isNumberPositive(value)) {
    if (value == 0) {
      value = Math.abs(0);
      event.target.value = value;
    }

    setSiblingPopupDivInnerText(event.target, "".concat(value, " is a positive number."));
  } else {
    setSiblingPopupDivInnerText(event.target, "".concat(value, " is a negative number."));
  }
}

function calculateYearsUntilRetirement(event) {
  var currentAge = event.target.value;

  if (currentAge === "") {
    return;
  }

  if (currentAge < 0) {
    currentAge = Math.max(0, currentAge);
    event.target.value = currentAge;
  }

  var yearsUntilRetirment = 65 - currentAge;
  var yearStr = Math.abs(yearsUntilRetirment) == 1 ? "year" : "years";
  var msg = "At age ".concat(currentAge, ", ");

  if (yearsUntilRetirment > 0) {
    msg += "you have ".concat(yearsUntilRetirment, " ").concat(yearStr, " until retirement.");
  } else if (yearsUntilRetirment == 0) {
    msg += "you can retire now!";
  } else {
    msg += "you should've retired ".concat(Math.abs(yearsUntilRetirment), " ").concat(yearStr, " ago!");
  }

  setSiblingPopupDivInnerText(event.target, msg);
}

function calculateDaysUntilWeekend(event) {
  var day = event.target.value;

  if (day === "") {
    return;
  }

  var fDay = titleCase(day);
  event.target.value = fDay;
  var result = match(fDay, {
    Monday: 5,
    Tuesday: 4,
    Wednesday: 3,
    Thursday: 2,
    Friday: 1,
    Saturday: 0,
    Sunday: 0
  }, "'".concat(fDay, "' is not a valid day. (e.g. Monday, Tuesday, Wednesday, etc.)"));

  if (isNaN(result)) {
    setSiblingPopupDivInnerText(event.target, result);
  } else {
    var msg = match(result, {
      0: "".concat(fDay, " is a weekend. Nice!"),
      1: "There is 1 day between ".concat(fDay, " and Saturday.")
    }, "There are ".concat(result, " days between ").concat(fDay, " and Saturday."));
    setSiblingPopupDivInnerText(event.target, msg);
  }
}

function calculateNumberOfYears(event) {
  var days = event.target.value;

  if (days === "") {
    return;
  }

  days = Math.abs(days);
  event.target.value = days;
  var years = days / 365.0;
  var dayNoun = getNoun(days, "day");
  var yearNoun = getNoun(years, "year");
  var yearsStr = String(years);
  var maxDecimalCount = 4;
  var fYearsStr = truncate(years, maxDecimalCount); // Number.toFixed() uses rounding

  while (fYearsStr.endsWith("0")) {
    fYearsStr = fYearsStr.slice(0, fYearsStr.length - 1);
  }

  if (fYearsStr.endsWith(".")) {
    fYearsStr = fYearsStr.replaceAll(".", "");
  }

  var msg = "".concat(days, " ").concat(dayNoun, " = ").concat(fYearsStr, " ").concat(yearNoun);

  if (yearsStr.valueOf() !== fYearsStr.valueOf()) {
    msg += " (truncated)";
  }

  setSiblingPopupDivInnerText(event.target, msg);
}

function calculateLargestNumber(event) {
  var msg = "";
  var popupDiv = getSiblingPopupDiv(event.target);

  try {
    var str = event.target.value;
    var dataArray = getCommaSeparatedArrayAndStr(str, true);

    if (dataArray.length != 2) {
      return;
    }

    var sortedNumbers = dataArray[0].map(function (element) {
      return Number(element);
    });
    var numbersStr = dataArray[1];

    if (numbersStr) {
      event.target.value = numbersStr;
      msg = "Sorted: ".concat(numbersStr, "\n") + "Largest: ".concat(getLargestNumber.apply(void 0, _toConsumableArray(sortedNumbers)), "\n") + "All numbers positive: ".concat(allNumbersPositive(sortedNumbers));
      popupDiv.classList.remove(CLASS.ERROR_MSG);
    }
  } catch (error) {
    msg = "".concat(error.name, ": ").concat(error.message);
    popupDiv.classList.add(CLASS.ERROR_MSG);
    event.target.value = error.fStr;
  }

  setSiblingPopupDivInnerText(event.target, msg);
}

function showLastName(event) {
  var msg = "";
  var popupDiv = getSiblingPopupDiv(event.target);

  try {
    var str = event.target.value;
    var dataArray = getCommaSeparatedArrayAndStr(str, false);

    if (dataArray.length != 2) {
      return;
    }

    var namesStr = titleCaseArrayStr(dataArray[0]);

    if (namesStr) {
      msg = "Last name entered: ".concat(back(namesStr.split(", ")));
      popupDiv.classList.remove(CLASS.ERROR_MSG);
      event.target.value = namesStr;
    }
  } catch (error) {
    msg = error.message;
    popupDiv.classList.add(CLASS.ERROR_MSG);
    event.target.value = titleCaseArrayStr(error.subStrings);
  }

  setSiblingPopupDivInnerText(event.target, msg);
}

function handleSelectVegetable(event) {
  var selection = event.target.value;
  var price = match(selection, {
    potatoes: 2.64,
    carrots: 2.64,
    broccoli: 1.05,
    cabbage: 1.60,
    asparagus: 3.65
  }, 0.0);
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  setChildPopupDivInnerText("group-vegetable", "".concat(formatter.format(price), "/kg"));
}

window.onload = function (event) {
  var popupParents = Array.from(document.getElementsByTagName(TAG.POPUP_PARENT));
  popupParents.forEach(function (parent) {
    var newChild = document.createElement(TAG.POPUP_DIV);
    newChild.classList.add(TAG.POPUP_DIV);
    parent.appendChild(newChild);
  });
};