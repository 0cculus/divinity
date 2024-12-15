import { Draw, forceScale } from '../game/render.js'
import { initMenu } from '../game/menu.js'
import { KeyBordinput } from '../game/keybord.js'
import { GameData } from '../game/gameSetting.js'
import { Tournament } from '../game/tournament.js'
import { initGame } from '../game/game.js'
import { initDevRoom } from '../game/devRoom.js'
import { loggedInUser } from './registerLogin.js'

import { disableMenu, setupGameSettings, enableMenu } from './menusUtils.js'

const gameContainer = document.getElementById("gameContainer");
const playPongMenu = document.getElementById("pongMenu");
const  gameSettings = document.getElementById("gameSettingsContainer")

const gamedata       = new GameData
const TournamentData = new Tournament

//playPong function will handle menus visibility and draw the game settings menu with a variable number of players depending on the game mode

//Should a token be kept for each registered user ? Probably...
class pongPlayer {

    constructor(name, games, wins, registered, color1, color2) {
        this.username = name;
        this.gamesPlayed = games;
        this.gamesWon = wins;
        this.isPlaying = false;
        this.isRegistered = registered;
        this.colorName = color1;
        this.colorPad = color2;
    }
    
    setName(name) { this.name = name; }
    setGames(count) { this.gamesPlayed = count; }
    setWins(count) { this.gamesWon = count; }
    setPlayingStatus(status) { this.isPlaying = status; }
    setColorName(color) { this.colorName = color; }
    setColorPad(color) { this.colorPad = color; }

    getName() { return this.name; }
    getGames() { return this.gamesPlayed; }
    getWins() { return this.gamesWon; }
    getPlayingStatus() { return this.isPlaying; }
    getRegisterStatus() { return this.isRegistered; }
    getColorName() { return this.colorName; }
    getColorPad() { return this.colorPad; }
}

//This does not yet handle tournaments
export function playPong(event) {

    const gameMode = event.currentTarget.id;
    let players = new Array();
    
    //reset game data
    if (gameMode == "pongPlay1v1")
        setupGameSettings(2);
    if (gameMode == "pongPlay4")
        setupGameSettings(4);
    if (gameMode == 'pongPlayVAI')
        setupGameSettings(1);

    disableMenu(playPongMenu);
    enableMenu(gameSettings);

    //Send data to backend when game is finished
    //Wait for game end signal. Send game data to backend
    //exit endgame button (return to menu)
}
