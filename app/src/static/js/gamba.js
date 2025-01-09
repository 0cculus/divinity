import { Player } from './userGamba.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Box } from '../game/box.js'
import { Text } from '../game/text.js'

var tabTextPlayer = Array(2)
var tabDiceAvail = Array(6)
var tabDiceSaved = Array(6)
var tabPlayer = Array(2)
var tabLimbo = Array(6)
var tabScore = Array()
var dices = Array(6)

var currentSaved = 0
var currentLimbo = 0
var playerCount = 0
var currentPlayer = null
var currentCursor = 0
var frames = 0
var spawnRate = 200
var gameEnd = false
var finalRoll = false
const minVal = 1
const maxVal = 6
const nbDice = 6
var highlighterCurrentPlayer = null

/* ---------------------- */
// WIP ADD DICES TEXTURES //
/* ---------------------- */

/* ---------------------------------------------- */
// WIP REMOVE EVENT LISTENERS AFTER WIN CONDITION //
/* ---------------------------------------------- */

const contentElement = document.getElementById("content")
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
	72,
	window.innerWidth / window.innerHeight,
	0.1,
	10000
)
camera.position.set(0, 0, 9)

const renderer = new THREE.WebGLRenderer({
	alpha: true,
	antialias: true
})
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById("content").appendChild(renderer.domElement)

const sceneControls = new OrbitControls(camera, renderer.domElement)
sceneControls.enabled = false

const cursor = new Box({
	width: 0.3,
	height: 0.3,
	depth: 0.3,
	color: '#000',
	position: {
		x: -5,
		y: 0.5,
		z: 0
	}
})
cursor.castShadow = true
scene.add(cursor)

const ground = new Box({
	width: 100,
	height: 0.1,
	depth: 50,
	color: '#866600',
	position: {
		x: 0,
		y: -2,
		z: 0
	}
})
ground.receiveShadow = true
scene.add(ground)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.y = 3
light.position.z = 1
light.castShadow = true
scene.add(light)
scene.add(new THREE.AmbientLight(0xffffff, 0.5))

camera.position.z = 5

function reserveDice()
{
	if (currentLimbo < 6 && tabDiceAvail[currentCursor] != 0)
	{
		tabLimbo[currentLimbo] = tabDiceAvail[currentCursor]
		dices[currentCursor].position.set(dices[currentCursor].position.x, dices[currentCursor].position.y, dices[currentCursor].position.z - 2) 
		tabDiceAvail[currentCursor] = 0
		currentLimbo++
	}
}

function checkLessThanThree(currentTab)
{
	var tabCheck = [2, 3, 4, 6]
	var tabCount = [0, 0, 0, 0]

	for (var i = 0; i < tabCheck.length; i++)
	{
		for (var j = 0; j < currentTab.length; j++)
		{
			if (tabCheck[i] == currentTab[j])
				tabCount[i]++
		}
	}
	return (tabCount)
}

function verifyPlayableRoll()
{
	var lessThanThree = 0
	var tabCount = checkLessThanThree(tabDiceAvail)

	for (var i = 0; i < tabCount.length; i++)
	{
		if (tabCount[i] < 3)
			lessThanThree++
	}
	if (lessThanThree == 3)
		tabDiceAvail[Math.floor(Math.random() * (maxVal - minVal))] = 5
}

function verifyNotStreakSaved()
{
	var tabCount = checkLessThanThree(tabLimbo)
	
	for (var i = 0; i < tabCount.length; i++)
	{
		if (tabCount[i] < 3)
			return true
	}
	return false
}

function clearDices()
{
	for (var i = 0; i < dices.length; i++)
	{
		dices[i].kill()
		scene.remove(dices[i])
	}
	for (var i = 0; i < nbDice; i++)
	{
		tabDiceAvail[i] = 0
		tabLimbo[i] = 0
	}
	currentLimbo = 0
}

function cacheSaved()
{
	var currentScore = Array()
	if (currentLimbo == 0)
		score()
	else if (verifyNotStreakSaved())
		score()
	else
	{
		for (var i = 0; i < currentLimbo && currentSaved < nbDice; i++)
		{
			tabDiceSaved[currentSaved] = tabLimbo[i]
			tabLimbo[i] = 0
			currentScore.push(tabDiceSaved[currentSaved])
			currentSaved++
		}
		tabScore.push(currentScore)
		currentLimbo = 0
		if (finalRoll)
		{
			score()
			finalRoll = false
		}
		else
			rerollDice()
	}
}

function rerollDice()
{
	for (var i = 0; i < tabDiceAvail.length; i++)
	{
		tabDiceAvail[i] = 0
	}
	clearDices()
	if (currentSaved == 6)
	{
		currentSaved = 0
		finalRoll = true
	}
	for (var i = 0; i < nbDice - currentSaved; i++)
	{
		tabDiceAvail[i] = Math.floor(Math.random() * (maxVal - minVal) + minVal)
		dices[i] = new Box({
			width: 1,
			height: 1,
			depth: 1,
			color: "#fff",
			position: {
				x: -5 + (2 * i),
				y: 20,
				z: 0
			}
		})
		dices[i].gravity = -0.022
		dices[i].castShadow = true
		dices[i].receiveShadow = true
		scene.add(dices[i])
	}
	verifyPlayableRoll()
	console.log(tabDiceAvail)
}

