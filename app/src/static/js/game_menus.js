let playingPong = false;
let playingOther = false;

function enableMenu(menu) {
    
    const menuBtns = menu.querySelectorAll("button");
    
    menuBtns.forEach(button => {
        button.disabled = false;
    });
    menu.style.display = "block";
} 

function disableMenu(menu) {
    
    const menuBtns = menu.querySelectorAll("button");
    
    menu.style.display = "none"
    menuBtns.forEach(button => {
        button.disabled = true;
    });
}

function init() {
    
    const playPongBtn = document.getElementById("playPongBtn");
    const playTranscendiceBtn = document.getElementById("playTranscendiceBtn");
    // const chooseGameBtn = document.getElementById("gameChoiceBtn");
    const settingsBtn = document.getElementById("settingsBtn");
    
    const pongMenu = document.getElementById("pongMenu");
    const TranscendiceGameMenu = document.getElementById("TranscendiceGameMenu");
    const gameChoiceMenu = document.getElementById("gameChoiceMenu");

    
    playPongBtn.addEventListener("click", function() {
        
        disableMenu(gameChoiceMenu);
        enableMenu(pongMenu);
    });
    
    playTranscendiceBtn.addEventListener("click", function() {
        
        disableMenu(gameChoiceMenu);
        enableMenu(TranscendiceGameMenu);
    });
    
    // chooseGameBtn.addEventListener("click", function() {
        
    //     disableMenu(pongMenu);
    //     disableMenu(TranscendiceGameMenu);
    //     enableMenu(gameChoiceMenu);
    // });
}

//!while in game, disable settings btn

init();