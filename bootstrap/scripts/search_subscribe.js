function issearchValid() {
    var search_book = document.getElementById("search_book").value;
    var result = false;
    if ((search_book == "") || (search_book.length < 3)) {
        console.log("empty");
        result = false;
    } else {
        console.log(search_book);
        result = true;
    }
    return result;
}

function subscribeForm() {
   var inputName = document.forms["subscribe"]["inputName"];
   var inputEmail = document.forms["subscribe"]["inputEmail"];

   var name_error = document.getElementById("name_error");
   var email_error = document.getElementById("email_error");
   var countErrors = 0;

    if ((inputName.value == "") || (inputName.value.length < 3)) {
        inputName.classList.remove("is-valid");
        inputName.classList.add("is-invalid");
        name_error.textContent = "Please insert your name";
        countErrors++;
    } else {
        inputName.classList.remove("is-invalid");
        inputName.classList.add("is-valid");
        name_error.textContent = "";
    }
    if ((inputEmail.value == "") || (validateEmail() == false)) {
        inputEmail.classList.remove("is-valid");
        inputEmail.classList.add("is-invalid");
        email_error.textContent = "Please insert your email address";
        countErrors++;
    } else {
        inputEmail.classList.remove("is-invalid");
        inputEmail.classList.add("is-valid");
        email_error.textContent = "";
    }

    if (countErrors > 0){
        return false;
    } else {
        return true;
    }
}

function validateEmail() {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (mailformat.test(inputEmail.value)) {
            return true;
        } else {
            return false;
        }
}

function messageValidate() {
    if (subscribeForm() == true) {
        console.log("Valid");
    } else {
        console.log("Invalid");
    }
}

// remove classes is invalid and valid when the user starts to complete/insert another data in the form
document.getElementById("inputName").addEventListener("input", nameFunction);
function nameFunction() {
    document.getElementById("inputName").classList.remove("is-invalid", "is-valid");
}

document.getElementById("inputEmail").addEventListener("input", emailFunction);
function emailFunction() {
    document.getElementById("inputEmail").classList.remove("is-invalid", "is-valid");
}