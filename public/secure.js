fetch("/api/secure", {
  method: "GET",
  headers: {
    "auth-token": localStorage.getItem("auth-token"),
  },
});

const bookingForm = document.querySelector("#bookingForm");
const fullName = document.querySelector("#fullName");
const dateInput = document.querySelector("#dateInput");
const textareaInput = document.querySelector("#textareaInput");
const error = document.querySelector("#error");
const errorOwner = document.querySelector("#errorOwner");
const errorPet = document.querySelector("#errorPet");
const pet = document.querySelector("#pet");

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookingDetails = {
    pet: pet.value,
    reason: textareaInput.value,
    fullName: fullName.value,
    time: dateInput.value,
  };
  fetch("/api/booking/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingDetails),
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.error) {
        errorMsg.innerHTML = response.error;
      }

      if (dateInput.value == "" || textareaInput.value == "") {
        error.innerHTML = "Please fill all the fields!";
        setTimeout(() => {
          error.innerHTML = "";
        }, 2000);
        return;
      }

      console.log("Connected to file", data);
    });
});
