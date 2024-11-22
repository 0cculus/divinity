import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const ratio = 1
const container = document.getElementById("gameContainer");

export const scene = new THREE.Scene()
export const camera = new THREE.PerspectiveCamera(
  75,
  1,
  0.1,
  1000
)

export const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
})

let newW = container.clientWidth / ratio
let newH = container.clientHeight / ratio
let size = newH > newW ? newW : newH

export function forceScale() {
 
    let newW = container.clientWidth / ratio
    let newH = container.clientHeight / ratio
    size = newH > newW ? newW : newH
    renderer.setSize(size, size)
    camera.aspect = 1
    camera.updateProjectionMatrix()
}

window.addEventListener('resize', function( ) {

  let newW = container.clientWidth / ratio
  let newH = container.clientHeight / ratio
  size = newH > newW ? newW : newH
  renderer.setSize(size, size)
  camera.aspect = 1
  camera.updateProjectionMatrix()
} )

renderer.shadowMap.enabled = true
renderer.setSize(size / ratio, size / ratio)
container.appendChild(renderer.domElement)
export const controls = new OrbitControls(camera, renderer.domElement)

export function SetCamMode(mode) {
  controls.enableRotate = mode
  controls.enablePan    = mode
  controls.enableZoom   = mode
}

export function Draw() {
  renderer.render(scene, camera)
}
