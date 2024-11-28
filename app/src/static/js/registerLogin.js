import { validateRegister, validateLogin } from "./credentialsValidate.js";
import { enableMenu, disableMenu } from "./chooseGameMenu.js"

class loggedInUser {

    constructor(username, gamesPlayed, gamesWon) {
        this.username = username;
        this.gamesPlayed = gamesPlayed;
        this.gamesWon = gamesWon;
    }
    
    setName(name) { this.name = name; }
    setGames(count) { this.gamesPlayed = count; }
    setWins(count) { this.gamesWon = count; }

    getName() { return this.name; }
    getGames() { return this.gamesPlayed; }
    getWins() { return this.gamesWon; }
}

let loggedUser = new loggedInUser("JohnDoe", "0", "0");

export async function registerUser(event) {
        
    event.preventDefault;
    
    const registerEmail = document.getElementById("registerEmail").value;
    const registerPassword = document.getElementById("registerPassword").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    
    if (validateRegister(registerEmail, registerPassword, passwordConfirm) == true) {
        
        // let registerInfo = {
        //     email: registerEmail,
        //     password: registerPassword,
        // };
        // response = await fetch('/register/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-CSRFToken': getCSRFToken()
        //     },
        //     body: JSON.stringify(registerInfo)
        // });
        
        // if (response.ok) {}
        if (1) //If email isnt used already (BACKEND)
        {
            const registerModal = document.getElementById('registerModal');
            const modalInstance = bootstrap.Modal.getInstance(registerModal);
        
            modalInstance.hide();
            document.getElementById("emailConfirmationAlert").style.display = 'block';
        }
        else {
            //Email already used message
        }
    };
}

function updateProfile() {

    const usernameElement = document.getElementById("profileUsername");
    const gamesPlayedElement = document.getElementById("profileGamesPlayed");
    const gamesWonElement = document.getElementById("profileGamesWon");

    usernameElement.innerHTML = loggedUser.getName();
    gamesPlayedElement.innerHTML = loggedUser.getGames();
    gamesWonElement.innerHTML = loggedUser.getWins();
}

const notLoggedMessage = document.getElementById("notLoggedMessage");
const gameChoiceBtns = document.getElementById("gameChoiceBtns");

const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById("registerBtn");
const dropdownMenuBtn = document.getElementById("dropdownMenuBtn");
const registerLoginBtnElement = document.getElementById("registerLoginBtnElement");

export async function loginUser(event) {
    
    event.preventDefault();
    
    const userPassword = document.getElementById("loginPassword").value;
    const userEmail = document.getElementById("loginEmail").value;

    if (validateLogin(userEmail, userPassword) == true) {

        if (1 /*backend com */) {

            //Replace below with backend response
            loggedUser.setGames("10");
            loggedUser.setName("NameDB");
            loggedUser.setWins("10");
            updateProfile();

            const loginModal = document.getElementById('loginModal');
            const modalInstance = bootstrap.Modal.getInstance(loginModal);
        
            modalInstance.hide();
            document.getElementById("profileElement").style.display = 'flex';

            registerLoginBtnElement.style.display = "none";
            notLoggedMessage.style.display = "none";
            enableMenu(gameChoiceBtns)

            registerBtn.disabled = true;     
            loginBtn.disabled = true;
            dropdownMenuBtn.disabled = true;
        }
        else {
            return;
            //user or password incorrect
        }
    }
}

export function logoutUser() {
     
    //delete access token
    document.getElementById("profileElement").style.display = 'none';

    registerLoginBtnElement.style.display = "block";

    registerBtn.disabled = false;
    loginBtn.disabled = false;
    dropdownMenuBtn.disabled = false;
    disableMenu(gameChoiceBtns);
    notLoggedMessage.style.display = "block";
}

export default loggedUser;
