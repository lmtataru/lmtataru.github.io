function loginForm() {
    var inputEmail = document.forms["login_form"]["inputEmail"];
    var inputPassword = document.forms["login_form"]["inputPassword"];

    var email_error = document.getElementById("email_error");
    var password_error = document.getElementById("password_error");
    var countErrors = 0;

    if (inputEmail.value == "") {
        document.getElementById('inputPassword').value = "";
        inputEmail.classList.add("is-invalid");
        email_error.textContent = "Email address is required";
        countErrors++;
    } else if (validateEmail() == false) {
        document.getElementById('inputPassword').value = "";
        inputEmail.classList.add("is-invalid");
        email_error.textContent = "Email address is invalid";
        countErrors++;
    } else {
        inputEmail.classList.add("is-valid");
        email_error.textContent = "";
        if (inputPassword.value == "") {
            inputPassword.classList.add("is-invalid");
            password_error.textContent = "Please insert your password";
            countErrors++;
        } else if (validateEmail() == false) {
            inputPassword.classList.add("is-invalid");
            document.getElementById('inputPassword').value = "";
            password_error.textContent = "Please insert your password";
            countErrors++;
        } else {
            inputPassword.classList.add("is-valid");
            password_error.textContent = "";
        }
    }

    if (countErrors > 0){
        return false;
    } else {
        return true;
    }
}

function validateEmail(email) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (mailformat.test(inputEmail.value)) {
            return true;
        } else {
            return false;
        }
}

// remove classes is invalid and valid when the user starts to complete/insert another data in the form
document.getElementById("inputEmail").addEventListener("input", emailFunction);
function emailFunction() {
    document.getElementById("inputEmail").classList.remove("is-invalid", "is-valid");
}

document.getElementById("inputPassword").addEventListener("input", passwordFunction);
function passwordFunction() {
    document.getElementById("inputPassword").classList.remove("is-invalid", "is-valid");
}
