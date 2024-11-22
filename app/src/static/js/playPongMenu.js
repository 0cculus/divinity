import { Draw, forceScale } from '../game/render.js'
import { initMenu } from '../game/menu.js'
import { KeyBordinput } from '../game/keybord.js'
import { GameData } from '../game/gameSetting.js'
import { Tournament } from '../game/tournament.js'
import { initGame } from '../game/game.js'
import { initDevRoom } from '../game/devRoom.js'

import { disableMenu } from './chooseGameMenu.js'

const gameContainer = document.getElementById("gameContainer");
const playPongMenu = document.getElementById("pongMenu");
const  pongGameSettings = document.getElementById("pongGameSettings")

const gamedata       = new GameData
const TournamentData = new Tournament

//Create and display the game settings menu depending on number of players.
//For each pair of players, create a new row with 6-6, player 1 | player 2
//Space everything evenly (auto margin ?)

function createGameSettingsMenu() {

    document.getElementById("gameSettingsMenu").style.display = "block";
}

export function play1v1Pong() {

    disableMenu(playPongMenu);
    
    createGameSettingsMenu();
    
    // gameContainer.style.display = "flex";
    // gamedata.setCallBack(initMenu);
    // TournamentData.setGame(initGame);
    // // TournamentData.setGame(initDevRoom);
    // TournamentData.setGameData(gamedata);
    // gamedata._keybordMode =  true
    // KeyBordinput();  //> setup keybord
    // Draw();          //* init
    // forceScale();
    // TournamentData.start();
    //!Envoyer data DB et update leaderboard
}

export function play4v4Pong() {

}

export function playAIPong() {

}

export function playTournamentPong() {

}
