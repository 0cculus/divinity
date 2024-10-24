
import { Draw, forceScale } from '../game/render.js'
import { initMenu } from '../game/menu.js'
import { KeyBordinput } from '../game/keybord.js'
import { GameData } from '../game/gameSetting.js'
import { Tournament } from '../game/tournament.js'
import { initGame } from '../game/game.js'
import { initDevRoom } from '../game/devRoom.js'

import { disableMenu } from './game_menus.js'

function startPong() {
    
    const playPongMenu = document.getElementById("pongMenu");
    const gamedata       = new GameData
    const TournamentData = new Tournament
    
    const play1v1Btn = document.getElementById("pongPlay1v1");
    const gameContainer = document.getElementById("gameElement");
    
    play1v1Btn.addEventListener("click", function() {
        
        gameContainer.style.display = "flex";
        disableMenu(playPongMenu);

        gamedata.setCallBack(initMenu);
        TournamentData.setGame(initGame);
        //TournamentData.setGame(initDevRoom);
        TournamentData.setGameData(gamedata);
        gamedata._keybordMode =  true
        KeyBordinput();  //> setup keybord
        Draw();          //* init
        forceScale();
        TournamentData.start();
    });
}

startPong();