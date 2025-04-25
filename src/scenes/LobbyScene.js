import * as THREE from 'three';

import { BaseScene } from './BaseScene.js';
import { loadGltfModel } from '../MeshUtils.js';

export class LobbyScene extends BaseScene {
    constructor( listener ) {
        super( listener );

        this.load();
    }

    load() {
        // Scene model
        loadGltfModel( '/assets/model/lobby.glb' )
        .then( ( model ) => {
            model.traverse( ( child ) => {
                if ( child.isMesh ) {
                    child.material.side = THREE.DoubleSide;
                }
            } );

            this.group.add( model );
        } );

        // Sound
        this.loadSound( './assets/audio/lobby_demo_2.mp3' );
    }
}