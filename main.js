import * as THREE from 'three';
import { WebGPURenderer } from "three/webgpu";

import SceneManager from './src/SceneManager.js';
import { createVolumetricPostProcessing } from './src/objects/VolumetricFog.js';
import { onKeyDown, onKeyUp, onMouseMove, onMouseClick, updateKeyboardMovement, updateMouseMovement } from './src/Input.js';
import { initGUI } from './src/GUI.js';
import { BeyondProductsScene } from './src/scenes/BeyondProductsScene.js';
import { particleSystemInit, updateParticleSystem } from './src/ParticleSystem.js';
import { LobbyScene } from './src/scenes/LobbyScene.js';
import { BeyondSensesScene } from './src/scenes/BeyondSensesScene.js';
import { BeyondSpacesScene } from './src/scenes/BeyondSpacesScene.js';

import { ParticleTestScene } from './src/scenes/ParticleTestScene.js';

let camera, postProcessing;

export const mixers = [];

const clock = new THREE.Clock();

init();

function init() {
    // Set up camera
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 5000 );
    // camera.position.set( 0, 0.4, 0.5 );
    camera.position.set( -9.15, 20.89, 0.21 );
    camera.rotation.set( 0, -Math.PI / 2, 0 );

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

    // Initialize SceneManager and add scenes
    const scene = new THREE.Scene(); // Root container for 3D objects
    scene.background = new THREE.Color( 0x000000 );

    SceneManager.init( scene );
    SceneManager.addScene( 'lobby', new LobbyScene( listener ) );
    SceneManager.addScene( 'products', new BeyondProductsScene( listener ) );
    SceneManager.addScene( 'senses', new BeyondSensesScene( listener ) );
    SceneManager.addScene( 'spaces', new BeyondSpacesScene( listener ) );

    SceneManager.addScene('particles', new ParticleTestScene(listener));

    SceneManager.loadScene('lobby');

    particleSystemInit( scene );
    
    postProcessing = createVolumetricPostProcessing( renderer, scene, camera );

    // Listen to resize event
    window.addEventListener( 'resize', () => {
        // material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
        renderer.setSize( window.innerWidth, window.innerHeight );
        
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    } );

    // Listen to keyboard and mouse events
    document.addEventListener( 'keydown', ( event ) => onKeyDown( event ) );
    document.addEventListener( 'keyup', ( event ) => onKeyUp( event ) );
    document.addEventListener( 'mousemove', ( event ) => onMouseMove( event ) );
    // document.addEventListener( 'click', ( event ) => onMouseClick( event, camera ) );

    initGUI();
}

let lastcam = new THREE.Vector3();

function animate() {
    // const deltaTime = clock.getDelta();
    // const elapsed = clock.getElapsedTime();

    if ( !lastcam.equals( camera.position ) ) {
        console.log( camera.position );
        lastcam.copy( camera.position );
    }
    
    updateKeyboardMovement( camera );
    updateMouseMovement( camera );
    updateParticleSystem( camera );

    const delta = clock.getDelta();
    mixers.forEach( ( mixer ) => mixer.update( delta ) );

    SceneManager.animate( camera );
    if (postProcessing) {
        postProcessing.render();
    }
}