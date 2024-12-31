import * as THREE from 'three';
import Cube from '../objects/Cube.js';
import ImageMesh from '../objects/ImageMesh.js';
import VideoMesh from '../objects/VideoMesh.js';
import { loadGltfModel } from '../utils/MeshUtils.js'

export function MainScene() {

    const scene = new THREE.Scene();
    const meshGroup = new THREE.Group();

    const cube = new Cube( [ 0, 3, 0 ] );
    const booImage = new ImageMesh( '../../assets/boo.png', [ 1, 1 ], [ 1, 1, 1 ] );

    loadGltfModel('../../assets/scene.gltf')
    .then( ( model ) => {
        // meshGroup.add( model );
        scene.add( model );
        console.log( 'Model loaded:', model );
    })
    .catch( ( error ) => {
        console.error( 'Error loading model:', error );
    });

    const light = new THREE.AmbientLight( 0xFFFFFF );

    meshGroup.add(cube);
    meshGroup.add(booImage);

    scene.add( meshGroup );
    scene.add( light );

    return { scene, meshGroup };

}

export function mainScreenUpdate(group) {

    group.children.forEach((mesh) => {
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.005;
    });

}