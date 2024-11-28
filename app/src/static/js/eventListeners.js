import { loginUser, registerUser, logoutUser } from "./registerLogin.js";
import {enablePongMenu, enableDiceMenu, goBack } from "./chooseGameMenu.js";
import { playPong } from "./playPongMenu.js";


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
    const play1v1Pong = document.getElementById("pongPlay1v1");
    const play4v4Pong = document.getElementById("pongPlay4");
    const playVAIPong = document.getElementById("pongPlayVAI");
    const playTournamentPong = document.getElementById("pongPlayTournament");
    
    play1v1Pong.addEventListener("click", playPong);
    play4v4Pong.addEventListener("click", playPong);
    playVAIPong.addEventListener("click", playPong);

    //playTournamentPong.addEventListener("click", playPong("T")); - requires exception

    
    //Transcendice menu
});