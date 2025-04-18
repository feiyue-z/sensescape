import * as THREE from 'three';

const keyMap = new Map();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const STEP = 0.005;
const ROTATION_SENSITIVITY = 0.3;

let targetRotationY = 0.0;

export function onKeyDown( event ) {
    console.log( `Key pressed: ${ event.key }.` );
    keyMap.set( event.code, true );
}

export function onKeyUp( event ) {
    keyMap.set( event.code, false );
}

export function updateKeyboardMovement( camera ) {
    if ( keyMap.get( 'KeyW' ) ) camera.translateZ( -STEP );
    if ( keyMap.get( 'KeyS' ) ) camera.translateZ(  STEP );
    if ( keyMap.get( 'KeyA' ) ) camera.translateX( -STEP );
    if ( keyMap.get( 'KeyD' ) ) camera.translateX(  STEP );
}

export function onMouseMove( event ) {
    const normalizedX = ( event.clientX / window.innerWidth ) * 2 - 1;
    targetRotationY = normalizedX * Math.PI; // Rotate based on mouse X position
}

export function updateMouseMovement( camera ) {
    if ( keyMap.get( 'ShiftLeft' )) camera.rotation.y = targetRotationY * ROTATION_SENSITIVITY;
}

export function onMouseClick( event, camera ) {
    // Convert to normalized device coordinates
    // where the range of x and y is [-1, 1]
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    // const intersects = raycaster.intersectObjects( interactives.children );

    // if ( intersects.length > 0 ) {
    //     const clickedObject = intersects[ 0 ].object;
    //     console.log( 'Object clicked:', clickedObject );
    // }
}