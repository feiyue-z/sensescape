import * as THREE from 'three';

export default function Cube( position = [ 0, 0, 0 ] ) {

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(...position);

    return cube;

}