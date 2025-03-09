import * as THREE from 'three';
import { loadObjModelWithMtl } from '../utils/MeshUtils.js'

export function Island1Scene() {
    const allObjects = new THREE.Group();
    const interactiveObjects = new THREE.Group();

    loadObjModelWithMtl( './assets/island_1/1base.obj', './assets/island_1/1base.mtl' )
        .then( ( object ) => {
            // const box = new THREE.Box3().setFromObject(object);
            // const center = box.getCenter(new THREE.Vector3());
            // object.position.sub(center);

            interactiveObjects.add( object );
        } )
        .catch( ( error ) => {
            console.error( 'Failed to load model:', error )
        } );

    loadObjModelWithMtl( './assets/island_1/2hub.obj', './assets/island_1/2hub.mtl' )
        .then( ( object ) => {
            interactiveObjects.add( object );
        } )
        .catch( ( error ) => {
            console.error( 'Failed to load model:', error )
        } );

    loadObjModelWithMtl( './assets/island_1/3island.obj', './assets/island_1/3island.mtl' )
        .then( ( object ) => {
            interactiveObjects.add( object );
        } )
        .catch( ( error ) => {
            console.error( 'Failed to load model:', error )
        } );

    loadObjModelWithMtl( './assets/island_1/4hub.obj', './assets/island_1/4hub.mtl' )
        .then( ( object ) => {
            interactiveObjects.add( object );
        } )
        .catch( ( error ) => {
            console.error( 'Failed to load model:', error )
        } );
    
    loadObjModelWithMtl( './assets/island_1/5island.obj', './assets/island_1/5island.mtl' )
        .then( ( object ) => {
            interactiveObjects.add( object );
        } )
        .catch( ( error ) => {
            console.error( 'Failed to load model:', error )
        } );

    loadObjModelWithMtl( './assets/island_1/6island.obj', './assets/island_1/6island.mtl' )
        .then( ( object ) => {
            interactiveObjects.add( object );
        } )
        .catch( ( error ) => {
            console.error( 'Failed to load model:', error )
        } );

    loadObjModelWithMtl( './assets/island_1/7island.obj', './assets/island_1/7island.mtl' )
        .then( ( object ) => {
            interactiveObjects.add( object );
        } )
        .catch( ( error ) => {
            console.error( 'Failed to load model:', error )
        } );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 10, 10, 1 );

    // allObjects.add( ambientLight );
    allObjects.add( directionalLight );
    allObjects.add( interactiveObjects );

    return { allObjects, interactiveObjects };
}
