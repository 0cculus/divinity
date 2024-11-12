import { Draw, forceScale } from '../game/render.js'
import { initMenu } from '../game/menu.js'
import { KeyBordinput } from '../game/keybord.js'
import { GameData } from '../game/gameSetting.js'
import { Tournament } from '../game/tournament.js'
import { initGame } from '../game/game.js'
import { initDevRoom } from '../game/devRoom.js'

import { disableMenu } from './chooseGameMenu.js'

const gameContainer = document.getElementById("gameElement");
const playPongMenu = document.getElementById("pongMenu");

const gamedata       = new GameData
const TournamentData = new Tournament

// function setupGameData() {
    //Here, retrieve players and colors, and setup GameData and Tournament.
// }

function retrieveData1v1() {
    
}

export function play1v1Pong() {

    //!Fetch data from user (who is playing ?)
    gameContainer.style.display = "flex";
    disableMenu(playPongMenu);

    retrieveData1v1();

    gamedata.setCallBack(initMenu);
    TournamentData.setGame(initGame);
    //TournamentData.setGame(initDevRoom);
    TournamentData.setGameData(gamedata);
    gamedata._keybordMode =  true
    KeyBordinput();  //> setup keybord
    Draw();          //* init
    forceScale();
    TournamentData.start();
    //!Envoyer data DB et update leaderboard
}

export function play4v4Pong() {

}

export function playAIPong() {

}

export function playTournamentPong() {

}
