import * as THREE from 'three';

import { BaseScene } from './BaseScene.js'
import { loadGltfModel } from '../MeshUtils.js';
import { createVolumetricFog } from '../objects/VolumetricFog.js';
import HologramPedestal from '../objects/HologramPedestal.js';
import { SpotLight } from 'three/webgpu';

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
        loadGltfModel( '/assets/model/beyond_senses.glb' )
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

        // const test = new HologramPedestal( [ 1, 1, 1 ] );
        // test.position.set( 0, 1, -1);
        // this.group.add( test );

        const holo = new HologramPedestal( [ 0.3, 0.5, 0.3 ] );
        holo.position.set( 0, 0.55, -6.8 );
        this.group.add( holo );

        // const test = new SpotLight( 0x00ffff, 100 );
        // test.position.set( 0, 0, -6.8 );
        // test.intensity = 5;
        // this.group.add( test );

        // const test = new SpotLight( 0x00ffff, 100 );
        // test.position.set( 0, 0, -6.8 );
        // test.target.position.set(0, 1, -6.8);
        // test.castShadow = true
        // test.angle = Math.PI / 6;
        // test.decay = 2;
        // test.penumbra = 1;
        // test.distance = 5;
        // this.group.add( test );
        // this.group.add( test.target );

        this.addSpotLight2( [ 0, 0.2, -6.8 ], 0x621fff, 5, 1,  Math.PI / 3, 1, 2 );
    }
}