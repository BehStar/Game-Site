//Show Login-Registery FORM========================
const userIcon = document.querySelector(".fa-user");
const userPage = document.querySelector(".user-page");
const boxForm = document.querySelector(".box-form");
userIcon.addEventListener("click", () => {
  userPage.style.display = "flex";
});
userPage.addEventListener("click", () => {
  userPage.style.display = "none";
});
boxForm.addEventListener("click", (e) => {
  e.stopPropagation();
});

// FORM ===============================
const btn = document.querySelector(".btn");
const registeryForm = document.querySelector(".registery-form");
const registerBtn = document.querySelector(".register-btn");
const loginForm = document.querySelector(".login-form");
const loginBtn = document.querySelector(".login-btn");
const selectKindBtn = document.querySelectorAll(".select-kind");
registerBtn.addEventListener("click", () => {
  selectKindBtn.forEach((eachBtn) => {
    eachBtn.classList.remove("selected-btn");
  });
  registerBtn.classList.add("selected-btn");
  btn.style.left = "50%";
  registeryForm.style.left = "0%";
  loginForm.style.left = "-100%";
});

loginBtn.addEventListener("click", () => {
  selectKindBtn.forEach((eachBtn) => {
    eachBtn.classList.remove("selected-btn");
  });
  loginBtn.classList.add("selected-btn");
  btn.style.left = "0%";
  loginForm.style.left = "0%";
  registeryForm.style.left = "100%";
});
// =============================================================
// Register declarations****************
const inpNameRegister = document.querySelector(".inp-name-reg");
const inpEmailRegister = document.querySelector(".inp-email-reg");
const inpPassRegister = document.querySelector(".inp-pass-reg");
const inpAgreeCondition = document.querySelector("#agree-condition");
console.log(inpAgreeCondition.parentElement);
let localUser;
if (localStorage.getItem("USERS")) {
  localUser = JSON.parse(localStorage.getItem("USERS"));
} else {
  localUser = [];
}
//Login declarations*****************

const inpNameLogin = document.querySelector(".inp-name-log");
const inpPassLogin = document.querySelector(".inp-pass-log");
const userExist = document.querySelector(".user-exist");
const remPassBtn = document.querySelector("#rem-pass");
let remUser;
// =========================REGISTER SUBMIT=========================
registeryForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Save user information in the database (local storage) and check it for not repeative data
  if (
    inpNameRegister.value === "" ||
    inpEmailRegister.value === "" ||
    inpPassRegister.value === ""
  ) {
    window.alert("Fill the ALL fields");
  } else if (inpAgreeCondition.checked == false) {
    alert("please check the  conditionals Site");
  } else {
    const user = {
      id: localUser.length + 1,
      nameUser: inpNameRegister.value.trim(),
      emailUser: inpEmailRegister.value.trim(),
      passUser: inpPassRegister.value.trim(),
    };

    let isRepeatName = localUser.some((eachUserName) => {
      return eachUserName.nameUser === user.nameUser;
    });
    let isRepeatEmail = localUser.some((eachUserEmail) => {
      return eachUserEmail.emailUser === user.emailUser;
    });
    if (isRepeatName || isRepeatEmail) {
      window.alert("email or username already use");
    } else {
      localUser = [...localUser, user];
      localStorage.setItem("USERS", JSON.stringify(localUser));
      window.alert("register successfully");
      inpNameLogin.value = inpNameRegister.value.trim();
      inpPassLogin.value = inpPassRegister.value.trim();
      inpNameRegister.value = "";
      inpEmailRegister.value = "";
      inpPassRegister.value = "";
    }
  }
});

// ================================LOGIN SUBMIT==============================

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let whichUserLogin;
  let isUserLogin;

  //Checked user exist in the database (local storage) and show username in the header (Account field)

  isUserLogin = localUser.some(
    (eachUser) =>
      eachUser.nameUser === inpNameLogin.value &&
      eachUser.passUser === inpPassLogin.value
  );
  if (isUserLogin) {
    whichUserLogin = localUser.find(
      (eachUser) =>
        eachUser.nameUser === inpNameLogin.value &&
        eachUser.passUser === inpPassLogin.value
    );
    localStorage.setItem("USERLOGIN", JSON.stringify(whichUserLogin));
    localStorage.setItem("ISUSERLOGIN", isUserLogin);
  }
  if (isUserLogin) {
    userIcon.style.display = "none";
    userExist.style.display = "flex";
    userExist.textContent = whichUserLogin.nameUser;
    userPage.style.display = "none";
    window.alert(`dear ${inpNameLogin.value.trim()} welcome`);
  } else {
    window.alert("username or password incorrect");
  }
  //Save (USER and PASS) INPUTS in the localStorage For REMEMBER USER (CheckBox)
  remUser = {
    isRem: true,
    nameUser: inpNameLogin.value.trim(),
    passUser: inpPassLogin.value.trim(),
  };
  localStorage.setItem("REM_USER", JSON.stringify(remUser));
  if (remPassBtn.checked) {
    const remUser = JSON.parse(localStorage.getItem("REM_USER"));
    inpNameLogin.value = remUser.nameUser;
    inpPassLogin.value = remUser.passUser;
  } else {
    remUser.isRem = false;
    localStorage.setItem("REM_USER", JSON.stringify(remUser));
    inpNameLogin.value = "";
    inpPassLogin.value = "";
  }
  //set user who is login in the input name field in the CONTACT-US PAGE
  console.log(isUserLogin);
  if (isUserLogin) {
    const whichUserLogin = JSON.parse(localStorage.getItem("USERLOGIN"));
    nameInp.value = whichUserLogin.nameUser;
    nameInp.disabled = true;
  } else {
    nameInp.setAttribute("placeholder", "you need to login");
  }
  jobInp.focus();
});

// =======================DOMCONTENTLOADED===========================

window.addEventListener("DOMContentLoaded", () => {
  //Get USER and PASS (for REMEMBER USER) from the localStorage and set them to the inputs for other pages
  const remUser = JSON.parse(localStorage.getItem("REM_USER"));
  if (remUser.isRem) {
    inpNameLogin.value = remUser.nameUser;
    inpPassLogin.value = remUser.passUser;
    remPassBtn.checked = true;
  }
  //Checked User is Login and which user is login for other pages (we have no single page app)
  const isUserLogin = localStorage.getItem("ISUSERLOGIN");
  const whichUserLogin = JSON.parse(localStorage.getItem("USERLOGIN"));
  if (isUserLogin) {
    userIcon.style.display = "none";
    userExist.style.display = "flex";
    userExist.textContent = whichUserLogin.nameUser;
  } else {
    userIcon.style.display = "flex";
    userExist.style.display = "none";
  }
});

// =======================EXIT ACCOUNTS=======================

//USER EXIT THE ACCOUNT
userExist.addEventListener("click", () => {
  const isSureExit = window.confirm("Are you sure you want to Exist>?");
  if (isSureExit) {
    localStorage.setItem("USERLOGIN", []);
    localStorage.setItem("ISUSERLOGIN", JSON.stringify(false));
    userIcon.style.display = "flex";
    userExist.style.display = "none";
    nameInp.value = "";
    nameInp.setAttribute("placeholder", "need to be login");
    nameInp.disabled = false;
  }
});
