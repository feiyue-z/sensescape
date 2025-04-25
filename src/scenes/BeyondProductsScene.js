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
        // Scene model
        loadGltfModel( './assets/model/beyond_products.glb' )
        .then( ( model ) => {
            const box = new THREE.Box3().setFromObject(model);
            const center = new THREE.Vector3();
            box.getCenter( center );
            
            model.position.sub( center );
            model.position.y = -10;

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
    }
}