//Set user is in which TAB in the menu bar
const indexPage = document.querySelector(".index-page");
const aboutPage = document.querySelector(".about-page");
const contactPage = document.querySelector(".contact-page");

window.addEventListener("DOMContentLoaded", () => {
  indexPage.classList.add("btn-clicked");
  aboutPage.classList.remove("btn-clicked");
  contactPage.classList.remove("btn-clicked");
});

// ===================================
//Set Modal Products
const showDevices = document.querySelectorAll(".show-devices li");
const showDevicePage = document.querySelector(".show-device");
showDevices.forEach((eachDevice) => {
  eachDevice.addEventListener("click", () => {
    showDevicePage.style.display = "flex";
    showDevicePage.children[1].src = eachDevice.children[0].src;
  });
});
showDevicePage.addEventListener("click", () => {
  showDevicePage.style.display = "none";
  showDevicePage.children[1].addEventListener("click", (e) => {
    e.stopPropagation();
  });
});
