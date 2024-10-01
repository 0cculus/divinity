function hasSpecifiedChars(targetChars, srcStr) {

    for (let target of targetChars) {

        if (srcStr.includes(target) != -1)
            return true;
    }
    return false;
}

function validateEmail(email) {

    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordRegex.test(password) == false)
        return false;
    return true;
}

function validateRegister(userEmail, userPassword, passwordVerif) {
    
    if (validateEmail(userEmail) == false) {
        
        document.getElementById("registerEmailInfo").innerHTML = "Format invalide. Ex: exemple@exempleDomaine.com";
        document.getElementById("registerEmailInfo").classList.add("text-danger");
        return false;
    } else  {
        document.getElementById("registerEmailInfo").innerHTML = "Votre adresse e-mail ne sera utilisée que pour vous identifier.";
        document.getElementById("registerEmailInfo").classList.remove("text-danger");
    }

    if (validatePassword(userPassword) == false) {
        
        document.getElementById("passwordInfo").classList.add("text-danger");
        return false;
    } else { document.getElementById("passwordInfo").classList.remove("text-danger"); }

    if (userPassword != passwordVerif) {
        document.getElementById("passwordConfirmInfo").innerHTML = "Les mots de passe ne sont pas identiques.";
        document.getElementById("passwordConfirmInfo").classList.add("text-danger");
        return false;
    } else {
        document.getElementById("passwordConfirmInfo").innerHTML = "";
        document.getElementById("passwordConfirmInfo").classList.remove("text-danger");
    }
    return true;
}

document.addEventListener("DOMContentLoaded", function() {

    const registerButton = document.getElementById("registerButton");
    
    registerButton.addEventListener("click", function() {

        const registerEmail = document.getElementById("registerEmail").value;
        const registerPassword = document.getElementById("registerPassword").value;
        const passwordConfirm = document.getElementById("passwordConfirm").value;
        
        if (validateRegister(registerEmail, registerPassword, passwordConfirm) == true);
        //Send to backend, check if email exists. If it does, change email for "email already used" and exit.
        //Otherwise, show window with "an email confirmation link has been sent, please confirm before loggin in."
        //Once email confirmed, set default username (from email) and default profile pic. Continue with loggin.
    }); 
});

//Validate login