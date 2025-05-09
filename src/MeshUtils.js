import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export function loadGltfModel( path, options = {} ) {
    const {
        position = [ 0, 0, 0 ],
        scale = [ 1, 1, 1 ]
    } = options;

    return new Promise( ( resolve, reject ) => {
        const loader = new GLTFLoader();
        loader.load(
            path,
            ( gltf ) => {
                gltf.scene.position.set( ...position );
                gltf.scene.scale.set( ...scale );

                gltf.scene.traverse( ( child ) => {
                    if ( child.isMesh ) {
                        child.material = new THREE.MeshStandardMaterial( { map: child.material.map } );
                    }
                } );

                resolve( gltf.scene );
            },
            undefined,
            ( error ) => {
                reject( error );
            }
        );
    } );
}

export function loadDracoGltfModel( path, options = {} ) {
    const {
        position = [ 0, 0, 0 ],
        scale = [ 1, 1, 1 ]
    } = options;

    return new Promise( ( resolve, reject ) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );

        const loader = new GLTFLoader();
        loader.setDRACOLoader( dracoLoader );
        loader.load(
            path,
            ( gltf ) => {
                gltf.scene.position.set( ...position );
                gltf.scene.scale.set( ...scale );

                gltf.scene.traverse( ( child ) => {
                    if ( child.isMesh ) {
                        child.material = new THREE.MeshStandardMaterial( { map: child.material.map } );
                    }
                } );

                resolve( gltf.scene );
            },
            undefined,
            ( error ) => {
                reject( error );
            }
        );
    } );
}