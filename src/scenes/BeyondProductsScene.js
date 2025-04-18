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
        const volumetricFog = createVolumetricFog();
        this.group.add( volumetricFog );

        // Floor
        const floor = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshStandardMaterial( { color: 0xffffff } ) );
        floor.rotation.x = - Math.PI / 2;
        floor.position.y = - 3;
        floor.receiveShadow = true;
        this.group.add( floor );

        // Scene model
        loadGltfModel( './assets/model/beyond_products.glb' )
        .then( ( model ) => {
            model.castShadow = true;

            this.group.add( model );
        } );

        // Sound
        this.loadSound( './assets/audio/products_demo.mp3' );

        // Portal hitbox
        // this.portals.push( new PortalHitbox( [ 0, 2, 0 ], [ 1, 1, 1 ], 'dummy' ) ); 
        // this.group.add( this.portals[0] );

        // const holo = new HologramPedestal( [ 0.1, 0.1, 0.1 ] );
        // const holo = new HologramPedestal( [ 0.3, 0.5, 0.3 ] );
        // holo.position.set( 0, 0.6, -6.8 );
        // this.group.add( holo );
    }
}