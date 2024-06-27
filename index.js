import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
const au = 50

// Scale of planets compared to the sun
const sunScale = 0.005
const largeScale = sunScale * .7
const mediumScale = sunScale * .5
const smallScale = sunScale * .3

// Orbit Speed in Earth days
const orbitSpeedScale = 1

// Rotation Speed in Earth hours
const rotationSpeedScale = .00001

// Parameters [3dModel, Model Path, Rotation Point (Primary), Distance from Sun (AU), planet size, orbit speed, rotation speed]
let solarSystem = [
    [sun, "models/Sun.glb", null, null, sunScale, null, rotationSpeedScale * 24 * 25],
    [mercery, "models/Mercury.glb", merceryObj, 0.39 * au, smallScale, orbitSpeedScale * 88, rotationSpeedScale * 24 * 58.6],
    [venus, "models/Venus.glb", venusObj, 0.72 * au, smallScale, orbitSpeedScale * 225, rotationSpeedScale * 24 * -243],
    [earth, "models/Earth.glb", earthObj, au, smallScale, orbitSpeedScale * 365, rotationSpeedScale * 24],
    [mars, "models/Mars.glb", marsObj, 1.52 * au, smallScale, orbitSpeedScale * 687, rotationSpeedScale * 24.6],
    [jupiter, "models/Jupiter.glb", jupiterObj, 5.2 * au, largeScale, orbitSpeedScale * 365 * 11.86, rotationSpeedScale * 9.9],
    [saturn, "models/Saturn.glb", saturnObj, 9.52 * au, largeScale, orbitSpeedScale * 365 * 29.46, rotationSpeedScale * 10.7],
    [uranus, "models/Uranus.glb", uranusObj, 19.2 * au, mediumScale, orbitSpeedScale * 365 * 84.01, rotationSpeedScale * -17.2],
    [neptune, "models/Neptune.glb", neptuneObj, 30.09 * au, mediumScale, orbitSpeedScale * 365 * 164.8, rotationSpeedScale * 16.1],
]

const scene = new THREE.Scene();
const loader = new GLTFLoader();

const light = new THREE.AmbientLight( 0xffffff );
scene.add( light );

// Try adding a point light centered in the sun later
// const pointLight = new THREE.PointLight(0xffffff , 2, 30000);
// scene.add( pointLight );

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

var controls = new OrbitControls( camera, renderer.domElement );

loader.load(
    solarSystem[0][1],
    function (gltf) {
        gltf.scene.scale.set(sunScale, sunScale, sunScale);
        solarSystem[0][0] = gltf.scene
        scene.add(solarSystem[0][0]);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

function addPlanets(arrayKey) {
    loader.load(
        solarSystem[arrayKey][1], 
        function (gltf) {
            gltf.scene.scale.set(solarSystem[arrayKey][4], solarSystem[arrayKey][4], solarSystem[arrayKey][4]);
            solarSystem[arrayKey][0] = gltf.scene

            solarSystem[arrayKey][2] = new THREE.Object3D();
            solarSystem[arrayKey][2].add(solarSystem[arrayKey][0]);

            scene.add(solarSystem[arrayKey][2]);
            solarSystem[arrayKey][0].position.x = solarSystem[arrayKey][3]
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
}

function setOrbit(arrayKey) {
    if (solarSystem[arrayKey][0]) solarSystem[arrayKey][0].rotation.y += solarSystem[arrayKey][5];
}

function setRotation(arrayKey) {
    if (solarSystem[arrayKey][2]) solarSystem[arrayKey][2].rotation.y += solarSystem[arrayKey][6];
}

for (let i = 1; i < solarSystem.length; i++) {
    addPlanets(i);
  }

camera.position.z = 50;
controls.update();

function animate() {
    if (solarSystem[0][0]) solarSystem[0][0].rotation.y += solarSystem[0][6];
    for (let i = 1; i < solarSystem.length; i++) {
        setOrbit(i);
        setRotation(i);
      }

    renderer.render(scene, camera);
}

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
})