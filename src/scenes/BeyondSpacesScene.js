import * as THREE from 'three';

import { BaseScene } from './BaseScene.js';
import { loadGltfModel } from '../MeshUtils.js';
import { createVolumetricFog } from '../objects/VolumetricFog.js';
import HologramPedestal from '../objects/HologramPedestal.js';

export class BeyondSpacesScene extends BaseScene {
    constructor( listener ) {
        super( listener );

        this.load();
    }

    load() {
        // Fog
        const volumetricFog = createVolumetricFog();
        this.group.add( volumetricFog );

        // Scene model
        loadGltfModel( '/assets/model/beyond_spaces.glb' )
        .then( ( model ) => {
            // model.scale.set( 0.5, 0.5, 0.5 );
            model.scale.set( 0.005, 0.005, 0.005 );

            model.traverse( ( child ) => {
                if ( child.isMesh ) {
                    child.material.side = THREE.DoubleSide;
                }
            } );

            this.group.add( model );
        } );

        // Sound
        this.loadSound( './assets/audio/spaces_demo.mp3' );

        // Hologram Pedstals
        const holo_1 = new HologramPedestal( [ 0.3, 0.5, 0.3 ] );
        holo_1.position.set( -1.1, 0.6, 0.78 );

        const holo_2 = new HologramPedestal( [ 0.3, 0.5, 0.3 ] );
        holo_2.position.set( -1.1, 0.6, 3.0 );

        const holo_3 = new HologramPedestal( [ 0.3, 0.5, 0.3 ] );
        holo_3.position.set( -1.1, 0.6, 5.25 );

        const holo_4 = new HologramPedestal( [ 0.3, 0.5, 0.3 ] );
        holo_4.position.set( 1.15, 0.6, 0.78 );

        const holo_5 = new HologramPedestal( [ 0.3, 0.5, 0.3 ] );
        holo_5.position.set( 1.15, 0.6, 3.0 );

        const holo_6 = new HologramPedestal( [ 0.3, 0.5, 0.3 ] );
        holo_6.position.set( 1.15, 0.6, 5.25 );
        
        const holograms = [ holo_1, holo_2, holo_3, holo_4, holo_5, holo_6 ];
        holograms.forEach( ( holo ) => {
            this.group.add( holo );
            this.addSpotLight2( [ holo.position.x, 0.2, holo.position.z ], 0x621fff, 100, 1,  Math.PI / 3, 1, 2 );
        } );

        // this.addSpotLight2( [ 0, 1, 0 ], 0xffffff, 50, 20,  Math.PI / 3, 1, 2 );

        // Light
        this.addDirectionalLight( [ -2.46, 1.26, 1.98 ], 0x0c2ac0, 14.5 );
        this.addDirectionalLight( [ 8.64, 2.52, 7.86 ], 0xe160fb, 3 );
        this.addDirectionalLight( [ 3.3, -15.78, 4.8 ], 0x5326a6, 3 );
        this.addDirectionalLight( [ -3.18, 5.64, -13.5 ], 0xbcc2d7, 7 );
        this.addDirectionalLight( [ 7.68, -7.38, -27.24 ], 0x24abff, 4 );
        this.addDirectionalLight( [ -19.62, -5.1, -1.32 ], 0x6cb2f4, 3 );
    }
}