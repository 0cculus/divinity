import { loginUser, registerUser, logoutUser } from "./registerLogin.js";
import {enablePongMenu, enableDiceMenu, goBack } from "./chooseGameMenu.js";
import { play1v1Pong } from "./playPongMenu.js";


document.addEventListener("DOMContentLoaded", function() {
    
    //Login-Register
    const loginSubmitBtn = document.getElementById("loginSubmitBtn");
    const registerSubmitBtn = document.getElementById("registerSubmitBtn");
    
    loginSubmitBtn.addEventListener("click", loginUser);
    registerSubmitBtn.addEventListener('click', registerUser);

    //Logout
    const logoutBtn = document.getElementById("accountLogout");

    logoutBtn.addEventListener("click", logoutUser);
    
    //Game choice menu
    const playPongBtn = document.getElementById("playPongBtn");
    const playTranscendiceBtn = document.getElementById("playTranscendiceBtn");
    const backBtn = document.getElementById("backBtn");
    
    playPongBtn.addEventListener("click", enablePongMenu);
    playTranscendiceBtn.addEventListener("click", enableDiceMenu);
    backBtn.addEventListener("click", goBack);
    
    //PONG menu
    const play1v1Btn = document.getElementById("pongPlay1v1");
    
    play1v1Btn.addEventListener("click", play1v1Pong);
    
    //Transcendice menu
});