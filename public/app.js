var signupForm = document.querySelector('#sign-up-form')
var loginForm = document.querySelector('#login-form')

var signupName = document.querySelector('#sign-up-name');
var signupPhone = document.querySelector('#sign-up-phone');
var signupEmail = document.querySelector('#sign-up-email');
var signupPassword = document.querySelector('#sign-up-password');

var loginEmail = document.querySelector('#email');
var loginPassword = document.querySelector('#password');

// error handling
var errMsg = document.querySelector('#error');
var errorMsg = document.querySelector('#errorMsg')


// sign up form
signupForm.addEventListener('submit', e => {
    e.preventDefault();

    const signUpDetails = {
       
        fullName: signupName.value,
        phone: signupPhone.value,
        email: signupEmail.value,
        password: signupPassword.value
    };

    console.log(signupForm);
    fetch('/api/user/register', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpDetails)
    })
    .then(res => res.json())
    .then(response => {
        if(response.error){
            errMsg.innerHTML = response.error;

        } else if (signUpDetails.email === 'muazkhan99@gmail.com' && signUpDetails.password === 'Awesome1'){
            errMsg.innerHTML = '';
            localStorage.setItem('auth_token', response.token);
            location.href = 'batcave.html';
        } else {
            errMsg.innerHTML = '';
            localStorage.setItem('auth_token', response.token);
            location.href = response.redirect;
        };
      

    });

});



loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const loginDetails = {
        email: loginEmail.value,
        password: loginPassword.value
    };


    fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDetails)
    })
    .then(res => res.json())
    .then(response => {
        if(response.error){
            errorMsg.innerHTML = response.error;
        } else {
            errMsg.innerHTML = '';
            localStorage.setItem('auth_token', response.token);
            location.href = response.redirect;
        };
    });
});