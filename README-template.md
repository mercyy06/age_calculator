# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![alt text](<Screenshot 2026-01-03 131544-1.png>)
![alt text](<Screenshot 2026-01-03 233238.png>)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- Vanilla JavaScript
- Tailwind CSS
- Mobile-first workflow

### What I learned

This project looked simple on the surface, but it taught me that handling dates in JavaScript requires careful logic. My biggest takeaway was moving away from simple subtraction (`Year - Year`) and implementing a robust "borrowing" algorithm to handle exact age down to the day.

**1. The "Subtraction with Borrowing" Algorithm**
I learned that you cannot simply subtract days if the current day is smaller than the birth day (resulting in negative numbers). I had to "borrow" a month and calculate the exact number of days in the _previous_ month to get the math right.

I used `new Date(y, m, 0).getDate()` to automatically handle leap years and varying month lengths:

```js
// Adjusting for negative days by borrowing from the previous month
if (d1 >= d2) {
  daysOutput.textContent = d3;
} else {
  m3--;
  const days = new Date(y1, m1, 0).getDate();
  daysOutput.textContent = d3 + days;
}
```

**2. The JavaScript "Month Index" Trap**
I ran into a validation bug where my code thought January (1) was in the future compared to the system date. This reinforced that JavaScript counts months from 0 (January) to 11 (December), while my inputs were 1-12.

```js
// I had to ensure I added +1 to the system month for accurate comparison
if (m > currentDate.getMonth() + 1) {
  showError(monthInput, "Must be in the past");
}
```

### Continued development

**1. Advanced Tailwind Layouts**
While I am comfortable with basic responsiveness, I want to get better at handling complex layout shifts between mobile and desktop. Specifically, positioning elements that break out of the standard grid (like the floating arrow button in this project) was a challenge I want to master.

**2. JavaScript Animations**
Currently, the results display instantly. In future projects, I want to learn how to create "counting up" animations for numerical results to make the UI feel more dynamic and polished.

**3. Date Libraries**
I intentionally wrote the logic from scratch to understand the underlying math. However, for larger production apps, I plan to explore libraries like `date-fns` or `Day.js` to see how they handle edge cases like time zones and localization more efficiently.

### Useful resources

- [MDN Web Docs - Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) - This was essential for understanding the JavaScript `Date` object and finding the `new Date(y, m, 0)` trick to handle days in a month.
- [Tailwind CSS Docs - Adding Custom Styles](https://tailwindcss.com/docs/adding-custom-styles) - This helped me understand how to use `@layer base` to override browser defaults and remove the input spinners.

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/mercyy06)
- Twitter - [@yourusername](https://www.twitter.com/just_mercyy)


## Acknowledgments

A big thank you to [Frontend Mentor](https://www.frontendmentor.io) for providing this challenge. It was a fantastic opportunity to move beyond simple tutorials and tackle real-world logic problems. The detailed design files helped me practice matching a specific UI, which is a crucial skill for any developer.
