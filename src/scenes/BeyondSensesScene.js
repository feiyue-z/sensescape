import * as THREE from 'three';

import { BaseScene } from './BaseScene.js'
import { loadGltfModel } from '../MeshUtils.js';

export class BeyondSensesScene extends BaseScene {
    constructor( listener ) {
        super( listener );

        this.load();
    }

    load() {
        // Scene model
        loadGltfModel( './assets/model/beyond_senses.glb' )
        .then( ( model ) => {
            model.castShadow = true;
            
            this.group.add( model );
        } );
    }
}