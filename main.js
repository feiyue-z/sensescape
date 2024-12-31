import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { MainScene, mainScreenUpdate } from './src/scenes/MainScene.js';

const renderer = new THREE.WebGLRenderer();
renderer.xr.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );

document.body.appendChild( renderer.domElement );
document.body.appendChild( VRButton.createButton( renderer ) );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const { scene: mainScene, meshGroup } = MainScene();

function animate() {

    mainScreenUpdate(meshGroup);
    renderer.render( mainScene, camera );

}