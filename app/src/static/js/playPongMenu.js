import { Draw, forceScale } from '../game/render.js'
import { initMenu } from '../game/menu.js'
import { KeyBordinput } from '../game/keybord.js'
import { GameData } from '../game/gameSetting.js'
import { Tournament } from '../game/tournament.js'
import { initGame } from '../game/game.js'
import { initDevRoom } from '../game/devRoom.js'

import { disableMenu, displayGameSettings, enableMenu } from './menusUtils.js'

const gameContainer = document.getElementById("gameContainer");
const playPongMenu = document.getElementById("pongMenu");
const  gameSettings = document.getElementById("gameSettingsContainer")

const gamedata       = new GameData
const TournamentData = new Tournament

//playPong function will handle menus visibility and draw the game settings menu with a variable number of players depending on the game mode

export function playPong(event) {

    const gameMode = event.currentTarget.id;

    console.log("DEBUG: " + gameMode);
    //reset game data
    if (gameMode == "pongPlay1v1")
        displayGameSettings(2);
    if (gameMode == "pongPlay4")
        displayGameSettings(4);
    if (gameMode == 'pongPlayVAI')
        displayGameSettings(1);

    disableMenu(playPongMenu);
    enableMenu(gameSettings);

    //setup user input collecting
    //enable game settings menu
    //Send data to backend when game is finished
    //Wait for game end signal. Send game data to backend
    //exit endgame button
}
