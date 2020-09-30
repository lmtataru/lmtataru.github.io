let id_button: number;
let rockets: Rocket;
let rocket_list: Rocket[] = [];
function createRocket(code: string, thrusters: number){
	rockets = new Rocket(code, thrusters);
}

// get data from form
const rocket_form: HTMLFormElement  = (document.querySelector('#rocket_form') as HTMLFormElement);
rocket_form.onsubmit = () => {
	let code: HTMLInputElement = (document.getElementById("rocket_code") as HTMLInputElement);
	let thrusters: HTMLInputElement = (document.getElementById("nr_thrusters") as HTMLInputElement);

	let code_error: HTMLElement = (document.getElementById("code_error") as HTMLElement);
	let thrusters_error : HTMLElement = (document.getElementById("thrusters_error") as HTMLElement);
	
	let show_data: HTMLElement = (document.getElementById("show_data") as HTMLElement);
	
	let countErrors: number = 0;
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
		for( let i:number = 0; i < rocket_list.length; i++) {
			if (rocket_list[i]) 
				show_data.innerHTML += "Rocket " + rocket_list[i].code + " has " + rocket_list[i].thrusters + " thrusters." + "<br>";	
		}

	}

	return false; // prevent reload
}

function checkCode(code: HTMLInputElement, code_error: HTMLElement){
	let countErrors: number = 0;

	if (!validateCode(code.value)) {
		code.classList.add("is-invalid");
		code_error.textContent = "Please insert the code";
		countErrors ++;
	} else if (codeExists(code.value)) {
		code.classList.add("is-invalid");
		code_error.textContent = "This rocket already exists in our system.";
		countErrors ++;
	} else {
		code.classList.remove("is-invalid");
		code.classList.add("is-valid");
		code_error.textContent = "";
	}

  	return countErrors;
}

function checkThruster(thrusters: HTMLInputElement, thrusters_error: HTMLElement){
	let countErrors: number = 0;

	if (!thrusters.value) {
		thrusters.classList.add("is-invalid");
		thrusters_error.textContent = "Please insert the number of thrusters";
		countErrors ++; 
	} else {
		thrusters.classList.remove("is-invalid");
		thrusters.classList.add("is-valid");
		thrusters_error.textContent = "";
	}
	
  	return countErrors;
}

function validateCode(codenr: string) {
	let code_format: RegExp = /^[a-zA-Z0-9]{8}$/;
	if (code_format.test(codenr)) {
		return true;
	} else {
		return false;
	}
}

function codeExists(codeex: string) {
	let i: number;
	let verifyCode: boolean = false;
	for (i = 0; i < rocket_list.length; i++) {
		if (codeex == rocket_list[i].code) {
			verifyCode = true;
		}
	}

	return verifyCode;
}

function createInput() {
  	let input_thruster: HTMLInputElement = (document.getElementById("input_thruster") as HTMLInputElement);
  	let thrusters: HTMLInputElement = (document.getElementById("nr_thrusters") as HTMLInputElement);
  	let nr_thru: number = parseInt(thrusters.value);
  	input_thruster.innerHTML = ''; 
  	for (let i:number = 0; i < nr_thru; i++) {
  		var x: HTMLInputElement = document.createElement("INPUT") as HTMLInputElement;
 		x.setAttribute("id", "thruster" + i);
 		x.setAttribute("placeholder", "Insert value of thruster " + (i+1));
 		x.setAttribute("type", "number");
 		x.setAttribute("class", "form-control form-control-lg");
 	 	input_thruster.appendChild(x);
  	}
}

// modal
let modal_rocket: HTMLElement = (document.getElementById("modal_rocket") as HTMLElement);
window.onclick = function(event: any) {
  	if (event.target == modal_rocket) {
    	modal_rocket.style.display = "none";
  	}
}

function checkButton(id: string) {
	id_button = parseInt(id.match(/\d+/g)[0]);
	modal_rocket.style.display = "block";
	console.log(id_button);
}

function closeModal(){
	modal_rocket.style.display = "none";
}

