function registerForm() {
    //get the values inserted by the user in form
    var inputEmail = document.forms["register_form"]["inputEmail"];
    var inputPassword = document.forms["register_form"]["inputPassword"];
    var confirmPassword = document.forms["register_form"]["confirmPassword"];
    var inputAddress = document.forms["register_form"]["inputAddress"];
    var inputCity = document.forms["register_form"]["inputCity"];
    var inputDistrict = document.forms["register_form"]["inputDistrict"];
    var inputZip = document.forms["register_form"]["inputZip"];
    var gridCheck = document.forms["register_form"]["gridCheck"];
    //set errors
    var email_error = document.getElementById("email_error");
    var password_error = document.getElementById("password_error");
    var confirmPass_error = document.getElementById("confirmPass_error");
    var address_error = document.getElementById("address_error");
    var city_error = document.getElementById("city_error");
    var district_error = document.getElementById("district_error");
    var zip_error = document.getElementById("zip_error");
    var grid_error = document.getElementById("grid_error");
    var countErrors = 0;
    //verify if the user inserted data in the form - if not => error
    if (inputEmail.value == ""){
        inputEmail.classList.add("is-invalid");
        email_error.textContent = "Please insert your email address";
        countErrors++;
    } else if (validateEmail() == false){
        inputEmail.classList.add("is-invalid");
        email_error.textContent = "Please insert your email address";
        countErrors++;
    } else {
        inputEmail.classList.add("is-valid");
        email_error.textContent = "";
    }

    if (inputPassword.value == ""){
        inputPassword.classList.add("is-invalid");
        password_error.textContent = "Please insert your password";
        countErrors++;
    } else if (validatePassword() == false){
        inputPassword.classList.add("is-invalid");
        document.getElementById('inputPassword').value = "";
        password_error.textContent = "Password must have at least 8 characters and maximum 20 " + 
        "and contain at least one uppercase letter, one lowercase letter, one digit and one special character.";
        countErrors++;
    } else {
        inputPassword.classList.add("is-valid");
        password_error.textContent = "";
    }

    if (confirmPassword.value == ""){
        confirmPassword.classList.add("is-invalid");
        confirmPass_error.textContent = "Please confirm your password";
        countErrors++;
    } else if (inputPassword.value != confirmPassword.value || validatePassword() == false){
        document.getElementById('inputPassword').value = "";
        document.getElementById('confirmPassword').value = "";
        inputPassword.classList.add("is-invalid");
        confirmPassword.classList.add("is-invalid");
        password_error.textContent = "Password must have at least 8 characters and maximum 20 " + 
        "and contain at least one uppercase letter, one lowercase letter, one digit and one special character.";
        confirmPass_error.textContent = "Please confirm your correct password";
        countErrors++;
    }else{
        confirmPassword.classList.add("is-valid");
        confirmPass_error.textContent = "";
    }

    if (inputAddress.value == ""){
        inputAddress.classList.add("is-invalid");
        address_error.textContent = "Please insert your address";
        countErrors++;
    } else {
        inputAddress.classList.add("is-valid");
        address_error.textContent = "";
    }

    if (inputCity.value == ""){
        inputCity.classList.add("is-invalid");
        city_error.textContent = "Please select your city";
        countErrors++;
    } else {
        inputCity.classList.add("is-valid");
        city_error.textContent = "";
    }
    
    if (inputDistrict.value == ""){
        inputDistrict.classList.add("is-invalid");
        district_error.textContent = "Please insert your district";
        countErrors++;
    } else {
        inputDistrict.classList.add("is-valid");
        district_error.textContent = "";
    }

    if (inputZip.value == ""){
        inputZip.classList.add("is-invalid");
        zip_error.textContent = "Please insert your postal code";
        countErrors++;
    } else if (validateZip() == false){
        inputZip.classList.add("is-invalid");
        zip_error.textContent = "Please insert your correct postal code";
        countErrors++;
    } else {
        inputZip.classList.add("is-valid");
        zip_error.textContent = "";
    }

    if (gridCheck.checked == false){
        gridCheck.classList.add("is-invalid");
        grid_error.textContent = "Please check this checkbox";
        countErrors++;
    } else {
        gridCheck.classList.add("is-valid");
        grid_error.textContent = "";
    }

    if (countErrors > 0){
        return false;
    } else {
        return true;
    }
}
// validation functions
function validateEmail(email) {
    var mailformat = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9])+$/;
        if (mailformat.test(inputEmail.value)) {
            return true;
        } else {
            return false;
        }
}
function validatePassword(psw){
    var passwordformat = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,20}$/;
        if(passwordformat.test(inputPassword.value)) {
            return true;
        } else {
            return false;
        }
}

function validateZip(code) {
    var zipformat = /^[0-9]{5}$/;
        if (zipformat.test(inputZip.value)) {
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

document.getElementById("confirmPassword").addEventListener("input", confirmpFunction);
function confirmpFunction() {
    document.getElementById("confirmPassword").classList.remove("is-invalid", "is-valid");
}

document.getElementById("inputAddress").addEventListener("input", addressFunction);
function addressFunction() {
    document.getElementById("inputAddress").classList.remove("is-invalid", "is-valid");
}

document.getElementById("inputCity").addEventListener("input", cityFunction);
function cityFunction() {
    document.getElementById("inputCity").classList.remove("is-invalid", "is-valid");
}

document.getElementById("inputDistrict").addEventListener("input", districtFunction);
function districtFunction() {
    document.getElementById("inputDistrict").classList.remove("is-invalid", "is-valid");
}

document.getElementById("inputZip").addEventListener("input", zipFunction);
function zipFunction() {
    document.getElementById("inputZip").classList.remove("is-invalid", "is-valid");
}

document.getElementById("gridCheck").addEventListener("input", gridFunction);
function gridFunction() {
    document.getElementById("gridCheck").classList.remove("is-invalid", "is-valid");
}
