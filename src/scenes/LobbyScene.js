import * as THREE from 'three';

import { BaseScene } from './BaseScene.js';
import { loadGltfModel } from '../MeshUtils.js';
import { mixers } from '../../main.js';
import { PortalHitbox } from '../objects/PortalHitbox.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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

        // Vinyl model
        // loadGltfModel( '/assets/model/vinyl.glb' )
        // .then( ( model ) => {
        //     console.log('Number of animations:', model.animations.length);

        //     model.position.set( 0, 18, 0 );

        //     // Setup animation mixer
        //     const mixer = new THREE.AnimationMixer( model );
        //     model.animations.forEach( ( clip ) => {
        //         console.log("*")
        //         mixer.clipAction( clip ).play();
        //     } );

        //     mixers.push( mixer );

        //     this.group.add( model );
        // } );

        const loader = new GLTFLoader();
        loader.load( '/assets/model/vinyl_animated.glb', ( gltf ) => {
            gltf.scene.position.set( 0, 15, 0 );

            // Setup animation mixer
            const mixer = new THREE.AnimationMixer( gltf.scene );
            gltf.animations.forEach( ( clip ) => {
                console.log("*")
                mixer.clipAction( clip ).play();
            } );

            mixers.push( mixer );

            this.group.add( gltf.scene );
        } );

        // Sound
        this.loadSound( './assets/audio/lobby_demo_2.mp3' );

        // Light
        this.addSpotLight( [ 0, 0.15, 0 ], 0xecb95f, 35.5, 14.6, 0.5, 1, 2 );
        this.addSpotLight( [ 1.02, 30, -1.32 ], 0xfb790e, 258.5, 0, 0.427, 0.555, 1.72 );
        this.addSpotLight( [ -13.56, 27.72, -2.04 ], 0x438fdf, 500, 100, 0.5, 1, 2 );
        this.addSpotLight( [ 6.36, 26.94, -8.94 ], 0xdeb1ed, 500, 100, 0.5, 1, 2 );
        this.addSpotLight( [ 9.36, 20.1, -9.72 ], 0x25f4e6, 500, 20, 0.682, 0.466, 2 );
        this.addSpotLight( [ 30, 13.2, 8.64 ], 0x163783, 500, 100, 0.733, 0.097, 1.211 );
        this.addSpotLight( [ -9.72, 30, 5.58 ], 0xac24f5, 245.5, 16.94, 1, 0.504, 1.402 );
        this.addSpotLight( [ -2.04, 30, 5.58 ], 0xf9bb50, 175.5, 15.68, 1, 0.109, 1 );
        this.addSpotLight( [ -7.38, 17.76, -12.72 ], 0x865091, 404.5, 20, 0.644, 0.86, 1.389 );
        this.addSpotLight( [ -0.54, 30, -5.1 ], 0x69a8b5, 93, 13.9, 0.975, 0.122, 1 );

        this.addDirectionalLight( [ 30, 8.64, 9.36 ], 0x222762, 3 );
        this.addDirectionalLight( [ 3.42, -0.96, -2.46 ], 0x13b98, 3 );
        this.addDirectionalLight( [ -2.86, -6.66, 7.86 ], 0x20203, 4 );
        this.addDirectionalLight( [ -0.54, 1.02, 0.24 ], 0x5408fc, 3 );

        this.addPointLight( [ 3.3, 15.48, -0.54 ], 0x43559d, 500, 20, 2 );
        this.addPointLight( [ -1.32, 17.04, 0.24 ], 0xc6ab7b, 48.5, 100, 2 );
        this.addPointLight( [ -5.1, 30, 4.8 ], 0x922dae, 500, 100, 2 );

        // Portal
        this.portals.push( new PortalHitbox( [ -28, 22, -49 ], [ 6, 12, 6 ], 'products', [ -16.4, -1.3, -5.3 ] ) ); 
        this.portals.push( new PortalHitbox( [ 56, 22, 0 ], [ 6, 12, 6 ], 'senses', [ 0, 0.3, 1.5 ] ) ); 
        this.portals.push( new PortalHitbox( [ -29, 22, 51 ], [ 6, 12, 6 ], 'spaces', [ 0, 0.9, 10 ] ) ); 

        this.portals.forEach( ( portal ) => {
            this.group.add( portal );
        } );
    }
}