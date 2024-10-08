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
    const playOtherGameBtn = document.getElementById("playOtherGameBtn");
    const chooseGameBtn = document.getElementById("gameChoiceBtn");
    
    const pongMenu = document.getElementById("pongMenu");
    const otherGameMenu = document.getElementById("otherGameMenu");
    const gameChoiceMenu = document.getElementById("gameChoiceMenu");
    
    playPongBtn.addEventListener("click", function() {
        
        disableMenu(gameChoiceMenu);
        enableMenu(pongMenu);
        
    });
    
    playOtherGameBtn.addEventListener("click", function() {
        
        disableMenu(gameChoiceMenu);
        enableMenu(otherGameMenu);
    });
    
    chooseGameBtn.addEventListener("click", function() {
        
        disableMenu(pongMenu);
        disableMenu(otherGameMenu);
        enableMenu(gameChoiceMenu);
    })
}

init();