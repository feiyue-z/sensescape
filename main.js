import * as THREE from 'three';
import { WebGPURenderer } from "three/webgpu";
// import { VRButton } from 'three/addons/webxr/VRButton.js';

import SceneManager from './src/SceneManager.js';
import { createVolumetricPostProcessing } from './src/objects/VolumetricFog.js';
import { onKeyDown, onKeyUp, onMouseClick, updateKeyboardMovement } from './src/Input.js';
import { initGUI } from './src/GUI.js';
import { LightingTestScene } from './src/scenes/LightingTestScene.js';
import { BeyondProductsScene } from './src/scenes/BeyondProductsScene.js';

let camera, postProcessing;

init();

function init() {
    // Set up camera
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 5000 );
    camera.position.set( 0, 2, 5 );

    // Add audio listener
    const listener = new THREE.AudioListener();
    camera.add( listener );

    // Set up renderer
    const renderer = new WebGPURenderer();
    renderer.xr.enabled = true;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate );
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 2;
    renderer.shadowMap.enabled = true;

    // Append DOM elements
    document.body.appendChild( renderer.domElement );
    // document.body.appendChild( VRButton.createButton( renderer ) );

    // Initialize SceneManager and add scenes
    const scene = new THREE.Scene(); // Root container for 3D objects
    // scene.background = new THREE.Color( 0x000000 );

    SceneManager.init( scene );
    SceneManager.addScene( 'test', new LightingTestScene( listener ) );
    SceneManager.addScene( 'dummy', new BeyondProductsScene() );
    SceneManager.loadScene( 'test' );

    //
    postProcessing = createVolumetricPostProcessing( renderer, scene, camera );

    // Listen to keyboard and mouse events
    document.addEventListener( 'keydown', ( event ) => onKeyDown( event ) );
    document.addEventListener( 'keyup', ( event ) => onKeyUp( event ) );
    document.addEventListener( 'click', ( event ) => onMouseClick( event, camera ) );

    // Listen to VR controller event
    // const controller = renderer.xr.getController( 0 );
    // controller.addEventListener( 'selectstart', ( event ) => onSelectStart( event ) );
    // controller.addEventListener( 'selectend', ( event ) => onSelectEnd( event ) );
    // scene.add( controller );

    initGUI();
}

// const clock = new THREE.Clock();

function animate() {
    // const deltaTime = clock.getDelta();
    updateKeyboardMovement( camera );
    SceneManager.animate( camera );
    postProcessing.render();
}