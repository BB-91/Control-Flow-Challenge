"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function match(key, obj, default_val) {
  var value = obj[key];
  return obj.hasOwnProperty(key) ? value : default_val;
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

function isTypedArray(array, type) {
  if (typeof type != "string") {
    throw new Error("Second arg 'type' is not a string");
  }

  for (var i = 0; i < array.length; i++) {
    var element = array[i];

    if (_typeof(element) != type) {
      return false;
    }
  }

  return true;
}

function allNumbersPositive(numbers) {
  if (!isTypedArray(numbers, "number")) {
    throw new Error("Not a number array");
  }

  return Math.min.apply(Math, _toConsumableArray(numbers)) >= 0; // counting 0 as positive 
}

function back(array) {
  return array[array.length - 1];
}

function getLastName(names) {
  return back(names);
}

function strCount(str, subStr) {
  var count = 0;
  var temp = str;

  if (typeof str != "string") {
    throw new Error("Not a string: ".concat(str));
  }

  if (typeof subStr != "string") {
    throw new Error("Not a string: ".concat(subStr));
  }

  while (temp.includes(subStr)) {
    count++;
    var index = temp.indexOf(subStr);
    temp = temp.slice(index + subStr.length);
  }

  return count;
}

function isPosNegZeroNaN(event) {
  var value = event.target.value;

  if (value === "") {
    return;
  }

  if (isNaN(value)) {
    alert("'".concat(value, "' is not a number."));
  } else if (value == 0) {
    alert("value is zero.");
  } else if (isNumberPositive(value)) {
    alert("".concat(value, " is a positive number."));
  } else {
    alert("".concat(value, " is a negative number."));
  }
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
    alert(result);
  } else {
    var msg = match(result, {
      0: "".concat(fDay, " is a weekend. Nice!"),
      1: "There is 1 day between ".concat(fDay, " and Saturday.")
    }, "There are ".concat(result, " days between ").concat(fDay, " and Saturday."));
    alert(msg);
  }
}

function getNoun(count, singular) {
  return "".concat(count == 1 ? singular : singular + "s");
}

function truncate(num, maxDecimalCount) {
  var numStr = String(num);

  if (strCount(numStr, ".") == 0) {
    return numStr;
  } else {
    return numStr.slice(0, numStr.indexOf(".") + maxDecimalCount);
  }
}

function calculateNumberOfYears(event) {
  var days = event.target.value;

  if (days === "") {
    return;
  }

  days = Math.abs(days);
  event.target.value = days;
  var years = convertDaysToAge(days);
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

  alert(msg);
}

function calculateYearsUntilRetirement(event) {
  var currentAge = event.target.value;

  if (currentAge === "") {
    return;
  }

  var yearsUntilRetirment = 65 - currentAge;
  var yearStr = Math.abs(yearsUntilRetirment) == 1 ? "year" : "years";
  var msg = "At age ".concat(currentAge, ", ");

  if (yearsUntilRetirment > 0) {
    msg += "you have ".concat(yearsUntilRetirment, " ").concat(yearStr, " until retirement.");
  } else if (yearsUntilRetirment == 0) {
    msg += "you can retire now!";
  } else {
    msg += "you should have retired ".concat(Math.abs(yearsUntilRetirment), " ").concat(yearStr, " ago!");
  }

  alert(msg);
}

function getCommaSeparatedArrayAndStr(str, shouldSort) {
  var requiredElementCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
  var dataArray = [];
  var requiredCommaCount = requiredElementCount - 1;
  var fStr = str.trim();

  if (str === "") {
    return;
  }

  while (fStr.endsWith(",")) {
    fStr = fStr.slice(0, fStr.length - 1);
  }

  var commaCount = strCount(fStr, ",");

  if (commaCount != requiredCommaCount) {
    alert("Expected ".concat(requiredCommaCount, " commas, got ").concat(commaCount));
    return;
  }

  fStr = fStr.replaceAll(" ", "");
  var subStrings = fStr.split(",");

  if (subStrings.length != 3) {
    alert("Please enter exactly 3 values, separated by commas.");
  } else {
    if (shouldSort) {
      subStrings.sort();
    }

    var arrayStr = String(subStrings).replaceAll(",", ", ");
    dataArray.push(subStrings);
    dataArray.push(arrayStr);
  }

  return dataArray;
}

function calculateLargestNumber(event) {
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
    alert("Sorted: ".concat(numbersStr, "\n") + "Largest: ".concat(getLargestNumber.apply(void 0, _toConsumableArray(sortedNumbers)), "\n") + "All numbers positive: ".concat(allNumbersPositive(sortedNumbers)));
    event.target.value = numbersStr;
  }
}

function showLastName(event) {
  var str = event.target.value;
  var dataArray = getCommaSeparatedArrayAndStr(str, false);

  if (dataArray.length != 2) {
    return;
  }

  var unsortedNames = dataArray[0].map(function (name) {
    return titleCase(name);
  });
  var namesStr = String(unsortedNames).replaceAll(",", ", ");

  if (namesStr) {
    alert("Last name entered: ".concat(back(unsortedNames)));
    event.target.value = namesStr;
  }
}

function handleSelectVegetable(event) {
  var selection = event.target.value;
  var elemID = "vegetable-price-displayer";
  var vegetablePriceDisplayer = document.getElementById(elemID);

  if (!vegetablePriceDisplayer) {
    throw new Error("Can't find element with ID '".concat(elemID, "'"));
  }

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
  vegetablePriceDisplayer.innerText = "".concat(formatter.format(price), "/kg");
}