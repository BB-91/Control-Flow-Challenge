"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PopupParent =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(PopupParent, _HTMLElement);

  function PopupParent() {
    _classCallCheck(this, PopupParent);

    return _possibleConstructorReturn(this, _getPrototypeOf(PopupParent).call(this));
  }

  return PopupParent;
}(_wrapNativeSuper(HTMLElement));

customElements.define('popup-parent', PopupParent);

function getElem(elementID_OR_element) {
  var element = null;

  if (elementID_OR_element instanceof Element) {
    element = elementID_OR_element;

    if (!element) {
      throw new Error("Object is instanceof Element, but is null");
    }
  } else {
    var elementID = elementID_OR_element;
    element = document.getElementById(elementID);

    if (!element) {
      throw new Error("Can't find element with ID '".concat(elementID, "'"));
    }
  }

  return element;
}

function setElemInnerText(elementID_OR_element, newInnerText) {
  getElem(elementID_OR_element).innerText = newInnerText;
}

function getChildPopupDiv(parentElement_OR_parentElementID) {
  var parent = getElem(parentElement_OR_parentElementID);
  var childPopupDiv = null;
  var children = Array.from(parent.children);
  children.forEach(function (child) {
    if (child.classList.contains("popup-div")) {
      if (childPopupDiv) {
        throw new Error("More than one child with class popup-div found under parent\n:".concat(parent));
      }

      childPopupDiv = child;
    }
  });

  if (!childPopupDiv) {
    throw new Error("Can't find child with class 'popup-div' under parent with id: '".concat(parent.id, "'\n").concat(parent));
  }

  return childPopupDiv;
}

function setChildPopupDivInnerText(parentElement_OR_parentElementID, newInnerText) {
  setElemInnerText(getChildPopupDiv(parentElement_OR_parentElementID), newInnerText);
}

function match(key, obj, default_val) {
  var value = obj[key];
  return obj.hasOwnProperty(key) ? value : default_val;
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

  return isNumberPositive(Math.min.apply(Math, _toConsumableArray(numbers)));
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

function isPosOrNeg(event) {
  var value = event.target.value;

  if (value === "") {
    return;
  }

  if (isNaN(value)) {
    alert("'".concat(value, "' is not a number."));
  } else if (isNumberPositive(value)) {
    if (value == 0) {
      value = Math.abs(0);
      event.target.value = value;
    }

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
    setChildPopupDivInnerText("group-day", msg);
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
    return dataArray;
  }

  while (fStr.endsWith(",")) {
    fStr = fStr.slice(0, fStr.length - 1);
  }

  var commaCount = strCount(fStr, ",");

  if (commaCount != requiredCommaCount) {
    alert("Expected ".concat(requiredCommaCount, " commas, got ").concat(commaCount));
    return dataArray;
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
  setTimeout(function () {
    var popupParents = Array.from(document.getElementsByTagName("popup-parent"));
    popupParents.forEach(function (parent) {
      var newChild = document.createElement("div");
      newChild.classList.add("popup-div");
      newChild.style.color = "red";
      parent.appendChild(newChild);
      setChildPopupDivInnerText(parent, "hello!");
    });
    setTimeout(function () {
      var testPopupParent = Array.from(document.getElementsByTagName("popup-parent"))[0];
      setChildPopupDivInnerText(testPopupParent, "excellent!");
    }, 1000);
  }, 1000);
};