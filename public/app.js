var signupForm = document.querySelector("#sign-up-form");
var loginForm = document.querySelector("#login-form");

var signupPhone = document.querySelector("#sign-up-phone");
var signupEmail = document.querySelector("#sign-up-email");
var signupPassword = document.querySelector("#sign-up-password");

var loginEmail = document.querySelector("#email");
var loginPassword = document.querySelector("#password");

// error handling
var errMsg = document.querySelector("#error");
var errorMsg = document.querySelector("#errorMsg");

// sign up form
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const signUpDetails = {
    phone: signupPhone.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };

  console.log(signupForm);
  fetch("/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpDetails),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.error) {
        errMsg.innerHTML = response.error;
      } else {
        errMsg.innerHTML = "";
        localStorage.setItem("auth_token", response.token);
        location.href = response.redirect;
      }
    });
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const loginDetails = {
    email: loginEmail.value,
    password: loginPassword.value,
  };

  fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginDetails),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.error) {
        errorMsg.innerHTML = response.error;
      } else if (
        loginDetails.email === "musa@HKRVET.com" ||
        loginDetails.email === "fizza@HKRVET.com" ||
        loginDetails.email === "saiid@HKRVET.com" ||
        loginDetails.email === "muaz@HKRVET.com" ||
        loginDetails.email === "ewnetu@HKRVET.com" ||
        (loginDetails.email === "max@HKRVET.com" &&
          loginDetails.password === "abc123")
      ) {
        errorMsg.innerHTML = "";
        localStorage.setItem("auth_token", response.token);
        location.href = "vet.html";
      } else if (
        loginDetails.email === "admin@HKRVET.com" &&
        loginDetails.password === "admin1"
      ) {
        errorMsg.innerHTML = "";
        localStorage.setItem("auth_token", response.token);
        location.href = "admin.html";
      } else {
        errorMsg.innerHTML = "";
        localStorage.setItem("auth_token", response.token);
        location.href = response.redirect;
      }
    });
});
