import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

var sun
var mercery
var venus
var earth
var mars
var jupiter
var saturn
var uranus
var neptune

var merceryObj
var venusObj
var earthObj
var marsObj
var jupiterObj
var saturnObj
var uranusObj
var neptuneObj

// AU = Distance from Sun in astronomical units
const au = 1

// Parameters [3dModel, Model Path, Rotation Point (Primary), Distance from Sun (AU)]
let solarSystem = [
    [sun, "models/Sun.glb", null, null],
    [mercery, "models/Mercury.glb", merceryObj, 0.39 * au],
    [venus, "models/Venus.glb", venusObj, 0.72 * au],
    [earth, "models/Earth.glb", earthObj, au],
    [mars, "models/Mars.glb", marsObj, 1.52 * au],
    [jupiter, "models/Jupiter.glb", jupiterObj, 5.2 * au],
    [saturn, "models/Saturn.glb", saturnObj, 9.52 * au],
    [uranus, "models/Uranus.glb", uranusObj, 19.2 * au],
    [neptune, "models/Neptune.glb", neptuneObj, 30.09 * au],
]

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

function createPlanetObj(planetObj, planet, distanceFromPrimary) {
    // Creates a point for planets to rotate around in the scene
    planetObj = new THREE.Object3D();
    planetObj.add(planet);
    scene.add(planetObj)
    planet.position.x = distanceFromPrimary
}

loader.load(
    solarSystem[0][1],
    function (gltf) {
        gltf.scene.scale.set(0.001, 0.001, 0.001);
        solarSystem[0][0] = gltf.scene
        scene.add(solarSystem[0][0]);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

// createPlanetObj(solarSystem[1][3], solarSystem[1][0], 5)

camera.position.z = 5;

function animate() {
    // if (sun) sun.rotation.x += 0.01;
    if (solarSystem[0][0]) solarSystem[0][0].rotation.y += 0.01;

    renderer.render(scene, camera);
}
