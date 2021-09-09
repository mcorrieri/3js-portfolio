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
const material = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true,
});
const torusKnot = new THREE.Mesh(geometry, material);

scene.add(torusKnot);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
