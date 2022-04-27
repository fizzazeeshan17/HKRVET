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


bookingForm.addEventListener("submit", (e)=>{
    e.preventDefault();


    if (dateInput.value=="" || textareaInput.value=="" ){
       error.innerHTML = "you have entered some values empty"
       setTimeout(()=>{error.innerHTML=""}, 2000)
       return
    }

    let data = {
        dateValue : dateInput.value ,
        textareaValue : textareaInput.value
    }
    

    
console.log('I am connected to the html file, here is your data', data )
   
})

