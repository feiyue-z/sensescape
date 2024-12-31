import * as THREE from 'three';
import Cube from '../objects/Cube.js';
import ImageMesh from '../objects/ImageMesh.js';
import VideoMesh from '../objects/VideoMesh.js';

export function MainScene() {

    const cube = new Cube();
    const booImage = new ImageMesh( '../../assets/boo.png', [ 5, 5 ], [ 1, 1, 1 ] )

    const meshGroup = new THREE.Group();
    meshGroup.add(cube);
    meshGroup.add(booImage);

    const scene = new THREE.Scene();
    scene.add( meshGroup );

    return { scene, meshGroup };

}

export function mainScreenUpdate(group) {

    group.children.forEach((mesh) => {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
    });

}