fetch('/api/secure', {
    method: 'GET',
    headers: {
        'auth-token': localStorage.getItem('auth-token')
    }

    
});


const bookingForm = document.querySelector("#bookingForm")
const dateInput = document.querySelector("#dateInput")
const textareaInput = document.querySelector("#textareaInput")
const error = document.querySelector("#error")
const errorOwner = document.querySelector("#errorOwner")
const errorPet = document.querySelector("#errorPet")
const pet = document.querySelector('#pet')
// const owner = document.querySelector('#name')
    
bookingForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const bookingDetails = {
        pet: pet.value,
        reason: textareaInput.value,
        time: dateInput.value
    }
    fetch('/api/booking/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingDetails)
    })
    .then(res => res.json())
    .then(response => {
        if(response.error){
            errorMsg.innerHTML = response.error;
        }

    if (dateInput.value=="" || textareaInput.value=="" ){
       error.innerHTML = "you have entered some values empty"
    } else if (pet.value === ""){
        errorPet.innerHTML = "You did not enter pet name"
    } else {
        alert('Your booking has been confirmed, please wait for a reply.')
    }
    // else if (owner.value === ""){
    //     errorOwner.innerHTML = "You did not enter owner name"
    //     return;
    // }

//     let data = {
//         dateValue : dateInput.value ,
//         textareaValue : textareaInput.value
//     }
    

    
// console.log('I am connected to the html file, here is your data', data )
   
})
})
