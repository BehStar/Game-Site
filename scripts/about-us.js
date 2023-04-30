//Set user is in which TAB in the menu bar
const indexPage = document.querySelector(".index-page");
const aboutPage = document.querySelector(".about-page");
const contactPage = document.querySelector(".contact-page");

window.addEventListener("DOMContentLoaded", () => {
  indexPage.classList.remove("btn-clicked");
  aboutPage.classList.add("btn-clicked");
  contactPage.classList.remove("btn-clicked");
});
// --comments---------------------------------------
const boxPerson = document.querySelectorAll(".box-person");
const boxPeople = document.querySelector(".box-people");
const arrowUp = document.querySelector(".fa-arrow-up");
const arrowDown = document.querySelector(".fa-arrow-down");

let heightPersonBox = 0;
const lenBoxPeople = boxPeople.children.length;
const lenHeightBoxPeople = (lenBoxPeople - 1) * 300;

arrowUp.addEventListener("click", () => {
  if (heightPersonBox > lenHeightBoxPeople * -1) {
    heightPersonBox -= 300;
    boxPeople.style.top = `${heightPersonBox}px`;
  }
});
arrowDown.addEventListener("click", () => {
  if (heightPersonBox < 0) {
    heightPersonBox += 300;
    boxPeople.style.top = `${heightPersonBox}px`;
  }
});
// ==========================================================
