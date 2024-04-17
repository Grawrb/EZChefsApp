let userName=document.getElementById('userName');
let loginBtn=document.getElementById('loginBtn');
let registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click', createRegModal);
loginBtn.addEventListener('click', createLoginModal);

let loginModal= document.createElement('dialog');
document.body.appendChild(loginModal);
let text=document.createElement('h1');
text.textContent=('Working?');
loginModal.appendChild(text);

function createLoginModal()  {
    console.log('Yo');
    loginModal.showModal();

}
let regModal= document.createElement('dialog');
document.body.appendChild(regModal);
let text2=document.createElement('h2');
text2.textContent=('Working');
regModal.appendChild(text2);

function createRegModal() {
    console.log('hey');
    regModal.showModal();
}

    //Create register username form field
    //Create register password form field

    //Create login username form field
    //Create login password form field
//Center modal

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
// let loginBtn = document.getElementById('loginBtn');
// let registerBtn = document.getElementById('registerBtn');

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