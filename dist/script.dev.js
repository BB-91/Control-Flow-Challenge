"use strict";

function match(key, obj, default_val) {
  var value = obj[key];
  return obj.hasOwnProperty(key) ? value : default_val;
}

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function isPositive(num) {
  if (num == 0) {
    throw new Error("number is zero.");
  } else {
    return num > 0;
  }
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
  } else if (isPositive(value)) {
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

function calculateLargestNumber(event) {
  var str = event.target.value;
  var fStr = str.trim();

  if (str === "") {
    return;
  }

  while (fStr.endsWith(",")) {
    fStr = fStr.slice(0, fStr.length - 1);
  }

  var commaCount = strCount(fStr, ",");

  if (commaCount != 2) {
    alert("Expected 2 commas, got ".concat(commaCount));
    return;
  }

  fStr = fStr.replaceAll(" ", "");
  event.target.value = fStr;
  var subStrings = fStr.split(",");

  if (subStrings.length != 3) {
    alert("Please enter exactly 3 numbers, separated by commas.");
  } else {
    var numArray = subStrings.map(function (n) {
      return Number(n);
    });
    numArray.sort();
    alert("sorted: ".concat(numArray));
    event.target.value = String(numArray).replaceAll(",", ", ");
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