let playingPong = false;
let playingOther = false;

function enableMenu(menu) {
    
    const menuBtns = menu.querySelectorAll("button");
    
    menuBtns.forEach(button => {
        button.disabled = false;
    });
    menu.style.display = "block";
} 

export function disableMenu(menu) {
    
    const menuBtns = menu.querySelectorAll("button");
    
    menu.style.display = "none"
    menuBtns.forEach(button => {
        button.disabled = true;
    });
}

const pongMenu = document.getElementById("pongMenu");
const diceGameMenu = document.getElementById("transcendiceGameMenu");
const backBtn = document.getElementById("backBtn");

function init() {
    
    const playPongBtn = document.getElementById("playPongBtn");
    const playTranscendiceBtn = document.getElementById("playTranscendiceBtn");
    const settingsBtn = document.getElementById("settingsBtn");
    
    playPongBtn.addEventListener("click", function() {
        
        disableMenu(gameChoiceMenu);
        enableMenu(pongMenu);

        backBtn.style.display = "block";
        backBtn.disabled = false;
    });
    
    playTranscendiceBtn.addEventListener("click", function() {
        
        disableMenu(gameChoiceMenu);
        enableMenu(diceGameMenu);

        backBtn.style.display = "block";
        backBtn.disabled = false;
    });

    backBtn.addEventListener("click", function() {

        //!Exit Pong/Dice
        disableMenu(pongMenu);
        disableMenu(diceGameMenu);
        enableMenu(gameChoiceMenu);

        backBtn.style.display = "none";
        backBtn.disabled = true;
    })
}

document.addEventListener("DOMContentLoaded", function() { init(); });