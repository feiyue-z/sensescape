import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export function loadGltfModel( options = {} ) {
    const {
        path,
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

                gltf.scene.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({ map: child.material.map });
                    }
                });

                resolve( gltf.scene );
            },
            undefined,
            ( error ) => {
                reject( error );
            }
        );
    } );
}

export function loadObjModel( objPath ) {
    return new Promise( ( resolve, reject ) => {
        const objLoader = new OBJLoader();
        objLoader.load( objPath, ( object ) => {
            resolve( object );
        }, undefined, reject );
    } );
}

export function loadObjModelWithMtl( objPath, mtlPath ) {
    return new Promise( ( resolve, reject ) => {
        const mtlLoader = new MTLLoader();

        mtlLoader.load( mtlPath, ( materials ) => {
            materials.preload();

            const objLoader = new OBJLoader();
            objLoader.setMaterials( materials );

            objLoader.load( objPath, ( object ) => {
                resolve( object );
            }, undefined, reject );
        }, undefined, reject );
    } );
}