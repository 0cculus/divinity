var tabDiceAvail = Array(6)
var tabLimbo = Array()
var tabDiceSaved = Array(6)

var currentSaved = 0
const minVal = 1
const maxVal = 6
const nbDice = 6

// array: slice to remove first, pop to remove last

function save(id)
{
	index = Number(id.replace("availDie", ""))
	if (currentSaved < 6)
	{
		tabDiceSaved[currentSaved] = tabDiceAvail[index]
		tabDiceAvail[index] = 0
		document.getElementById("savedDie" + currentSaved).value = tabDiceSaved[currentSaved]
		document.getElementById(id).value = ""
		currentSaved++
		console.log(index)

	}
}

function init()
{
	const contentElement = document.getElementById("content")

	contentElement.innerHTML = `<div id="avail">
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
	document.getElementById("controls").appendChild(endTurn)
	const saveDice = document.createElement("input")
	saveDice.type = "button"
	saveDice.id = "btnSave"
	saveDice.value = "save dice"
	saveDice.addEventListener("click", function() {
		rerollDice()
	})
	document.getElementById("controls").appendChild(saveDice)
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
			document.getElementById("availDie" + i).value = Math.floor(Math.random() * (maxVal -minVal) + minVal)
	}

}

init()