function clearAll()
{
	for (var i = 0; i < tabDiceSaved.length; i++)
		tabDiceSaved[i] = 0
	currentSaved = 0
	clearDices()
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
	finalRoll = false
	if (currentLimbo == 0)
		clearAll()
	else if (currentSaved != 0 || currentLimbo != 0)
	{
		tabLimbo.sort()
		for (var i = 0; i < tabScore.length; i++)
			currentPlayer.setScore(currentPlayer.getScore() + Number(count(tabScore[i])))
		currentPlayer.setScore(currentPlayer.getScore() + Number(count(tabLimbo)))
	}
	tabTextPlayer[playerCount % 2].updateTxt(String(tabPlayer[playerCount % 2].name + ": " + tabPlayer[playerCount % 2].score))
	checkEnd()
	tabScore = []
	playerCount++
	currentPlayer = tabPlayer[playerCount % 2]
	highlighterCurrentPlayer.position.set(tabTextPlayer[playerCount % 2].position.x, highlighterCurrentPlayer.position.y, highlighterCurrentPlayer.position.z)
	console.log(currentPlayer)
	clearAll()
	if (!gameEnd)
		rerollDice()
	else
		endGame()
}

function moveCursor(direction)
{
	if (currentCursor < 0)
	{
		currentCursor = 5
		cursor.position.set(5, cursor.position.y, cursor.position.z)
	}
	else if (currentCursor > 5)
	{
		currentCursor = 0
		cursor.position.set(-5, cursor.position.y, cursor.position.z)
	}
	else
		cursor.position.set(cursor.position.x + direction, cursor.position.y, cursor.position.z)
}


function gameControls(event)
{
	if (gameEnd == false)
	{
		switch (event.code) {
			case 'ArrowLeft':
			case 'KeyA':
				currentCursor--;
				moveCursor(-2)
				break
			case 'ArrowRight':
			case 'KeyD':
				currentCursor++;
				moveCursor(2)
				break
			case 'KeyR':
				cacheSaved()
				break
			case 'Space':
				console.log("selected value: ", tabDiceAvail[currentCursor])
				reserveDice()
				break
			case 'Enter':
				console.log("end turn")
				score()
				break
		}
	}
}

function checkEnd()
{
	if (tabPlayer[0].score >= 3000)
	{
		currentPlayer = tabPlayer[0]
		console.log(tabPlayer[0].name)
		gameEnd = true
	}
	else if (tabPlayer[1].score >= 3000)
	{
		currentPlayer = tabPlayer[1]
		console.log(tabPlayer[1].name)
		gameEnd = true
	}
}

function endGame()
{
	const msgEnd = currentPlayer.name + " won!"
}

function allowKeyEvents()
{
	window.addEventListener('keydown', gameControls)
}

function removeKeyEvents()
{
	window.removeEventListener('keydown', gameControls)
}

function init()
{
	const textMenu = `Use Space to select a die to reserve
	Use R key to reroll the dice
	Use Enter to end the turn
	Reserving a Dice 1 gives 100 points
	Reserving a Dice 5 gives 50 points
	Streaks of 3 gives dice * 100
	Streaks of 4 gives dice * 200
	Careful! If you end turn or reroll without selecting any point dice or streaks you will get no points and the turn will be given to the opponent!`
	
	for (var i = 0; i < nbDice; i++)
	{
		tabDiceAvail[i] = Math.floor(Math.random() * (maxVal) + minVal)
		dices[i] = new Box({
			width: 1,
			height: 1,
			depth: 1,
			color: "#fff",
			position: {
				x: -5 + (2 * i),
				y: 10,
				z: 0
			}
		})
		dices[i].gravity = -0.022
		dices[i].castShadow = true
		dices[i].receiveShadow = true
		scene.add(dices[i])
	}
	console.log(tabDiceAvail)
	playerCount = Math.floor(Math.random() * 2)
	tabPlayer[0] = new Player("Cathan")
	tabPlayer[1] = new Player("Felix")
	currentPlayer = tabPlayer[playerCount % 2]
	console.log(currentPlayer)
	tabTextPlayer[0] = new Text(scene, { x: -5, y: 2, z: 0 }, String(tabPlayer[0].name + ": " + tabPlayer[0].score), "#fff", "static/fonts/OpenSans_Regular.json")
	tabTextPlayer[1] = new Text(scene, { x: 5, y: 2, z: 0 }, String(tabPlayer[1].name + ": " + tabPlayer[1].score), "#fff", "static/fonts/OpenSans_Regular.json")

	highlighterCurrentPlayer = new Box({
		width: 2.5,
		height: 0.1,
		depth: 0.1,
		color: "#c22100",
		position: {
			x: tabTextPlayer[playerCount % 2].position.x,
			y: 1.8,
			z: 0
		}
	})
	scene.add(highlighterCurrentPlayer)
	animate()
}

function animate() {
	const animationId = requestAnimationFrame(animate)
	renderer.render(scene, camera)

	// movement code
	for (let i = 0; i < 6; i++)
	{
		dices[i].velocity.x = 0
		dices[i].velocity.z = 0
		dices[i].update(ground)
	}

	frames++
}

init()
