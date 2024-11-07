import { Player } from './userGamba.js'

var tabDiceAvail = Array(6)
var tabDiceSaved = Array(6)
var tabPlayer = Array(2)
var tabLimbo = Array(6)
var tabScore = Array()

var currentSaved = 0
var currentLimbo = 0
//var currentScore = 0
var playerCount = 0
var currentPlayer = null
const minVal = 1
const maxVal = 6
const nbDice = 6

/* ------------------------------- */
// WIP CHANGE TO 2 USERS PLAYSTYLE //
/* ------------------------------- */

function save(id)
{
	let index = Number(id.replace("availDie", ""))
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
	var currentScore = Array()
	for (var i = 0; i < currentLimbo && currentSaved < nbDice; i++)
	{
		tabDiceSaved[currentSaved] = tabLimbo[i]
		tabLimbo[i] = 0
		currentScore.push(tabDiceSaved[currentSaved])
		document.getElementById("savedDie" + currentSaved).value = tabDiceSaved[currentSaved]
		document.getElementById("limboDie" + i).value = ""
		currentSaved++
	}
	tabScore.push(currentScore)
	currentLimbo = 0
	rerollDice()
}

function rerollDice()
{
	for (var i = 0; i < tabDiceAvail.length; i++)
	{
		document.getElementById("availDie" + i).value = ""
		tabDiceAvail[i] = 0
	}
	if (currentSaved < nbDice)
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
		{
			tabDiceAvail[i] = Math.floor(Math.random() * (maxVal -minVal) + minVal)
			document.getElementById("availDie" + i).value = tabDiceAvail[i]
		}
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

function countStreak(base, amount)
{
	if (amount == 0)
		return (Number(0))
	if (base == 1)
	{
		if (amount == 3)
			return (Number(500))
		else if (amount == 4)
			return (Number(1000))
		else
			return (Number(amount * 100))
	}
	else if (base == 5)
	{
		if (amount == 3)
			return (Number(250))
		else if (amount == 4)
			return (Number(500))
		else 
			return (Number(amount * 50))
	}
	else
	{
		if (amount == 3)
			return (Number(base * 100))
		else if (amount == 4)
			return (Number(base * 200))
		else
			return (Number(-1))
	}
}

function count(arr)
{
	var currentCount = 0
	if (arr.length == 0)
		return (Number(0))
	for (var base = 1; base <= nbDice; base++)
	{
		var amount = 0
		for (var i = 0; i < arr.length; i++)
		{
			if (arr[i] == base)
				amount++
		}
		console.log("base: ", base, "amount: ", amount, "count: ", countStreak(base, amount))
		currentCount += Number(countStreak(base, amount))
		
	}
	return (Number(currentCount))
}

function score()
{
	if (currentLimbo == 0)
		clear()
	else if (currentSaved != 0 || currentLimbo != 0)
	{
		tabLimbo.sort()
		for (var i = 0; i < tabScore.length; i++)
			currentPlayer.setScore(currentPlayer.getScore() + Number(count(tabScore[i])))
		currentPlayer.setScore(currentPlayer.getScore() + Number(count(tabLimbo)))
		console.log(currentPlayer)
	}
	tabScore = []
	playerCount++
	currentPlayer = tabPlayer[playerCount % 2]
	clear()
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
	})
	document.getElementById("controls").appendChild(saveDice)

	playerCount = 0
	tabPlayer[0] = new Player("Cathan")
	tabPlayer[1] = new Player("Felix")
	currentPlayer = tabPlayer[Math.floor(Math.random() * 2)]
}

init()
