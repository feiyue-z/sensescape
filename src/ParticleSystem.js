import * as THREE from 'three';

const group = new THREE.Group();

export function particleSystemInit( scene ) {
    const geometry = new THREE.SphereGeometry( 1, 32, 32 ); // radius, width segments, height segments
    const material = new THREE.MeshStandardMaterial( { color: 0x0077ff } );
    const sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
}

export function updateParticleSystem() {

}