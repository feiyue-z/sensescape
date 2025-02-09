import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { EntryScene, entrySceneAnimate } from './src/scenes/EntryScene.js';
import gsap from 'gsap';
import SceneManager from './src/SceneManager.js';

// Set up camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 5000 );
camera.position.set( 0, 2, 5 );

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.xr.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate ); // Start running animation loop

// Append DOM elements
document.body.appendChild( renderer.domElement );
document.body.appendChild( VRButton.createButton( renderer ) );

// Initialize SceneManager and add scenes
const scene = new THREE.Scene(); // Root container for 3D objects
const interactives = new THREE.Group();
const sceneManager = new SceneManager( scene, interactives );

// Add scenes
sceneManager.addScene( 'main', new EntryScene() );
sceneManager.loadScene( 'main' );
console.log('Scene after loading:', scene.children);

// Listen to keyboard and mouse events
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
document.addEventListener( 'keydown', ( event ) => onKeyDown( event ) );
document.addEventListener( 'click', ( event ) => onMouseClick( event ) );

// Listen to VR controller event
const controller = renderer.xr.getController( 0 ); // 0 or 1 for left/right controller
controller.addEventListener( 'selectstart', ( event ) => onSelectStart( event ) );
controller.addEventListener( 'selectend', ( event ) => onSelectEnd( event ) );
scene.add( controller );

function animate() {
    entrySceneAnimate();
    renderer.render ( scene, camera );
}

function onKeyDown( event ) {
    console.log( `Key pressed: ${ event.key }.` );

    // TODO: wait for designers to decide if we want animation for keyboard movement
    switch ( event.key ) {
        case 'w':
            // camera.translateZ( -0.5 );
            gsap.to( camera.position, {
                duration: 0.5,
                z: camera.position.z - 1.0,
                ease: "power2.inOut" 
            } )
            break;
        case 's':
            camera.translateZ( 0.5 );
            break;
        case 'a':
            camera.translateX( -0.5 );
            break;
        case 'd':
            camera.translateX( 0.5 );
            break;
    }
}

function onMouseClick( event ) {
    // Convert to normalized device coordinates
    // where the range of x and y is [-1, 1]
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( interactives.children );

    if ( intersects.length > 0 ) {
        const clickedObject = intersects[ 0 ].object;
        console.log( 'Object clicked:', clickedObject );

        gsap.to( clickedObject.rotation, { 
            duration: 2, 
            x: Math.PI * 2, 
            repeat: -1, 
            ease: "power2.inOut" 
        } );
        
        gsap.to( clickedObject.position, { 
            duration: 2, 
            y: 2, 
            yoyo: true, 
            repeat: -1, 
            ease: "sine.inOut" 
        } );

        // Reposition the scene to center
        // the clicked object in the camera view
        gsap.to( scene.position, { 
            duration: 1, 
            x: -clickedObject.position.x, 
            z: -clickedObject.position.z, 
            ease: "power2.inOut" 
        } );
    }
}

// TODO:
function onSelectStart( event ) {

}

// TODO:
function onSelectEnd( event ) {

}