import { Player } from './userGamba.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Box } from '../game/box.js'

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
let frames = 0
let spawnRate = 200
const minVal = 1
const maxVal = 6
const nbDice = 6

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

const controls = new OrbitControls(camera, renderer.domElement)
controls.enabled = false

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

/* ----------------------------------- */
// WIP ADD END CONDITION & TIE BREAKER //
/* ----------------------------------- */

function save(id)
{
	if (currentLimbo < 6 && tabDiceAvail[currentCursor] != 0)
	{
		tabLimbo[currentLimbo] = tabDiceAvail[currentCursor]
		dices[currentCursor].position.set(dices[currentCursor].position.x, dices[currentCursor].position.y, dices[currentCursor].position.z - 2) 
		tabDiceAvail[currentCursor] = 0
		currentLimbo++
	}
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
		tabDiceSaved[i] = 0
		tabLimbo[i] = 0
	}
	currentSaved = 0
	currentLimbo = 0
}

function cacheSaved()
{
	var currentScore = Array()
	for (var i = 0; i < currentLimbo && currentSaved < nbDice; i++)
	{
		tabDiceSaved[currentSaved] = tabLimbo[i]
		tabLimbo[i] = 0
		currentScore.push(tabDiceSaved[currentSaved])
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
		tabDiceAvail[i] = 0
	}
	for (var i = 0; i < nbDice - currentSaved; i++)
	{
		tabDiceAvail[i] = Math.floor(Math.random() * (maxVal -minVal) + minVal)
		dices[i] = new Box({
			width: 1,
			height: 1,
			depth: 1,
			color: "#7a02e3",
			position: {
				x: -5 + (2 * i),
				e: 20,
				z: 0
			}
		})
		dices[i].gravity = -0.022
		dices[i].castShadow = true
		dices[i].receiveShadow = true
		scene.add(dices[i])
	}
	console.log(tabDiceAvail)
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
		clearDices()
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
	clearDices()
	rerollDice()
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

window.addEventListener('keydown', (event) => {
	switch (event.code) {
		case 'ArrowLeft':
		case 'KeyA':
			currentCursor--;
			moveCursor(-2)
			console.log("move cursor left")
			break
		case 'ArrowRight':
		case 'KeyD':
			currentCursor++;
			moveCursor(2)
			console.log("move cursor right")
			break
		case 'KeyR':
			console.log("reroll")
			rerollDice()
			break
		case 'Space':
			console.log("select die: ", currentCursor)
			console.log("selected value: ", tabDiceAvail[currentCursor])
			save()
			break
		case 'Enter':
			score()
			console.log("end turn")
			break
	}
})

function init()
{
	const contentElement = document.getElementById("content")
	
	console.log("radar")
	for (var i = 0; i < nbDice; i++)
	{
		tabDiceAvail[i] = Math.floor(Math.random() * (maxVal -minVal) + minVal)
		dices[i] = new Box({
			width: 1,
			height: 1,
			depth: 1,
			color: "#7a02e3",
			position: {
				x: -5 + (2 * i),
				e: 20,
				z: 0
			}
		})
		dices[i].gravity = -0.022
		dices[i].castShadow = true
		dices[i].receiveShadow = true
		scene.add(dices[i])
	}
	console.log(tabDiceAvail)
	playerCount = 0
	tabPlayer[0] = new Player("Cathan")
	tabPlayer[1] = new Player("Felix")
	currentPlayer = tabPlayer[Math.floor(Math.random() * 2)]
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
animate()
