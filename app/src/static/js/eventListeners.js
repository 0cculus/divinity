import { loginUser, registerUser } from "registerLogin.js";
import {enablePongMenu, enableDiceMenu, goBack } from "chooseGameMenu.js";

document.addEventListener("DOMContentLoaded", function() {
    
    //Listeners for login/register
    const loginSubmitBtn = document.getElementById("loginSubmitBtn");
    const registerSubmitBtn = document.getElementById("registerSubmitBtn");
    
    loginSubmitBtn.addEventListener("click", loginUser);
    registerSubmitBtn.addEventListener('click', registerUser);

    //Listeners for game menus
    const playPongBtn = document.getElementById("playPongBtn");
    const playTranscendiceBtn = document.getElementById("playTranscendiceBtn");
    const backBtn = document.getElementById("backBtn");
    
    playPongBtn.addEventListener("click", enablePongMenu);
    playTranscendiceBtn.addEventListener("click", enableDiceMenu);
    backBtn.addEventListener("click", goBack);
});
