import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadGltfModel( path, position = [ 0, 0, 0 ] ) {

    return new Promise( ( resolve, reject ) => {

        const loader = new GLTFLoader();
        loader.load(
            path,
            ( gltf ) => {
                gltf.scene.position.set( ...position )
                resolve( gltf.scene );
            },
            undefined,
            ( error ) => {
                reject( error );
            }
        );

    });

}