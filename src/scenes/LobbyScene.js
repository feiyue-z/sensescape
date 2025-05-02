import * as THREE from 'three';

import { BaseScene } from './BaseScene.js';
import { loadGltfModel } from '../MeshUtils.js';
import { mixers } from '../../main.js';

export class LobbyScene extends BaseScene {
    constructor( listener ) {
        super( listener );

        this.load();
    }

    load() {
        // Scene model
        loadGltfModel( '/assets/model/lobby.glb' )
        // loadGltfModel( 'https://storage.cloud.google.com/sensescape/lobby.glb?authuser=1' )
        .then( ( model ) => {
            model.traverse( ( child ) => {
                if ( child.isMesh ) {
                    child.material.side = THREE.DoubleSide;
                }
            } );

            this.group.add( model );
        } );

        // Vinyl model
        loadGltfModel( '/assets/model/vinyl.glb' )
        // loadGltfModel( 'https://storage.cloud.google.com/sensescape/lobby.glb?authuser=1' )
        .then( ( model ) => {
            // Setup animation mixer
            const mixer = new THREE.AnimationMixer( model.scene );
            model.animations.forEach( ( clip ) => {
                console.log("*")
                mixer.clipAction( clip ).play();
            } );

            mixers.push( mixer );

            this.group.add( model );
        } );

        // Sound
        this.loadSound( './assets/audio/lobby_demo_2.mp3' );
    }
}