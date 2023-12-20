document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");
    
    loginButton.addEventListener("click", function () {
        window.location.href = '/login';
    });

    const registerButton = document.getElementById("register-button");
    
    registerButton.addEventListener("click", function () {
        window.location.href = '/register';
    });
});
