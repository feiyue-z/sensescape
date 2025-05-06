import * as THREE from 'three';

import { BaseScene } from "./BaseScene.js";
import { createVolumetricFog } from '../objects/VolumetricFog.js';
import { loadGltfModel } from '../MeshUtils.js';
import { PortalHitbox } from '../objects/PortalHitbox.js';
import HologramPedestal from '../objects/HologramPedestal.js';

export class BeyondProductsScene extends BaseScene {
    constructor( listener ) {
        super( listener );

        this.load();
    }

    load() {
        // Fog
        const volumetricFog = new createVolumetricFog();
        this.group.add( volumetricFog );

        // Scene model
        loadGltfModel( '/assets/model/beyond_products.glb' )
        .then( ( model ) => {
            const box = new THREE.Box3().setFromObject( model );
            const center = new THREE.Vector3();
            box.getCenter( center );
            
            model.position.sub( center );
            model.position.y = -2;
            
            // model.position.x -= 20;
            model.position.z -= 100;

            model.traverse( ( child ) => {
                if ( child.isMesh ) {
                    child.material.side = THREE.DoubleSide;
                }
            } );
            model.castShadow = true;

            this.group.add( model );
        } );

        // Sound
        this.loadSound( './assets/audio/products_demo.mp3' );

        // const portal_1 = new PortalHitbox();

        // Light
        this.addDirectionalLight( [ -1.74, -7.62, 1.26 ], 0x4e53e4, 137.5 );
        this.addDirectionalLight( [ 23.88, -15.78, 2.52 ], 0xa361c2, 4 );

        this.addSpotLight( [ -7.38, 1.02, -19.62 ], 0xffc35c, 67.5, 0, 1, 0.58, 2 );

        this.addPointLight( [ -30, 3.3, 20.82 ], 0x5408fc, 105.5, 100, 2 );
        this.addPointLight( [ 11.7, 6.36, 26.12 ], 0x1e00ff, 10, 20, 1 );
        this.addPointLight( [ 25.44, 23.88, 7.86 ], 0xf9bb50, 67.5, 20, 2 );
        this.addPointLight( [ 7.08, 4.02, 21.6 ], 0xf9bb59, 10, 100, 2 );
        this.addPointLight( [ 25.44, 23.88, 7.86 ], 0xf9bb50, 67.5, 20, 2 );
        this.addPointLight( [ 7.08, 4.02, 21.6 ], 0xf9bb50, 10, 100, 2 );
        // this.addPointLight( [ 30, 3.3, 12.42 ], 0x964bd2, 23, 100, 2 );
    }
}