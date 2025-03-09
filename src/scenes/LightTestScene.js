import * as THREE from 'three';
import { loadGltfModel, loadObjModel } from '../utils/MeshUtils.js'

export function LightTestScene() {
    const allObjects = new THREE.Group();
    const interactiveObjects = new THREE.Group();

    loadGltfModel( { path: './assets/models/lightroom.glb' } )
        .then( ( model ) => {
            model.position.set( 0, 1.5, 2 );
            model.scale.set( 3, 3, 3 );
            model.rotation.x = Math.PI / 2;

            interactiveObjects.add( model );
            console.log( 'Model loaded:', model );
        } );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 10, 10, 1 );




    const volumetricMesh = new THREE.Mesh( new THREE.BoxGeometry( 20, 10, 20 ), material );
    volumetricMesh.receiveShadow = true;
    volumetricMesh.position.y = 2;
    volumetricMesh.layers.disableAll();
    volumetricMesh.layers.enable( LAYER_VOLUMETRIC_FOG );
    
    allObjects.add( volumetricMesh );


    allObjects.add( directionalLight );
    allObjects.add( interactiveObjects );

    return { allObjects, interactiveObjects };
}