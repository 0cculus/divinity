import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Box } from '../game/box.js'

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

/*class Box extends THREE.Mesh {
	constructor({
		width,
		height,
		depth,
		color = '#00ff00',
		velocity = {
			x: 0,
			y: 0,
			z: 0
		},
		position = {
			x: 0,
			y: 0,
			z: 0
		},
		zAcceleration = false
	}) {
		super(
			new THREE.BoxGeometry(width, height, depth),
			new THREE.MeshStandardMaterial({ color })
		)

		this.width = width
		this.height = height
		this.depth = depth

		this.position.set(position.x, position.y, position.z)

		this.right = this.position.x + this.width / 2
		this.left = this.position.x - this.width / 2

		this.bottom = this.position.y - this.height / 2
		this.top = this.position.y + this.height / 2

		this.front = this.position.z + this.depth / 2
		this.back = this.position.z - this.depth / 2

		this.velocity = velocity
		this.gravity = -0.022

		this.zAcceleration = zAcceleration
	}

	updateSides() {
		this.right = this.position.x + this.width / 2
		this.left = this.position.x - this.width / 2

		this.bottom = this.position.y - this.height / 2
		this.top = this.position.y + this.height / 2

		this.front = this.position.z + this.depth / 2
		this.back = this.position.z - this.depth / 2
	}

	update(ground) {
		this.updateSides()

		if (this.zAcceleration) this.velocity.z += 0.0003

		this.position.x += this.velocity.x
		this.position.z += this.velocity.z

		this.applyGravity(ground)
	}

	applyGravity(ground) {
		this.velocity.y += this.gravity

		// this is where we hit the ground
		if (
			boxCollision({
				box1: this,
				box2: ground
			})
		) {
			const friction = 0.5
			this.velocity.y *= friction
			this.velocity.y = -this.velocity.y
		} else this.position.y += this.velocity.y
	}
}

function boxCollision({ box1, box2 }) {
	const xCollision = box1.right >= box2.left && box1.left <= box2.right
	const yCollision =
		box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom
	const zCollision = box1.front >= box2.back && box1.back <= box2.front

	return xCollision && yCollision && zCollision
}*/


const minVal = 1
const maxVal = 6
var currentCursor = 0

var dices = new Array(6)
var diceValues = new Array(6)


function init()
{
	for (let i = 0; i < 6; i++)
	{
		dices[i] = new Box({
			width: 1,
			height: 1,
			depth: 1,
			color: "#7a02e3",
			position: {
				x: -5 + (2 * i),
				y: 20,
				z: 0
			}
		})
		dices[i].castShadow = true
		dices[i].receiveShadow = true
		scene.add(dices[i])
	
		diceValues[i] = Math.floor(Math.random() * (maxVal - minVal) + minVal)
	}
}
console.log(diceValues)

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

function reserveDice()
{
	dices[currentCursor].position.set(dices[currentCursor].position.x, dices[currentCursor].position.y, dices[currentCursor].position.z - 2) 
}

function clearDices()
{
	for (var i = 0; i < maxVal; i++)
		dices[i].kill()
	init()
}

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
		case 'Space':
			console.log("select die: ", currentCursor)
			console.log("selected value: ", diceValues[currentCursor])
			reserveDice()
			break
		case 'Enter':
			score()
			console.log("end turn")
			break
	}
})

const enemies = []

let frames = 0
let spawnRate = 200
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
	// cube.position.y += -0.01
	// cube.rotation.x += 0.01
	// cube.rotation.y += 0.01
}
init()
animate()
