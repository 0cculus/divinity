import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const ratio = 1.5

export const scene = new THREE.Scene()
export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

export const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
})

const container = document.getElementById("gameElement");

window.addEventListener('resize', function( ) {
  const newW = container.clientWidth / ratio
  const newH = container.clientHeight / ratio
  renderer.setSize(newW, newH)
  camera.aspect = newW / newH
  camera.updateProjectionMatrix()
} )

renderer.shadowMap.enabled = true
renderer.setSize(container.clientWidth / ratio, container.clientHeight / ratio)
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
