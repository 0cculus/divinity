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

function newPlayerRow(numberPlayers) {

    const gameSettingsDiv = document.getElementById("gameSettingsDiv");

    const newCol = document.createElement("div");
    const newRow = document.createElement("div");
    
    newRow.classList.add("row", "d-flex", "justify-content-evenly", "flex-column");
    newCol.classList.add("col")
    
    for (let i = 0; i < numberPlayers; i++) {

        const newPlayer = document.createElement("div");
        const newBtn = document.createElement("button");

        newBtn.innerHTML = "Ajouter un joueur";
        newBtn.classList.add("btn", "primary-btn"); //toggle a modal
        
        newPlayer.appendChild(newBtn);
        newPlayer.classList.add("d-flex", "player-container");
        
        newCol.appendChild(newPlayer);
    }
    
    newRow.appendChild(newCol);
    gameSettingsDiv.appendChild(newRow);
}
        
export function displayGameSettings(numberPlayers) {

    if (numberPlayers == 1) {
        
        newPlayerRow(1);
        numberPlayers = 0;
    }
    while (numberPlayers != 0) {
        
        console.log(numberPlayers);
        newPlayerRow(2);
        numberPlayers -= 2;
    }
}
//Collect user input
