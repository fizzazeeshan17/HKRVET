bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookingDetails = {
    pet: pet.value,
    reason: textareaInput.value,
    fullName: fullName.value,
    date: dateInput.value,
    time: timeList.value,
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
        setTimeout(() => {
          errorMsg.innerHTML = "";
        }, 5000);
      } else {
        dataTag.innerHTML =
          "🗓️" +
          "Booking is confirmed for: \n" +
          " \n ->Name: \n" +
          fullName.value +
          "  ->Pet: \n" +
          pet.value +
          "   ->Date: \n" +
          dateInput.value +
          "   ->Time: \n" +
          timeList.value +
          "   ->Reason: \n" +
          textareaInput.value;
      }
    });
});
