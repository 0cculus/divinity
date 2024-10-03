import * as THREE from 'three'
import { Box } from './box.js'
import { scene, camera, Draw } from './render.js'
import { keys } from './keybord.js'
import { initGame } from './game.js'
import { Text } from './text.js'
import { MODEL3D } from './Import3D.js'


import { GameData } from './gameSetting.js'
import { Tournament } from './tournament.js'


export let output =  []
let MenuLight     =  []
let MenuObj       =  []
let MenuText      =  []
let Decord        =  []
let Loop          =  1
let on            =  false
let menuChoice    =  3

function AddButton(p, layer) {
  MenuObj[layer] = new Box({
    width: 0.1,
    height: 2,
    depth: 4,
    velocity: {
      x: 0,
      y: 0,
      z: 0
    },
    position: p
  })
}

const  newGamedata       =   new GameData
const  newTrounemanData  =   new Tournament

//const followText = document.getElementById('follow-text')
//const canvas = document.querySelector('canvas')
//const boxPosition = new THREE.Vector3()

function MoveArrow(x, y, z) {
  //87
  MenuObj[3].position.set(x, y, z)
  MenuObj[4].position.set(x, y, z - 0.87)
}

export async function initMenu(gameData, TournamentData) {
  newGamedata.copy(gameData)
  newTrounemanData.copy(TournamentData)
  let i = 0
  console.log("A")
  newGamedata.setCallBack(initMenu)
  for (let index = -30; index < 30; index += 10) {
    Decord[i++] = new MODEL3D(scene, {x:-10, y:-3, z:index}, [5,5,5])
  }
  MenuText[0] = new Text(scene, {x:0, y:0, z:0}, 'Play', 'yellow')
  MenuText[0].rotate(0, 90, 0)
  MenuText[0].move(0.7, 3, 0.4)
  MenuText[0].updateSize(1, 0.1, 12)
  on = false
  MenuLight[0] = new THREE.DirectionalLight(0xffffff, 3)
  MenuLight[1] = new THREE.AmbientLight(0xffffff, 0.7)
  MenuLight[0].position.y = 3
  MenuLight[0].position.z = 1
  MenuLight[0].castShadow = true
  Loop = 1
  AddButton({x:0, y:0, z:0}, 0)
  AddButton({x:0, y:3, z:0}, 1)
  AddButton({x:0, y:-3, z:0}, 2)
  MenuObj[3] = new Box({
    width: 0.1,
    height: 0.3,
    depth: 2,
    color: 'yellow',
    velocity: {
      x: 0,
      y: 0,
      z: 0
    },
    position: {
      x:  0,
      y: -3,
      z:  5
    }
  })
  MenuObj[4] = new Box({
    width: 0.1,
    height: 0.5,
    depth: 0.5,
    color: 'yellow',
    velocity: {
      x: 0,
      y: 0,
      z: 0
    },
    position: {
      x:  0,
      y: -3,
      z:  4.13
    }
  })
  MenuObj[4].rotation.x = 7
  MenuObj.forEach(obj => {
    obj.receiveShadow = true
    scene.add(obj)
  })
  MenuLight.forEach(light => {
    scene.add(light)
  })
  camera.position.set(10, 0, 0)
  MoveArrow(0, menuChoice, 4)
  MainMenu()
}

async function LeaveMenu() {
  MenuLight.forEach(light => {
    scene.remove(light)
    light.dispose()
  })
  MenuObj.forEach(obj => {
    scene.remove(obj)
    obj.kill()
  })
  MenuText.forEach(txt => {
    txt.kill()
  })
  Decord.forEach(obj => {
    obj.kill()
  })
}

function MenuInput() {
  if (keys.a.pressed && !on) {
    menuChoice += 3
    if (menuChoice > 3)
      menuChoice = -3
    MoveArrow(0, menuChoice, 4)
    on = true
  }
  if (keys.d.pressed && !on) {
    menuChoice -= 3
    if (menuChoice < -3)
      menuChoice = 3
    MoveArrow(0, menuChoice, 4)
    on = true
  }
  if (!keys.d.pressed && !keys.a.pressed)
    on = false
}

async function MainMenu() {
  MenuInput()
  if (keys.Enter.pressed) {
    switch (menuChoice) {
      case 3:
        Loop = 0
        // min 7 | 20 max to make it playable / def 10
        await initGame(newGamedata, newTrounemanData)
        //        ^
        // game size
        break;
        default:
          break;
        }
      }
      camera.lookAt(MenuObj[0].position)
      if (Loop) {
        Draw()
        requestAnimationFrame(MainMenu)
      } else {
        await LeaveMenu()
    }
}