import { validateRegister } from "./credentialsValidate.js";
import { validateLogin } from "./credentialsValidate.js";

class loggedInUser {

    constructor(username, gamesPlayed, gamesWon) {
        this.username = username;
        this.gamesPlayed = gamesPlayed;
        this.gamesWon = gamesWon;
    }
    
    setName(name) { this.name = name; }
    setGames(count) { this.gamesPlayed = count; }
    setWins(count) { this.gamesWon = count; }
}

let loggedUser = new loggedInUser("JohnDoe", "0", "0");

export async function registerUser(event) {
        
    event.preventDefault;
    
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
        else { return; }
    };
}

export async function loginUser(event) {
    
    event.preventDefault();
    
    let userPassword = getElementById("loginPassword");
    let userEmail = getElementById("loginEmail");
    
    if (validateLogin() == true)
        {return;}
    //Ask backend if user exists
    //if it does, wait for token here
    //Otherwise, 
    
    loggedUser.setName("NameDB");
    loggedUser.setGames("10");
    loggedUser.setWins("10");
}

export default loggedUser;