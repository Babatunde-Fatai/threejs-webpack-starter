import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

console.log();
// Scene
const scene = new THREE.Scene()

//loader
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('./textures/NormalMap.jpg');


// const Texture = textureLoader.load('https://raw.github.com/Babatunde-Fatai/Babylon-Assets/main/textures/2k_earth_daymap.jpg');


// Objects
const geometry = new THREE.SphereGeometry( .7, 16, 16);

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7;
material.roughness = 0.3;
material.normalMap = normalTexture;
//material.map = Texture;
material.color = new THREE.Color(0xff0000)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Plane
const planeGeometry = new THREE.PlaneGeometry( 3, 3, 64, 64);

const planeMat = new THREE.MeshStandardMaterial({
    color: 'grey',

});

const plane = new THREE.Mesh(planeGeometry);
scene.add(plane);

gui.add(plane.position, 'z', 0, 600, 1)
// Light 1

const pointLight1 = new THREE.PointLight(0xffffff, 0.05)
//pointLight1.position.set(1, 1, 1);
pointLight1.position.set(-1.86, 1, -6.5);
pointLight1.intensity = 5.2
scene.add(pointLight1)

//gui debugger
const light1 = gui.addFolder('light 1')
light1.add(pointLight1.position, 'y', -3, 3, 0.01)
light1.add(pointLight1.position, 'x', -6, 6, 0.01)
light1.add(pointLight1.position, 'z', -3, 3, 0.01)
light1.add(pointLight1, 'intensity', 0, 10, 0.01)

//orbit control

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', renderer);


//color debugger
const light1color = {
    color: 0xff0000
}

light1.addColor(light1color, 'color')
    .onChange (() => {
       pointLight1.color.set(light1color.color)
    })
    

// const lightHelper1 = new THREE.PointLightHelper(pointLight1, 2)
// scene.add(lightHelper1);

// Light 2
const pointLight2 = new THREE.PointLight(0x0000ff, 0)
pointLight2.position.set(2.13, -3, -1.98);
pointLight2.intensity = 6.8
scene.add(pointLight2)

const light2 = gui.addFolder('light 2')
light2.add(pointLight2.position, 'y', -3, 3, 0.01)
light2.add(pointLight2.position, 'x', -6, 6, 0.01)
light2.add(pointLight2.position, 'z', -3, 3, 0.01)
light2.add(pointLight2, 'intensity', 0, 10, 0.01)

//color debugger
const light2color = {
    color: 0xff0000
}

light2.addColor(light2color, 'color')
    .onChange (() => {
       pointLight2.color.set(light2color.color)
})




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove);


let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

function onDocumentScroll (event) {
   sphere.position.y = window.scrollY * .001;
}

window.addEventListener('scroll', onDocumentScroll)

//Skybox

// let materialArray = [];

// let texture_ft = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/Playground/textures/Space/space_left.jpg');
// let texture_bk = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/Playground/textures/Space/space_up.jpg');
// let texture_up = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/Playground/textures/Space/space_front.jpg');
// let texture_dn = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/Playground/textures/Space/space_right.jpg');
// let texture_rt = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/Playground/textures/Space/space_down.jpg');
// let texture_lf = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/Playground/textures/Space/space_back.jpg');


// materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
// materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
// materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
// materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
// materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
// materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
   
// for (let i = 0; i < 6; i++)
//   materialArray[i].side = THREE.BackSide;
   
// let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
// let skybox = new THREE.Mesh( skyboxGeo, materialArray );
// scene.add( skybox );

const clock = new THREE.Clock()


const tick = () =>
{

    


    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    //mouse object interaction

    targetX = mouseX * .001
    targetY = mouseY * .001

    sphere.rotation.x += .5 * (targetY -  sphere.rotation.x)
    sphere.rotation.y += .5 * (targetX -  sphere.rotation.y)
    sphere.position.y += .5 * (targetY -  sphere.rotation.x)

    //orbit control update
    //controls.update();

    // Update Orbital Controls
     //controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick();