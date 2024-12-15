import { forceGameQuit } from "../game/game.js"
import { enableMenu, disableMenu } from "./menusUtils.js";

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
    //reset game data
}

default export 
