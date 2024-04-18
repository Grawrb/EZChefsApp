let loginBtn = document.getElementById('loginBtn');
let registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click', createRegModal);
loginBtn.addEventListener('click', createLoginModal);

let loginModal = document.createElement('dialog');
document.body.appendChild(loginModal);
let loginModCon = document.createElement('div');
loginModal.appendChild(loginModCon);
let logTitle = document.createElement('h3');
logTitle.textContent = ('Welcome Chefs!');
loginModCon.appendChild(logTitle);
let logDesc = document.createElement('h5');
logDesc.textContent = ('Please enter a username and password');
loginModCon.appendChild(logDesc)
let loginForm = document.createElement('form');
loginModCon.appendChild(loginForm);
let user = document.createElement('input');
user.setAttribute('id', "user-name");
loginModCon.appendChild(user);
let pw = document.createElement('input');
pw.setAttribute('id', 'password');
pw.setAttribute('type', 'password');
loginModCon.appendChild(pw);
let logBtn = document.createElement('button');
logBtn.textContent = ('Login');
loginModCon.appendChild(logBtn);
let cancelBtn = document.createElement('button');
cancelBtn.textContent = ('Cancel');
loginModCon.appendChild(cancelBtn);

function createLoginModal()  {
    console.log('Yo');
    loginModal.showModal();
}

let regModal = document.createElement('dialog');
document.body.appendChild(regModal);
let regModCon = document.createElement('div');
regModal.appendChild(regModCon);
let regTitle = document.createElement('h3');
regTitle.textContent = ('Ready to get cooking?');
regModCon.appendChild(regTitle);
let regDesc = document.createElement('h5');
regDesc.textContent = ('Pick a username and password');
regModCon.appendChild(regDesc);
let registerForm = document.createElement('form');
regModCon.appendChild(registerForm);
let userName = document.createElement('input');
userName.setAttribute('id', 'newUser');
regModCon.appendChild(userName);
let password = document.createElement('input');
password.setAttribute('id', 'newPassword');
password.setAttribute('type', 'password');
regModCon.appendChild(password);
let regBtn = document.createElement('button');
regBtn.textContent = ('Register');
regModCon.appendChild(regBtn);
let regCancel = document.createElement('button');
regCancel.textContent = ('Cancel');
regModCon.appendChild(regCancel);



function createRegModal() {
    console.log('hey');
    regModal.showModal();
}
    //Store registration credentials in local storage


//Pass form fields to localstorage
// function store(){
//     var name = document.getElementById('name');
//     var pw = document.getElementById('pw');

//     if (name.value.length == 0 && pw.value.length == 0){
//         alert('Please fill in email and password');
    
//     } else if(name.value.length == 0){
//         alert('Please fill in email');
    
//     }else if(pw.value.length == 0){
//         alert('Please fill in password');
    
//     }else{
//         localStorage.setItem('name', name.value);
//         localStorage.setItem('pw', pw.value);
//         alert('Your account has been created');
//     }
//     }
// //Create function to check login for previous signup 
// function check(){
//     var storedName = localStorage.getItem('name');
//     var storedPw = localStorage.getItem('pw');
    
//     var userName = document.getElementById('userName');
//     var userPw = document.getElementById('userPw');
//     var userRemember = document.getElementById("rememberMe");
    
//     if(userName.value == storedName && userPw.value == storedPw){
//         alert('Welcome back chef!');
//     }else{
//         alert('Please Register');
//     }
//     }

// let userName = document.getElementById('userName');
// let password = document.getElementById('password');
// registerBtn.addEventListener('click', function (event) {
//     event.preventDefault();
//     if (!userName.value || !password.value) {
//         alert("Please pick a username AND password");
//         return;
//     }
//     const userCred = {
//         userName : userName.value,
//         password : password.value,
//     };

//     localStorage.setItem('username', userName.value);
//     localStorage.setItem('password', password.value);
//     alert("Welcome chef! Let's get cooking");
// });

// loginBtn.addEventListener('click', function (event) {
//     event.preventDefault();

// })