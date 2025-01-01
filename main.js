import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { MainScene, mainScreenUpdate } from './src/scenes/MainScene.js';

// Set up camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 2, 5 );

// Set up main scene
const { scene: mainScene, meshGroup } = MainScene();
const stage = new THREE.Group();
stage.add( ...mainScene.children ) // `mainScene` is now empty as objects are moved to `stage`
mainScene.add( stage ) // `stage` is now a child of `mainScene`

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.xr.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );

// Append DOM elements
document.body.appendChild( renderer.domElement );
document.body.appendChild( VRButton.createButton( renderer ) );

// Set and start running animation loop
renderer.setAnimationLoop( animate );

// Add event listeners
const interactiveObjects = meshGroup.children;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
document.addEventListener( 'keydown', ( event ) => keyboardHandler( event ) );
document.addEventListener( 'click', ( event ) => mouseHandler( event ) );

function animate() {

    // mainScreenUpdate( meshGroup );
    renderer.render( mainScene, camera );

}

function keyboardHandler( event ) {

    console.log(`Key pressed: ${ event.key }`);

    if (event.key === 'w') {

        camera.translateZ( -0.5 );

    } else if (event.key === 's') {

        camera.translateZ( 0.5 );

    }
    
}

function mouseHandler( event ) {

    // Convert to normalized device coordinates
    // where the range of x and y is [-1, 1]
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    const intersects = raycaster.intersectObjects( interactiveObjects );
    if ( intersects.length > 0 ) {

        const clickedObject = intersects[0].object;
        console.log('Clicked object:', clickedObject);
        clickedObject.material.color.set(0xff0000);

        // Reposition the stage to center the clicked object in the camera view
        stage.position.x = -clickedObject.position.x;
        stage.position.z = -clickedObject.position.z;

    }

}