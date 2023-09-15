import * as THREE from "three";
import { AxesHelper } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { WEBGL } from "./webgl";

if (WEBGL.isWebGLAvailable()) {
  // fog
  const FogColor = 0xffffff;
  const objColor = 0xffffff;
  const FloorColor = 0x555555;
  
  // scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(objColor);
  scene.fog = new THREE.Fog(FogColor, 1, 80);
  scene.fog = new THREE.FogExp2(FogColor, 0.00035);

  // axesHelper
  // const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)

  // camera
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    4000
  );
  camera.position.set(0, 1000, 10);
  camera.lookAt(0, 0, 0);

  // floor
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.5;
  // scene.add(plane)

  // renderer
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // control
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 10;
  controls.maxDistance = 1000;
  controls.update();

  let texture_front = new THREE.TextureLoader().load(
    "./static/textures/meadow/meadow_front.jpg"
  );
  let texture_back = new THREE.TextureLoader().load(
    "./static/textures/meadow/meadow_back.jpg"
  );
  let texture_up = new THREE.TextureLoader().load(
    "./static/textures/meadow/meadow_up.jpg"
  );
  let texture_down = new THREE.TextureLoader().load(
    "./static/textures/meadow/meadow_down.jpg"
  );
  let texture_right = new THREE.TextureLoader().load(
    "./static/textures/meadow/meadow_right.jpg"
  );
  let texture_left = new THREE.TextureLoader().load(
    "./static/textures/meadow/meadow_left.jpg"
  );

  // mesh
  let skyGeometry = new THREE.BoxGeometry(500, 500, 500);
  let skyMaterialArray = [];
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_front,
    })
  );
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_back,
    })
  );
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_up,
    })
  );
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_down,
    })
  );
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_right,
    })
  );
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_left,
    })
  );
  for (let i = 0; i < 6; i++) {
    skyMaterialArray[i].side = THREE.BackSide;
  }
  const sky = new THREE.Mesh(skyGeometry, skyMaterialArray);
  scene.add(sky);

  let buttonValue = null;

  document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.getElementsByClassName("type__button");

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        for (let j = 0; j < buttons.length; j++) {
          buttons[j].style.backgroundColor = "";
          buttons[j].style.color = "";
        }

        this.style.backgroundColor = "#ff5733";
        this.style.color = "#fff";

        buttonValue = this.value;
        if (buttonValue === "DAY") {
          addDayStyles();
          console.log("DAY 버튼을 클릭하셨습니다~~!");
          console.log("DAYYY");
          texture_front = new THREE.TextureLoader().load(
            "./static/textures/meadow/meadow_front.jpg"
          );
          texture_back = new THREE.TextureLoader().load(
            "./static/textures/meadow/meadow_back.jpg"
          );
          texture_up = new THREE.TextureLoader().load(
            "./static/textures//meadow/meadow_up.jpg"
          );
          texture_down = new THREE.TextureLoader().load(
            "./static/textures/meadow/meadow_down.jpg"
          );
          texture_right = new THREE.TextureLoader().load(
            "./static/textures/meadow/meadow_right.jpg"
          );
          texture_left = new THREE.TextureLoader().load(
            "./static/textures/meadow/meadow_left.jpg"
          );
          let skyMaterialArray = [];
          skyMaterialArray.push(
            new THREE.MeshStandardMaterial({
              map: texture_front,
            })
          );
          skyMaterialArray.push(
            new THREE.MeshStandardMaterial({
              map: texture_back,
            })
          );
          skyMaterialArray.push(
            new THREE.MeshStandardMaterial({
              map: texture_up,
            })
          );
          skyMaterialArray.push(
            new THREE.MeshStandardMaterial({
              map: texture_down,
            })
          );
          skyMaterialArray.push(
            new THREE.MeshStandardMaterial({
              map: texture_right,
            })
          );
          skyMaterialArray.push(
            new THREE.MeshStandardMaterial({
              map: texture_left,
            })
          );
          for (let i = 0; i < 6; i++) {
            skyMaterialArray[i].side = THREE.BackSide;
          }


        } else if (buttonValue === "FANTASY") {
          console.log("FANTASY 버튼을 클릭하셨습니다!");
          addDayStyles();
        } else if (buttonValue === "NIGHT") {
          addNightStyles();
          console.log("NIGHT 버튼을 클릭하셨습니다!");
        }
      });
    }
  });

  // light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  // animate
  function animate(time) {
    time *= 0.0001;
    sky.rotation.x = time;
    sky.rotation.y = time;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // resize
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", onWindowResize);
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}

function addDayStyles() {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
      * {
          background-color: inherit;
      }
  `;
  document.head.appendChild(style);
}

function addNightStyles() {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
      * {
          background-color: white;
          // mix-blend-mode: difference;
      }
  `;
  document.head.appendChild(style);
}
