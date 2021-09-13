import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#background"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 70, 16);
const material = new THREE.MeshStandardMaterial({
  color: "green",
  //   wireframe: true,
});
const torusKnot = new THREE.Mesh(geometry, material);

scene.add(torusKnot);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambLight);

// wireframe pointers
// const lightHelp = new THREE.PointLightHelper(pointLight);
// const gridHelp = new THREE.GridHelper(200, 50);
// scene.add(lightHelp, gridHelp);

// pointer control
const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("galaxy.jpeg");
scene.background = spaceTexture;

// mike cube
const mikeTexture = new THREE.TextureLoader().load("34900.jpeg");
const mike = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: mikeTexture })
);

scene.add(mike);

mike.position.z = -5;
mike.position.setX(2);

// mars
const marsTexture = new THREE.TextureLoader().load("marsview.jpeg");
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: marsTexture })
);

scene.add(mars);

mars.position.z = -5;
mars.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  mars.rotation.x += 0.005;
  mars.rotation.y += 0.075;
  mars.rotation.z += 0.015;

  mike.rotation.y += 0.01;
  mike.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.y = t * -0.0002;
  camera.position.x = t * -0.0002;
}
document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.005;
  torusKnot.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
