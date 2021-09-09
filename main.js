import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
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

renderer.render(scene, camera);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({
  color: "orange",
  //   wireframe: true,
});
const torusKnot = new THREE.Mesh(geometry, material);

scene.add(torusKnot);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambLight);

// wireframe pointers
const lightHelp = new THREE.PointLightHelper(pointLight);
const gridHelp = new THREE.GridHelper(200, 50);
scene.add(lightHelp, gridHelp);

function animate() {
  requestAnimationFrame(animate);

  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.005;
  torusKnot.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
