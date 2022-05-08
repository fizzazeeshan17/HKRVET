bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookingDetails = {
    pet: pet.value,
    reason: textareaInput.value,
    fullName: fullName.value,
    date: dateInput.value,
    time: timeholder.value,
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
        dataTag.innerHTML = "";
      }
      else if (pet  == null || textareaInput == null || fullName  == null || dateInput  == null || timeholder  == null) 
      { 
        errorMsg.innerHTML = "Please fill all the fields!";


      }

    })
});
