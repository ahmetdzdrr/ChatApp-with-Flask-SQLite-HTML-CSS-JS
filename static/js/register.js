function checkPasswordLength(inputId, checkmarkId) {
    var input = document.getElementById(inputId);
    var checkmark = document.getElementById(checkmarkId);


    if (input.type === 'password') {
        if (input.value.length >= 8) {
            checkmark.innerHTML = '<img class="check-cross" src="static/icons/show.png" alt="Hide"><ion-icon name="checkmark"></ion-icon>';
        } else if (input.value.length > 0) {
            checkmark.innerHTML = '<img class="check-cross" src="static/icons/show.png" alt="Hide"><ion-icon name="close"></ion-icon>';
        } else {
            checkmark.innerHTML = '';
        }
    } else if (input.type === 'text') {
        if (input.value.length >= 8) {
            checkmark.innerHTML = '<img class="check-cross" src="static/icons/hide.png" alt="Hide"><ion-icon name="checkmark"></ion-icon>';
        } else if (input.value.length > 0) {
            checkmark.innerHTML = '<img class="check-cross" src="static/icons/hide.png" alt="Hide"><ion-icon name="close"></ion-icon>';
        } else {
            checkmark.innerHTML = '';
        }
    }

    var imgElement = checkmark.querySelector("img.check-cross");
    imgElement.addEventListener("click", function () {
        if (input.type === 'password') {
            input.type = 'text';
            imgElement.src = '/static/icons/hide.png';
        } else if (input.type === 'text') {
            input.type = 'password';
            imgElement.src = '/static/icons/show.png';
        }
    });
}


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







