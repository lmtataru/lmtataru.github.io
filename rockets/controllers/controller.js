"use strict";
var id_button;
var rocket;
var rocket_list = [];
function createNewRocket(code, nr_of_thrusters, thrusters) {
    rocket = new Rocket(code, nr_of_thrusters, thrusters);
}
// get data from form
var rocket_form = document.querySelector('#rocket_form');
rocket_form.onsubmit = function () {
    var show_data = document.getElementById("show_data");
    var show_data_temp = "";
    var code = document.getElementById("rocket_code");
    var thrusters = document.getElementById("nr_thrusters");
    var code_error = document.getElementById("code_error");
    var countErrors = 0;
    countErrors += checkCode(code, code_error);
    countErrors += checkNumberInput(thrusters);
    if (parseInt(thrusters.value) > 0) {
        for (var i = 0; i < parseInt(thrusters.value); i++) {
            var thruster_value = document.getElementById("thruster" + i);
            countErrors += checkNumberInput(thruster_value);
        }
    }
    if (countErrors == 0) {
        var thruster_list = [];
        for (var i = 0; i < parseInt(thrusters.value); i++) {
            var thruster_value = document.getElementById("thruster" + i);
            thruster_list.push(new Thruster(0, parseInt(thruster_value.value)));
        }
        createNewRocket(code.value, parseInt(thrusters.value), thruster_list);
        rocket_list[id_button] = rocket;
        code.value = "";
        code.classList.remove("is-invalid", "is-valid");
        thrusters.value = "";
        thrusters.classList.remove("is-invalid", "is-valid");
        modal_rocket.style.display = "none";
        document.getElementById("input_thruster").innerHTML = "";
        show_data_temp += "<div class=\"d-flex justify-content-start mb-4\"><div class=\"msg_cotainer\">Rocket " + code.value + " has been created successfully!";
        show_data.innerHTML += show_data_temp;
        show_data.scrollTo(0, show_data.scrollHeight);
    }
    return false; // prevent reload
};
function checkCode(code, code_error) {
    var countErrors = 0;
    if (!validateCode(code.value)) {
        code.classList.add("is-invalid");
        code_error.textContent = "The code must have 4 letters and 4 digits!";
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
function checkNumberInput(number_input) {
    var countErrors = 0;
    if (number_input.id == "nr_thrusters") {
        if (!number_input.value) {
            number_input.classList.add("is-invalid");
            document.getElementById("thrusters_error").textContent = "Please insert the number of thrusters";
            countErrors++;
        }
        else {
            number_input.classList.remove("is-invalid");
            number_input.classList.add("is-valid");
            document.getElementById("thrusters_error").textContent = "";
        }
    }
    else {
        if (!number_input.value) {
            number_input.classList.add("is-invalid");
            document.getElementById("thruster_error" + getNrFromID(number_input.id)).textContent = "Please insert the value of power";
            countErrors++;
        }
        else {
            number_input.classList.remove("is-invalid");
            number_input.classList.add("is-valid");
            document.getElementById("thruster_error" + getNrFromID(number_input.id)).textContent = "";
        }
    }
    return countErrors;
}
function validateCode(codenr) {
    var code_format = /^[0-9]{4}[a-zA-Z]{4}$/;
    if (code_format.test(codenr)) {
        return true;
    }
    else {
        return false;
    }
}
function codeExists(codeex) {
    var verifyCode = false;
    for (var i = 0; i < rocket_list.length; i++) {
        if (codeex == rocket_list[i].code) {
            verifyCode = true;
        }
    }
    return verifyCode;
}
function createInput() {
    var input_thruster = document.getElementById("input_thruster");
    var thrusters = document.getElementById("nr_thrusters");
    var nr_thruster = parseInt(thrusters.value);
    input_thruster.innerHTML = '';
    for (var i = 0; i < nr_thruster; i++) {
        var create_input = document.createElement("INPUT");
        var create_div = document.createElement("DIV");
        create_input.setAttribute("id", "thruster" + i);
        create_input.setAttribute("placeholder", "Insert value of thruster " + (i + 1));
        create_input.setAttribute("type", "number");
        create_input.setAttribute("class", "form-control form-control-lg mb-2");
        create_input.setAttribute("min", "10");
        create_input.setAttribute("step", "10");
        create_div.setAttribute("id", "thruster_error" + i);
        create_div.setAttribute("class", "invalid-feedback");
        input_thruster.appendChild(create_input);
        input_thruster.appendChild(create_div);
    }
}
// modal
var modal_rocket = document.getElementById("modal_rocket");
window.onclick = function (event) {
    if (event.target == modal_rocket) {
        modal_rocket.style.display = "none";
    }
};
function createRocket(id) {
    id_button = getNrFromID(id);
    var show_data = document.getElementById("show_data");
    var show_data_temp = "";
    show_data_temp += "<div class=\"d-flex justify-content-end mb-4\"><div class=\"msg_cotainer_send\">Create Rocket " + (id_button + 1) + "!</div></div>";
    show_data.innerHTML += show_data_temp;
    show_data.scrollTo(0, show_data.scrollHeight);
    modal_rocket.style.display = "block";
}
function closeModal() {
    var show_data = document.getElementById("show_data");
    var show_data_temp = "";
    show_data_temp += "<div class=\"d-flex justify-content-start mb-4\"><div class=\"msg_cotainer\">Creation of Rocket " + (id_button + 1) + " aborted!</div></div>";
    show_data.innerHTML += show_data_temp;
    show_data.scrollTo(0, show_data.scrollHeight);
    modal_rocket.style.display = "none";
}
function getNrFromID(id) {
    return parseInt(id.match(/\d+/g)[0]);
}
function printRocketInfo(id) {
    var id_info_button = getNrFromID(id);
    var show_data = document.getElementById("show_data");
    var show_data_temp = "<div class=\"d-flex justify-content-end mb-4\"><div class=\"msg_cotainer_send\">Print Rocket " + (id_info_button + 1) + "</div></div>";
    show_data.innerHTML += show_data_temp;
    show_data.scrollTo(0, show_data.scrollHeight);
    show_data_temp = "";
    if (rocket_list[id_info_button]) {
        show_data_temp += "<div class=\"d-flex justify-content-start mb-4\"><div class=\"msg_cotainer\">Rocket " + rocket_list[id_info_button].code + " has boosters max power: ";
        for (var i = 0; i < rocket_list[id_info_button].nr_of_thrusters; i++) {
            show_data_temp += rocket_list[id_info_button].thrusters[i].max_power + ", ";
        }
        show_data_temp = show_data_temp.slice(0, -2);
        show_data_temp += "</div></div>";
    }
    else {
        show_data_temp += "<div class=\"d-flex justify-content-start mb-4\"><div class=\"msg_cotainer\">You need to create the rocket first!</div></div>";
    }
    show_data.innerHTML += show_data_temp;
    show_data.scrollTo(0, show_data.scrollHeight);
}
function printAllRocketsInfo() {
    var show_data = document.getElementById("show_data");
    var show_data_temp = "<div class=\"d-flex justify-content-end mb-4\"><div class=\"msg_cotainer_send\">Print all rockets info</div></div>";
    show_data.innerHTML += show_data_temp;
    show_data.scrollTo(0, show_data.scrollHeight);
    show_data_temp = "";
    if (rocket_list.length > 0) {
        for (var i = 0; i < rocket_list.length; i++) {
            if (rocket_list[i]) {
                show_data_temp += "<div class=\"d-flex justify-content-start mb-4\"><div class=\"msg_cotainer\">Rocket " + rocket_list[i].code + " has boosters max power: ";
                for (var j = 0; j < rocket_list[i].nr_of_thrusters; j++) {
                    show_data_temp += rocket_list[i].thrusters[j].max_power + ", ";
                }
                show_data_temp = show_data_temp.slice(0, -2);
                show_data_temp += "</div></div>";
            }
        }
    }
    else {
        show_data_temp += "<div class=\"d-flex justify-content-start mb-4\"><div class=\"msg_cotainer\">You need to create the rockets first!</div></div>";
    }
    show_data.innerHTML += show_data_temp;
    show_data.scrollTo(0, show_data.scrollHeight);
}
function accelerateRocket(id) {
    var id_accelerate = getNrFromID(id);
    var show_data = document.getElementById("show_data");
    var show_data_temp = "<div class=\"d-flex justify-content-end mb-4\"><div class=\"msg_cotainer_send\">Accelerate Rocket " + (id_accelerate + 1) + "</div></div>";
    show_data.innerHTML += show_data_temp;
    show_data.scrollTo(0, show_data.scrollHeight);
    show_data_temp = "";
    if (rocket_list[id_accelerate]) {
        rocket_list[id_accelerate].accelerate_rocket();
        show_data_temp += "<div class=\"d-flex justify-content-start mb-4\"><div class=\"msg_cotainer\">Rocket " + (id_accelerate + 1) + " has been accelerated!</div></div>";
        show_data_temp += "<div class=\"d-flex justify-content-start mb-4\"><div class=\"msg_cotainer\">Rocket " + (id_accelerate + 1) + " has the thursters with this power now: ";
        for (var i = 0; i < rocket_list[id_accelerate].nr_of_thrusters; i++) {
            show_data_temp += rocket_list[id_accelerate].thrusters[i].current_power + ", ";
        }
        show_data_temp = show_data_temp.slice(0, -2);
        show_data_temp += "</div></div>";
    }
    else {
        show_data_temp += "<div class=\"d-flex justify-content-start mb-4\"><div class=\"msg_cotainer\">You need to create the rocket first!</div></div>";
    }
    show_data.innerHTML += show_data_temp;
    show_data.scrollTo(0, show_data.scrollHeight);
}
function breakRocket(id) {
    var id_break = getNrFromID(id);
    var id_info_button = getNrFromID(id);
    var show_data = document.getElementById("show_data");
    var show_data_temp = "<div class=\"d-flex justify-content-end mb-4\"><div class=\"msg_cotainer_send\">Break Rocket " + (id_break + 1) + "</div></div>";
    show_data.innerHTML += show_data_temp;
    show_data.scrollTo(0, show_data.scrollHeight);
    show_data_temp = "";
    if (rocket_list[id_break]) {
        rocket_list[id_break].break_rocket();
        show_data_temp += "<div class=\"d-flex justify-content-start mb-4\"><div class=\"msg_cotainer\">Rocket " + (id_break + 1) + " has slown down!</div></div>";
        show_data_temp += "<div class=\"d-flex justify-content-start mb-4\"><div class=\"msg_cotainer\">Rocket " + (id_break + 1) + " has the thursters with this power now: ";
        for (var i = 0; i < rocket_list[id_break].nr_of_thrusters; i++) {
            show_data_temp += rocket_list[id_break].thrusters[i].current_power + ", ";
        }
        show_data_temp = show_data_temp.slice(0, -2);
        show_data_temp += "</div></div>";
    }
    else {
        show_data_temp += "<div class=\"d-flex justify-content-start mb-4\"><div class=\"msg_cotainer\">You need to create the rocket first!</div></div>";
    }
    show_data.innerHTML += show_data_temp;
    show_data.scrollTo(0, show_data.scrollHeight);
}
