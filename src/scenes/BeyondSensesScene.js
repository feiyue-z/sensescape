import * as THREE from 'three';

import { BaseScene } from './BaseScene.js'
import { loadGltfModel } from '../MeshUtils.js';
import { createVolumetricFog } from '../objects/VolumetricFog.js';

export class BeyondSensesScene extends BaseScene {
    constructor( listener ) {
        super( listener );

        this.load();
    }

    load() {
        // Fog
        const volumetricFog = createVolumetricFog();
        this.group.add( volumetricFog );

        // Floor
        const floor = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshStandardMaterial( { color: 0xffffff } ) );
        floor.rotation.x = - Math.PI / 2;
        floor.position.y = - 3;
        floor.receiveShadow = true;
        this.group.add( floor );

        // Scene model
        loadGltfModel( './assets/model/beyond_senses.glb' )
        .then( ( model ) => {
            // const box = new THREE.Box3().setFromObject(model);
            // const center = new THREE.Vector3();
            // box.getCenter( center );
            
            // model.position.sub( center );

            model.scale.set( 0.2, 0.2, 0.2 );

            // model.position.y = 10;

            model.traverse( ( child ) => {
                if ( child.isMesh ) {
                    child.material.side = THREE.DoubleSide;
                }
            } );
            model.castShadow = true;

            this.group.add( model );
        } );
    }
}