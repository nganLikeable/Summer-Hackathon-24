import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer, cup;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 30;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const loader = new GLTFLoader();
  loader.load(
    "./coffee_shop_cup.glb",
    function (gltf) {
      cup = gltf.scene;
      cup.scale.set(10, 10, 10);
      scene.add(cup);
    },
    undefined,
    function (error) {
      console.error(error);
    },
  );

  animate();

  const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light at full intensity
  directionalLight.position.set(5, 5, 5).normalize(); // Position the light
  scene.add(directionalLight);
}

function animate() {
  requestAnimationFrame(animate);
  if (cup) {
    cup.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}

init();