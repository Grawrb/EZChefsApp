let loginBtn = document.getElementById('loginBtn');
let registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click', createRegModal);
loginBtn.addEventListener('click', createLoginModal);

//Builds out Login modal in DOM
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
user.setAttribute('placeholder', 'Username');
loginModCon.appendChild(user);
let pw = document.createElement('input');
pw.setAttribute('id', 'password');
pw.setAttribute('type', 'password');
pw.setAttribute('placeholder', 'Password');
loginModCon.appendChild(pw);
let logBtn = document.createElement('button');
logBtn.textContent = ('Login');
loginModCon.appendChild(logBtn);
let cancelBtn = document.createElement('button');
cancelBtn.textContent = ('Cancel');
loginModCon.appendChild(cancelBtn);

//Function to render login modal
function createLoginModal()  {
    loginModal.showModal();
}

//Builds out Register modal in DOM
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
userName.setAttribute('placeholder', 'Username');
regModCon.appendChild(userName);
let password = document.createElement('input');
password.setAttribute('id', 'newPassword');
password.setAttribute('type', 'password');
password.setAttribute('placeholder', 'Password');
regModCon.appendChild(password);
let regBtn = document.createElement('button');
regBtn.textContent = ('Register');
regModCon.appendChild(regBtn);
let regCancel = document.createElement('button');
regCancel.textContent = ('Cancel');
regModCon.appendChild(regCancel);


//Function to render register modal
function createRegModal() {
    regModal.showModal();
}

//Pass form fields to localstorage
function store(){

    if (userName.value.length == 0 && password.value.length == 0){
        alert('Please fill in username and password');
    
    } else if(userName.value.length == 0){
        alert('Please fill in username');
    
    }else if(password.value.length == 0){
        alert('Please fill in password');
    
    }else{
        localStorage.setItem('name', userName.value);
        localStorage.setItem('pw', password.value);
        alert('Your account has been created');
        regModal.close();
        userName.value = "";
        password.value = "";
    }
};

//Store username and password in local storage then closes modal
    regBtn.addEventListener('click', store);
    regCancel.addEventListener('click', function() {
        regModal.close();
    });

//Create function to check login for previous signup 
function check(){
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('pw');
    
 
    if(user.value == storedName && pw.value == storedPw){
        alert('Welcome back chef!');
        loginModal.close();
        user.value = "";
        pw.value = "";
    }else{
        alert('Please Register');
    }
};

//Checks for username and password in local storage then closes modal
logBtn.addEventListener('click', check);
cancelBtn.addEventListener('click', function() {
    loginModal.close();
});
