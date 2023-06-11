import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)
  // camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 2
  // renderer
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  // mesh 01
  const geometry01 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material01 = new THREE.MeshStandardMaterial({ color: 0xff6200 })
  const cube01 = new THREE.Mesh(geometry01, material01)
  cube01.position.x = -1
  scene.add(cube01)
  // mesh 02
  const geometry02 = new THREE.SphereGeometry(0.5, 0.5, 0.5)
  const material02 = new THREE.MeshStandardMaterial({ color: 0xff6200 })
  const cube02 = new THREE.Mesh(geometry02, material02)
  scene.add(cube02)
  // mesh 03
  const geometry03 = new THREE.ConeGeometry(0.4, 0.7, 6)
  const material03 = new THREE.MeshStandardMaterial({ color: 0xff6200 })
  const cube03 = new THREE.Mesh(geometry03, material03)
  scene.add(cube03)
  cube03.position.x = +1

  function render(time) {
    time *= 0.0005 // convert time to seconds

    cube01.rotation.x = time
    cube01.rotation.y = time
    cube02.rotation.x = time
    cube02.rotation.y = time
    cube03.rotation.x = time
    cube03.rotation.y = time
    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  // resize
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
