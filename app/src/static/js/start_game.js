
import { Draw } from '../game/render.js'
import { initMenu } from '../game/menu.js'
import { KeyBordinput } from '../game/keybord.js'
import { GameData } from '../game/gameSetting.js'
import { Tournament } from '../game/tournament.js'
import { initGame } from '../game/game.js'

import { disableMenu } from './game_menus.js'


function startPong() {
    
    const playPongMenu = document.getElementById("pongMenu");
    const gamedata       = new GameData
    const TournamentData = new Tournament

    gamedata.setCallBack(initMenu)
    TournamentData.setGame(initGame)
    //TournamentData.setGame(initDevRoom)
    TournamentData.setGameData(gamedata)
    gamedata._keybordMode =  true
    Draw()          //* init
    KeyBordinput()  //> setup keybord

    const play1v1Btn = document.getElementById("pongPlay1v1");
    const gameContainer = document.getElementById("gameElement");
    
    play1v1Btn.addEventListener("click", function() {
        
        gameContainer.style.display = "block";
        disableMenu(playPongMenu);
        TournamentData.start();
    });
}

startPong();