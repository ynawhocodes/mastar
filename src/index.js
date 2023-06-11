import * as THREE from 'three'
import { AxesHelper } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)
  // axesHelper
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)
  // camera
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    4000
  )
  camera.position.set(0, 1000, 10)
  camera.lookAt(0, 0, 0)
  // renderer
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  // control
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.minDistance = 20
  controls.maxDistance = 800
  controls.update()
  // texture
  const texture_front = new THREE.TextureLoader().load('/static/star_front.jpg')
  const texture_back = new THREE.TextureLoader().load('/static/star_back.jpg')
  const texture_up = new THREE.TextureLoader().load('/static/star_up.jpg')
  const texture_down = new THREE.TextureLoader().load('/static/star_down.jpg')
  const texture_right = new THREE.TextureLoader().load('/static/star_right.jpg')
  const texture_left = new THREE.TextureLoader().load('/static/star_left.jpg')
  // mesh
  const skyGeometry = new THREE.BoxGeometry(400, 400, 400)
  const skyMaterialArray = []
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_front,
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_back,
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_up,
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_down,
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_right,
    })
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_left,
    })
  )
  for (let i = 0; i < 6; i++) {
    skyMaterialArray[i].side = THREE.BackSide
  }
  const sky = new THREE.Mesh(skyGeometry, skyMaterialArray)
  scene.add(sky)
  // light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)
  // animate
  function animate(time) {
    time *= 0.0001
    sky.rotation.x = time
    sky.rotation.y = time
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()
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
