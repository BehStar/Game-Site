const formContact = document.querySelector(".form-contact");
const nameInp = document.querySelector("#name-inp");
const jobInp = document.querySelector("#job-inp");
const messageInp = document.querySelector("#message-inp");

let sentMessages = document.querySelector(".sent-messages");
const listMessages = document.querySelectorAll(".sent-messages li");
const removeLi = document.querySelector(".remove-li");
const countMessages = document.querySelector(".count-messages");

let usersSuggestion;

window.addEventListener("DOMContentLoaded", () => {
  //Set user is in which TAB in the menu bar
  const indexPage = document.querySelector(".index-page");
  const aboutPage = document.querySelector(".about-page");
  const contactPage = document.querySelector(".contact-page");
  indexPage.classList.remove("btn-clicked");
  aboutPage.classList.remove("btn-clicked");
  contactPage.classList.add("btn-clicked");

  //User need to login (set it's name in the input name field OR set the text message in the placeholder)

  const isUserLogin = JSON.parse(localStorage.getItem("ISUSERLOGIN"));
  if (isUserLogin) {
    const whichUserLogin = JSON.parse(localStorage.getItem("USERLOGIN"));
    nameInp.value = whichUserLogin.nameUser;
    nameInp.disabled = "false";
  } else {
    nameInp.setAttribute("placeholder", "you need to login");
  }
  jobInp.focus();

  //Get all messages from the database (local storage), & Set them in the all list (down page)

  if (localStorage.getItem("MESSAGES")) {
    usersSuggestion = JSON.parse(localStorage.getItem("MESSAGES"));
  } else {
    usersSuggestion = [];
  }
  countMessages.textContent = usersSuggestion.length;

  usersSuggestion.map((eachMessage) => {
    sentMessages.innerHTML += `
    <li>
      <div class="username-message"><span> ${eachMessage.nameUserSug} </span></div>
      <p class="user-message">
        ${eachMessage.messageUserSug}
      </p>
      <div class="remove-li">X</div>
    </li>
    `;
  });
});

// ============================Form========================

formContact.addEventListener("submit", (e) => {
  e.preventDefault();
  //Get message from user & Set it in the database & Set it in the all list (down page)

  const isUserLogin = JSON.parse(localStorage.getItem("ISUSERLOGIN"));

  if (!isUserLogin) {
    alert("you need to login");
  } else {
    if (nameInp === "" || jobInp.value === "" || messageInp.value === "") {
      alert("Fill the ALL fields PLEASE");
    } else {
      const whichUserLogin = JSON.parse(localStorage.getItem("USERLOGIN"));
      nameInp.value = whichUserLogin.nameUser;
      usersSuggestion = [
        ...usersSuggestion,
        {
          nameUserSug: whichUserLogin.nameUser,
          jobUserSug: jobInp.value,
          messageUserSug: messageInp.value,
        },
      ];
      localStorage.setItem("MESSAGES", JSON.stringify(usersSuggestion));
      // It doesn't work(I don't know why?)
      countMessages.textContent = usersSuggestion.length;
      sentMessages.innerHTML += `
        <li>
        <div class="username-message"><span>: ${nameInp.value} </span></div>
        <p class="user-message">
                ${messageInp.value}
          </p>
          <div class=" remove-li">X</div>
        </li>
      `;
      alert("Your information Saved");
      jobInp.value = "";
      messageInp.value = "";
      jobInp.focus();
    }
  }
});

// ================================Remove Message =============================
sentMessages.addEventListener("click", (e) => {
  const mustRemoveLi = document.querySelector(".user-message");
  if (e.target.classList.contains("remove-li")) {
    e.target.parentElement.remove();
    const findIndRemoveLi = usersSuggestion.findIndex(
      (eachLiMessage) =>
        eachLiMessage.messageUserSug === mustRemoveLi.textContent
    );
    usersSuggestion.splice(findIndRemoveLi, 1);
    localStorage.setItem("MESSAGES", JSON.stringify(usersSuggestion));
    // It doesn't work(I don't know why?)
    countMessages.textContent = usersSuggestion.length;
  }
});
