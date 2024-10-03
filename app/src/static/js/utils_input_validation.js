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

async function checkEmailExists(email) {

    let response = await fetch('/verifyEmailUsed/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify(email)
    });
    if (response.ok) {

        if (response.json == "USED") {//response.status ? Check with backend

            document.getElementById("registerEmailInfo").innerHTML = "Adresse e-mail déjà utilisée."
            document.getElementById("registerEmailInfo").classList.add("text-danger");
        }
        else {
            document.getElementById("registerEmailInfo").innerHTML = "Votre adresse e-mail ne sera utilisée que pour vous identifier.";
            document.getElementById("registerEmailInfo").classList.remove("text-danger");
        }
    }
    else{ return; } //!error handling here
}

//Validate Register
export function validateRegister(userEmail, userPassword, passwordVerif) {

    if (validateEmail(userEmail) == false) {

        document.getElementById("registerEmailInfo").innerHTML = "Format invalide. Ex: exemple@exempleDomaine.com";
        document.getElementById("registerEmailInfo").classList.add("text-danger");
        return false;
    } else {
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

export function validateLogin(userEmail, userPassword) {

    if (validateEmail(userEmail) == false) {

        document.getElementById("registerEmailInfo").innerHTML = "Format invalide. Ex: exemple@exempleDomaine.com";
        document.getElementById("registerEmailInfo").classList.add("text-danger");
        return false;
    } else {
        document.getElementById("registerEmailInfo").innerHTML = "";
        document.getElementById("registerEmailInfo").classList.remove("text-danger");
    }

    if (validatePassword(userPassword) == false) {
        document.getElementById("loginPasswordInfo").innerHTML = "Adresse e-mail ou mot de passe invalide."
    }
    else {
        
    }
    //validate email and password
    //Ask backend if user exists and password is ok
}