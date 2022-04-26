import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const testTexture=textureLoader.load('/textures/test_textures/coast_sand_rocks_02_diff_4k.jpg')


/**
 * House
 */
// Temporary sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial({ roughness: 0.7 })
)
sphere.position.y = 1
// scene.add(sphere)

// waterfall


const waterFall=new THREE.Mesh(
    new THREE.BoxGeometry(6,9,0),
    new THREE.MeshStandardMaterial({
        map:testTexture
        })
)
const waterFallFolder=gui.addFolder('waterfall')
waterFallFolder.add(waterFall.position,'x')
waterFallFolder.add(waterFall.position,'y')
waterFallFolder.add(waterFall.position,'z')
// const waterFallFolderSize=gui.addFolder('waterfall size')
// waterFallFolderSize.add(waterFall,'x')
// waterFallFolderSize.add(waterFall,'y')
// waterFallFolderSize.add(waterFall,'z')
scene.add(waterFall)


// waterfallWater

const waterFallWater=new THREE.Mesh(
    new THREE.PlaneGeometry(3,5,1),
    new THREE.MeshStandardMaterial
)
waterFallWater.position.y=2
waterFallWater.position.z=.001
// debug add

scene.add(waterFallWater)


// icoshearon
const icos=new THREE.Mesh(
    new THREE.IcosahedronGeometry(),
    new THREE.MeshStandardMaterial({
      
    })
    )
icos.position.y=2
icos.position.z=3
    scene.add(icos)
    const icosFolder=gui.addFolder('Icos Debugger')
    icosFolder.add(icos.rotation,'x').min(-10).max(10).step(.5)
    icosFolder.add(icos.rotation,'y').min(-10).max(10).step(.5)
    icosFolder.add(icos.rotation,'z').min(-10).max(10).step(.5)
    icosFolder.add(icos.position,'x').min(-10).max(10).step(.5)
    icosFolder.add(icos.position,'y').min(-10).max(10).step(.5)
    icosFolder.add(icos.position,'z').min(-10).max(10).step(.5)


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 10),
    new THREE.MeshStandardMaterial({   map:testTexture})
)
floor.rotation.x = - Math.PI * 0.5
floor.position.z = 4
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.5)
moonLight.position.set(0, 2, 5)
// debug
const lightFolder=gui.addFolder('lightFolder')
lightFolder.add(moonLight, 'intensity').min(0).max(1).step(0.001)
lightFolder.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
lightFolder.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
lightFolder.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// general light
// const light = new THREE.AmbientLight( 0x404040 ,2); // soft white light
// scene.add( light );
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
camera.position.y = 2
camera.position.z = 10

const camFolder=gui.addFolder('Cam')
camFolder.add(camera.position,'x').min(- 15).max(15).step(1)
camFolder.add(camera.position,'y').min(- 15).max(15).step(1)
camFolder.add(camera.position,'z').min(- 15).max(15).step(1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    icos.rotation.y= 0.2 * elapsedTime
    icos.rotation.x= 0.4 * elapsedTime
    icos.rotation.z= 0.2 * elapsedTime

    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()