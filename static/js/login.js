var passwordInput = document.getElementById("password");
var showPasswordButton = document.getElementById("showPassword");

showPasswordButton.addEventListener("click", function() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showPasswordButton.innerHTML = '<img src="static/icons/hide.png" alt="Hide">';
    } else {
        passwordInput.type = "password";
        showPasswordButton.innerHTML = '<img src="static/icons/show.png" alt="Show">';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");
    
    loginButton.addEventListener("click", function () {
        window.location.href = '/login';
    });

    const registerButton = document.getElementById("register-button");
    
    registerButton.addEventListener("click", function () {
        window.location.href = 'register';
    });
});




    