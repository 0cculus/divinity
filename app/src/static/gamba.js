var tabDiceAvail = Array(6)
var tabLimbo = Array(6)
var tabDiceSaved = Array(6)
var mapScore = new Map()

var currentSaved = 0
var currentLimbo = 0
const minVal = 1
const maxVal = 6
const nbDice = 6

// array: slice to remove first, pop to remove last

function save(id)
{
	index = Number(id.replace("availDie", ""))
	if (currentLimbo < 6 && tabDiceAvail[index] != 0)
	{
		tabLimbo[currentLimbo] = tabDiceAvail[index]
		tabDiceAvail[index] = 0
		document.getElementById("limboDie" + currentLimbo).value = tabLimbo[currentLimbo]
		document.getElementById(id).value = ""
		currentLimbo++
	}
}

function cacheSaved()
{
	for (var i = 0; i < currentLimbo; i++)
	{
		tabDiceSaved[currentSaved] = tabLimbo[i]
		tabLimbo[i] = 0
		document.getElementById("savedDie" + currentSaved).value = tabDiceSaved[currentSaved]
		document.getElementById("limboDie" + i).value = ""
		currentSaved++
	}
	currentLimbo = 0
}

function rerollDice()
{
	for (var i = 0; i < tabDiceAvail.length; i++)
	{
		document.getElementById("availDie" + i).value = ""
		tabDiceAvail[i] = 0
	}
	if (currentLimbo < nbDice)
	{
		for (var i = 0; i < nbDice - currentSaved; i++)
		{
			tabDiceAvail[i] = Math.floor(Math.random() * (maxVal -minVal) + minVal)
			document.getElementById("availDie" + i).value = tabDiceAvail[i]
		}
	}
	else
	{
		for (var i = 0; i < tabDiceAvail.length; i++)
			document.getElementById("availDie" + i).value = Math.floor(Math.random() * (maxVal -minVal) + minVal)
	}
}

function clear()
{
	for (var i = 0; i < nbDice; i++)
	{
		document.getElementById("availDie" + i).value = ""
		document.getElementById("savedDie" + i).value = ""
		document.getElementById("limboDie" + i).value = ""
		tabDiceAvail[i] = 0
		tabDiceSaved[i] = 0
		tabLimbo[i] = 0
	}
	currentSaved = 0
	currentLimbo = 0
}

//WIP
function score()
{
	if (currentLimbo == 0)
		clear()
	else if (currentSaved != 0 && currentLimbo != 0)
	{
		var currentScore = 0
		tabLimbo.sort()
		tabDiceSaved.sort()
		for (var i = 0; i < currentSaved; i++)
			mapScore.set(tabDiceSaved[i], mapScore.get(tabDiceSaved[i]) + 1)
		for (var i = 0; i < currentLimbo; i++)
			mapScore.set(tabLimbo[i], mapScore.get(tabLimbo[i]) + 1)
		console.log(currentScore)
	}
	rerollDice()
}

function init()
{
	const contentElement = document.getElementById("content")

	contentElement.innerHTML = `<div id="avail">
</div>
<div id="limbo">
</div>
<div id="saved">
</div>
<div id="controls">
</div>`

	const divAvail = document.getElementById("avail")
	for (var i = 0; i < tabDiceAvail.length; i++)
	{
		const die = document.createElement("input")
		tabDiceAvail[i] = Math.floor(Math.random() * (maxVal -minVal) + minVal)
		die.value = tabDiceAvail[i]
		die.type = "button"
		die.id = "availDie" + i
		die.addEventListener("click", function(){
			save(die.id)
		})
		divAvail.appendChild(die)
	}
	const divLimbo = document.getElementById("limbo")
	for (var i = 0; i < tabDiceSaved.length; i++)
	{
		const die = document.createElement("input")
		die.type = "button"
		die.id = "limboDie" + i
		divLimbo.appendChild(die)
	}
	const divSaved = document.getElementById("saved")
	for (var i = 0; i < tabDiceSaved.length; i++)
	{
		const die = document.createElement("input")
		die.type = "button"
		die.id = "savedDie" + i
		divSaved.appendChild(die)
	}
	const endTurn = document.createElement("input")
	endTurn.type = "button"
	endTurn.id = "btnEnd"
	endTurn.value = "end turn"
	endTurn.addEventListener("click", function() {
		score()
	})
	document.getElementById("controls").appendChild(endTurn)
	const saveDice = document.createElement("input")
	saveDice.type = "button"
	saveDice.id = "btnSave"
	saveDice.value = "save dice"
	saveDice.addEventListener("click", function() {
		cacheSaved()
		rerollDice()
	})
	document.getElementById("controls").appendChild(saveDice)
	mapScore.set(1, 0)
	mapScore.set(2, 0)
	mapScore.set(3, 0)
	mapScore.set(4, 0)
	mapScore.set(5, 0)
	mapScore.set(6, 0)
}

init()
