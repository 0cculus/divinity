import { forceGameQuit } from "../game/game.js"

export function enableMenu(menu) {
    
    const menuBtns = menu.querySelectorAll("button");
    
    menuBtns.forEach(button => {
        button.disabled = false;
    });
    menu.style.display = "block";
} 

export function disableMenu(menu) {
    
    const menuBtns = menu.querySelectorAll("button");
    
    menu.style.display = "none";
    menuBtns.forEach(button => {
        button.disabled = true;
    });
}

const pongMenu = document.getElementById("pongMenu");
const diceGameMenu = document.getElementById("transcendiceGameMenu");

export function enablePongMenu() {

    disableMenu(gameChoiceMenu);
    enableMenu(pongMenu);

    backBtn.style.display = "flex";
    backBtn.disabled = false;

}

export function enableDiceMenu() {

    disableMenu(gameChoiceMenu);
    enableMenu(diceGameMenu);

    backBtn.style.display = "block";
    backBtn.disabled = false;
}

export function goBack() {

    disableMenu(pongMenu);
    disableMenu(diceGameMenu);
    enableMenu(gameChoiceMenu);
    
    const gameElement = document.getElementById("gameContainer");
    gameElement.style.display = "none";
    backBtn.style.display = "none";
    backBtn.disabled = true;

    forceGameQuit();
}
