import { validateRegister } from "./utils_input_validation.js";
import { validateLogin } from "./utils_input_validation.js";

function registerUser() {

    registerSubmitBtn.addEventListener('click', async function (event) {
        console.log("event caught");

        event.preventDefault();
        
        const registerEmail = document.getElementById("registerEmail").value;
        const registerPassword = document.getElementById("registerPassword").value;
        const passwordConfirm = document.getElementById("passwordConfirm").value;

        if (validateRegister(registerEmail, registerPassword, passwordConfirm) == true) {
            
            let registerInfo = {
                email: registerEmail,
                password: registerPassword,
            };
            response = await fetch('/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken()
                },
                body: JSON.stringify(registerInfo)
            });

            if (response.ok) {
                document.getElementById("emailConfirmationAlert").style.display = 'block';
            }
            else { return; }//!error handling here
        };
    });

}

function loginUser() {

    const loginSubmitBtn = document.getElementById("loginSubmitBtn");
    
    loginSubmitBtn.addEventListener("submit", async function(event) {
        
        event.preventDefault();

        let userPassword = getElementById("loginPassword");
        let userEmail = getElementById("loginEmail");

        if (validateLogin() == true)
        {return;}
            //Ask backend if user exists
            //if it does, wait for token here
            //Otherwise, 

    });

}

document.addEventListener("DOMContentLoaded", function() {

    registerUser();
    loginUser();
});



//Validate login
