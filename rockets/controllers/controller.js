"use strict";
var id_button;
var rockets;
var rocket_list = [];
function createRocket(code, thrusters) {
    rockets = new Rocket(code, thrusters);
}
// get data from form
var rocket_form = document.querySelector('#rocket_form');
rocket_form.onsubmit = function () {
    var code = document.getElementById("rocket_code");
    var thrusters = document.getElementById("nr_thrusters");
    var code_error = document.getElementById("code_error");
    var thrusters_error = document.getElementById("thrusters_error");
    var show_data = document.getElementById("show_data");
    var countErrors = 0;
    countErrors += checkCode(code, code_error);
    countErrors += checkThruster(thrusters, thrusters_error);
    if (countErrors == 0) {
        createRocket(code.value, parseInt(thrusters.value));
        rocket_list[id_button] = rockets;
        console.log(id_button, rockets, rocket_list);
        code.value = "";
        code.classList.remove("is-invalid", "is-valid");
        thrusters.value = "";
        thrusters.classList.remove("is-invalid", "is-valid");
        for (var i = 0; i < rocket_list.length; i++) {
            if (rocket_list[i])
                show_data.innerHTML += "Rocket " + rocket_list[i].code + " has " + rocket_list[i].thrusters + " thrusters." + "<br>";
        }
    }
    return false; // prevent reload
};
function checkCode(code, code_error) {
    var countErrors = 0;
    if (!validateCode(code.value)) {
        code.classList.add("is-invalid");
        code_error.textContent = "Please insert the code";
        countErrors++;
    }
    else if (codeExists(code.value)) {
        code.classList.add("is-invalid");
        code_error.textContent = "This rocket already exists in our system.";
        countErrors++;
    }
    else {
        code.classList.remove("is-invalid");
        code.classList.add("is-valid");
        code_error.textContent = "";
    }
    return countErrors;
}
function checkThruster(thrusters, thrusters_error) {
    var countErrors = 0;
    if (!thrusters.value) {
        thrusters.classList.add("is-invalid");
        thrusters_error.textContent = "Please insert the number of thrusters";
        countErrors++;
    }
    else {
        thrusters.classList.remove("is-invalid");
        thrusters.classList.add("is-valid");
        thrusters_error.textContent = "";
    }
    return countErrors;
}
function validateCode(codenr) {
    var code_format = /^[a-zA-Z0-9]{8}$/;
    if (code_format.test(codenr)) {
        return true;
    }
    else {
        return false;
    }
}
function codeExists(codeex) {
    var i;
    var verifyCode = false;
    for (i = 0; i < rocket_list.length; i++) {
        if (codeex == rocket_list[i].code) {
            verifyCode = true;
        }
    }
    return verifyCode;
}
function createInput() {
    var input_thruster = document.getElementById("input_thruster");
    var thrusters = document.getElementById("nr_thrusters");
    var nr_thru = parseInt(thrusters.value);
    input_thruster.innerHTML = '';
    for (var i = 0; i < nr_thru; i++) {
        var x = document.createElement("INPUT");
        x.setAttribute("id", "thruster" + i);
        x.setAttribute("placeholder", "Insert value of thruster " + (i + 1));
        x.setAttribute("type", "number");
        x.setAttribute("class", "form-control form-control-lg");
        input_thruster.appendChild(x);
    }
}
// modal
var modal_rocket = document.getElementById("modal_rocket");
window.onclick = function (event) {
    if (event.target == modal_rocket) {
        modal_rocket.style.display = "none";
    }
};
function checkButton(id) {
    id_button = parseInt(id.match(/\d+/g)[0]);
    modal_rocket.style.display = "block";
    console.log(id_button);
}
function closeModal() {
    modal_rocket.style.display = "none";
}
