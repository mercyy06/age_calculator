"use strict";

const dayInput = document.getElementById("numberInput");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");

const yearOutput = document.getElementById("yearOutput");
const monthOutput = document.getElementById("monthOutput");
const daysOutput = document.getElementById("daysOutput");
const imgButton = document.getElementById("imgButton");

//SHOWING THE ERRORS
const showError = (input, message) => {
  const parent = input.parentElement;
  const label = parent.querySelector("label");
  const errorText = parent.querySelector("small");

  input.classList.remove("inputs");
  input.classList.add(
    "border-[#ff5757ff]",
    "focus:outline-none",
    "focus:border-[#ff5757ff]",
    "focus:ring-[#ff5757ff]"
  );

  label.classList.remove("labels");
  label.classList.add("text-[#ff5757ff]");

  errorText.innerText = message;
  errorText.classList.remove("hidden");
};

// RESETING THE ERRORS
const resetError = (input) => {
  const parent = input.parentElement;
  const label = parent.querySelector("label");
  const errorText = parent.querySelector("small");

  input.classList.add("inputs");
  input.classList.remove(
    "border-[#ff5757ff]",
    "focus:outline-none",
    "focus:border-[#ff5757ff]",
    "focus:ring-[#ff5757ff]"
  );

  label.classList.add("labels");
  label.classList.remove("text-[#ff5757ff]");

  errorText.classList.add("hidden");
  errorText.innerText = "";
};

// CHECK FOR LEAP YEAR
const isLeapYear = (y) => {
  const leapYear = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  return leapYear;
};

// VALIDATION LOGIC
const validateInput = (d, m, y, currentDate) => {
  resetError(dayInput);
  resetError(monthInput);
  resetError(yearInput);

  // EMPTY CHECK
  if (!d) {
    showError(dayInput, "This Field is required");
    return false;
  }
  if (!m) {
    showError(monthInput, "This field is required");
    return false;
  }
  if (!y) {
    showError(yearInput, "This field is required");
    return false;
  }

  // RANGE CHECK
  if (m < 1 || m > 12) {
    showError(monthInput, "Must be a valid month");
    return false;
  }
  if (y > currentDate.getFullYear()) {
    showError(yearInput, "Must be in the past");
    return false;
  }
  if (y === currentDate.getFullYear() && m > currentDate.getMonth() + 1) {
    showError(monthInput, "Must be in the past");
    return false;
  }
  if (
    y === currentDate.getFullYear() &&
    m === currentDate.getMonth() + 1 &&
    d > currentDate.getDate()
  ) {
    showError(dayInput, "Must be in the past");
    return false;
  }

  // DAYS IN EACH MONTHS
  const daysInMonth = [
    31,
    isLeapYear(y) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  if (d < 1 || d > daysInMonth[m - 1]) {
    showError(dayInput, "Must be a valid day");
    return false;
  } else {
    return true;
  }
};

// ARITHMETIC LOGIC
const calcAge = (date1, date2) => {
  let m1 = date1.getMonth() + 1;
  let y1 = date1.getFullYear();
  let d1 = date1.getDate();

  let d2 = date2.getDate();
  let m2 = date2.getMonth();
  let y2 = date2.getFullYear();

  let d3 = d1 - d2;
  let m3 = m1 - m2;
  let y3 = y1 - y2;

  // getting the days
  if (d1 >= d2) {
    daysOutput.textContent = d3;
  } else {
    m3--;
    const days = new Date(y1, m1, 0).getDate();
    daysOutput.textContent = d3 + days;
  }

  // getting the month
  if (m3 < 0) {
    monthOutput.textContent = m3 + 12;
    y3--;
  } else {
    monthOutput.textContent = m3;
  }

  yearOutput.textContent = y3;
};

// BUTTON
imgButton.addEventListener("click", (e) => {
  e.preventDefault();

  const yearValue = +yearInput.value;
  const monthValue = +monthInput.value;
  const dayValue = +dayInput.value;
  if (validateInput(dayValue, monthValue, yearValue, new Date())) {
    calcAge(new Date(), new Date(yearValue, monthValue, dayValue));
  }
});
