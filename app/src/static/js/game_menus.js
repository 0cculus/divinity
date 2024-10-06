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

    menuBtns.forEach(button => {
        button.disabled = true;
    });
    menu.style.display = "none;"
}

document.addEventListener("DOMContentLoaded", function () {

    const playPongBtn = document.getElementById("playPongBtn");
    const playOtherGameBtn = document.getElementById("playOtherGameBtn");

    const gameChoiceMenu = document.getElementById("gameChoiceMenu");
    const pongMenu = document.getElementById("pongMenu");
    const otherGameMenu = docuemnt.getElementById("otherGameMenu");

    playPongBtn.addEventListener("click", function() {

        disableMenu(gameChoiceMenu);
        enableMenu(pongMenu);

    });
    
    playOtherGameBtn.addEventListener("click", function() {

        disableMenu(gameChoiceMenu);
        enableMenu(otherGameMenu);
    });

});







