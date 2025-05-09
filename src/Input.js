import * as THREE from 'three';
import SceneManager from './SceneManager.js';

const keyMap = new Map();
const raycaster = new THREE.Raycaster();
const prevMouse = new THREE.Vector2();
const mouseNDC = new THREE.Vector2();

const ROTATION_SENSITIVITY = 0.001;
let targetRotationX = 0.0, targetRotationY = 0.0;

function updateMouseNDC( event ) {
    // Project 2D mouse position to 3D space
    mouseNDC.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouseNDC.y = -( event.clientY / window.innerHeight ) * 2 + 1;
}

function updateTargetRotation( event ) {
    const dx = event.clientX - prevMouse.x;
    const dy = event.clientY - prevMouse.y;
    prevMouse.x = event.clientX;
    prevMouse.y = event.clientY;

    if ( keyMap.get( 'ShiftLeft' ) ) {
        // targetRotationX += dy;
        // targetRotationY += dx;
        targetRotationX = dy;
        targetRotationY = dx;
    }
}

export function onKeyDown( event ) {
    console.log( `Key pressed: ${ event.key }.` );
    keyMap.set( event.code, true );
}

export function onKeyUp( event ) {
    keyMap.set( event.code, false );
}

export function updateKeyboardMovement(camera, delta) {
    const NAVIGATE_STEP = SceneManager.getCurrentNavStep();
    const step = NAVIGATE_STEP * 100 * delta;  // scale step by frame time

    if (keyMap.get('KeyW')) camera.translateZ(-step);
    if (keyMap.get('KeyS')) camera.translateZ(step);
    if (keyMap.get('KeyA')) camera.translateX(-step);
    if (keyMap.get('KeyD')) camera.translateX(step);
    if (keyMap.get('KeyR')) camera.translateY(step);
    if (keyMap.get('KeyC')) camera.translateY(-step);
}

export function onMouseMove( event ) {
    updateMouseNDC( event );
    updateTargetRotation( event );
}

export function updateMouseMovement( camera ) {
    // if ( keyMap.get( 'ShiftLeft' )) camera.rotation.y = targetRotationY * ROTATION_SENSITIVITY;
    if ( keyMap.get( 'ShiftLeft' ) ) {
        // camera.rotation.x += targetRotationX * ROTATION_SENSITIVITY;
        camera.rotation.y += targetRotationY * ROTATION_SENSITIVITY;
    }
}

export function onMouseClick( event, camera ) {
    // raycaster.setFromCamera( mouse, camera );
    // const intersects = raycaster.intersectObjects( interactives.children );

    // if ( intersects.length > 0 ) {
    //     const clickedObject = intersects[ 0 ].object;
    //     console.log( 'Object clicked:', clickedObject );
    // }
}