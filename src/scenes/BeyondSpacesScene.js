import * as THREE from 'three';

import { BaseScene } from './BaseScene.js';
import { loadGltfModel } from '../MeshUtils.js';

export class BeyondSpacesScene extends BaseScene {
    constructor( listener ) {
        super( listener );

        this.load();
    }

    load() {
        // Scene model
        loadGltfModel( './assets/model/beyond_spaces.glb' )
        .then( ( model ) => {
            model.traverse(( child ) => {
                if ( child.isMesh ) {
                    child.material.side = THREE.DoubleSide;
                }
            } );

            this.group.add( model );
        } );

        // Sound
        this.loadSound( './assets/audio/spaces_demo.mp3' );
    }
}