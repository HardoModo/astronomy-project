import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

var sun

const scene = new THREE.Scene();
const loader = new GLTFLoader();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

loader.load(
    `models/Sun.glb`,
    function (gltf) {
        gltf.scene.scale.set(0.001, 0.001, 0.001);
        sun = gltf.scene
        scene.add(sun);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

camera.position.z = 5;

function animate() {
    // if (sun) sun.rotation.x += 0.01;
    if (sun) sun.rotation.y += 0.01;

    renderer.render(scene, camera);
}
