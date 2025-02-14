import * as THREE from 'three';
import Cube from '../objects/CubeMesh.js';
import ImageBoardMesh from '../objects/ImageBoardMesh.js';
import SkydomeMesh from '../objects/GradientSkydome.js';
import { loadGltfModel } from '../utils/MeshUtils.js'
import TextBoardMesh from '../objects/TextBoardMesh.js';

const skydome = new SkydomeMesh();

export function EntryScene() {
    const allObjects = new THREE.Group();
    const interactiveObjects = new THREE.Group();

    const cube = new Cube( { position: [ 0, -1, -1 ] } );
    interactiveObjects.add( cube );

    const booImage = new ImageBoardMesh( {
        imagePath: './assets/textures/boo.png',
        width: 2,
        height: 2,
        position: [ 1, 0, -3 ]
    } );
    interactiveObjects.add( booImage );

    const acidImage = new ImageBoardMesh( {
        imagePath: './assets/textures/render10.png',
        width: 2,
        height: 2,
        position: [ -3, -3, -3 ]
    } );
    interactiveObjects.add( acidImage );
    
    const textBoard = new TextBoardMesh( {
        width: 3,
        height: 1,
        opacity: 0.7,
        text: 'sensecape',
        fontSize: 48,
        fontFamily: 'Arial',
        fontColor: '#FF0000',
        backgroundColor: '#FFFFFF',
        position: [ 3, 0, -3 ]
    } );
    interactiveObjects.add( textBoard );

    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );

    loadGltfModel({
        path: './assets/models/fantasy_sakura.glb',
        position: [ -1, 0, -3 ]
    } )
    .then( ( model ) => {
        interactiveObjects.add( model) ;
        console.log( 'Model loaded:', model );
    } )
    .catch( ( error ) => {
        console.error( 'Error loading model:', error );
    } );

    loadGltfModel({
        path: './assets/models/1.glb',
        position: [ -3, 1, -3 ],
        scale: [ 0.2, 0.2, 0.2]
    } )
    .then( ( model ) => {
        interactiveObjects.add( model) ;
        console.log( 'Model loaded:', model );
    } )
    .catch( ( error ) => {
        console.error( 'Error loading model:', error );
    } );

    allObjects.add( ambientLight );
    allObjects.add( skydome );
    allObjects.add( interactiveObjects );

    return { allObjects, interactiveObjects };
}

export function mainScreenUpdate(group) {
    group.children.forEach( (mesh) => {
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.005;
    } );
}

export function entrySceneAnimate() {
    skydome.material.uniforms.iTime.value = performance.now() * 0.001;
}
