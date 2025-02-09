import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
                resolve( gltf.scene );
            },
            undefined,
            ( error ) => {
                reject( error );
            }
        );
    } );
}