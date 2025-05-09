import * as THREE from 'three';

import { BaseScene } from './BaseScene.js'
import { loadGltfModel, loadDracoGltfModel } from '../MeshUtils.js';
import { createVolumetricFog } from '../objects/VolumetricFog.js';
import HologramPedestal from '../objects/HologramPedestal.js';
import { SpotLight } from 'three/webgpu';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { mixers } from '../../main.js';
import { PortalHitbox } from '../objects/PortalHitbox.js';

export class BeyondSensesScene extends BaseScene {S
    constructor( listener, navigation_step ) {
        super( listener, navigation_step );

        this.load();
    }

    load() {
        // Fog
        const volumetricFog = createVolumetricFog();
        this.group.add( volumetricFog );

        // Scene model
        // loadGltfModel( '/assets/model/beyond_senses.glb' )
        loadDracoGltfModel( '/assets/model/beyond_senses_draco.glb' )
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

        // Hologram pedstal

        const HOLO_POS_1 = new THREE.Vector3( 0, 0.55, -5.7 );
        const HOLO_POS_2 = new THREE.Vector3( 0, 0.55, -9.85 );
        const HOLO_POS_3 = new THREE.Vector3( 0, 0.55, -14.15 );
        const HOLO_POS_4 = new THREE.Vector3( 0, 0.55, -18.6 );
        const HOLO_POS_5 = new THREE.Vector3( 0, 0.55, -23.15 );

        const holo_1 = new HologramPedestal( [ 0.3, 0.5, 0.3 ] );
        holo_1.position.set( ...HOLO_POS_1 );

        const holo_2 = new HologramPedestal( [ 0.3, 0.5, 0.3 ] );
        holo_2.position.set( ...HOLO_POS_2 );

        const holo_3 = new HologramPedestal( [ 0.3, 0.5, 0.3 ] );
        holo_3.position.set( ...HOLO_POS_3 );

        const holo_4 = new HologramPedestal( [ 0.3, 0.5, 0.3 ] );
        holo_4.position.set( ...HOLO_POS_4 );

        const holo_5 = new HologramPedestal( [ 0.3, 0.5, 0.3 ] );
        holo_5.position.set( ...HOLO_POS_5 );
        
        const holograms = [ holo_1, holo_2, holo_3, holo_4, holo_5 ];
        holograms.forEach( ( holo ) => {
            this.group.add( holo );
            this.addSpotLight2( [ holo.position.x, 0.2, holo.position.z ], 0x621fff, 15, 1,  Math.PI / 3, 1, 2 );
        } );

        // Submission object

        loadDracoGltfModel( '/assets/model/gentlemonstercards.glb' )
        .then( ( model ) => {
            model.position.set( HOLO_POS_1.x, 0.3, HOLO_POS_1.z );
            model.scale.set( 0.1, 0.1, 0.1 );
            model.rotateY( Math.PI / 2 );

            this.group.add( model );
        } );

        loadDracoGltfModel( '/assets/model/sphering.glb' )
        .then( ( model ) => {
            model.position.set( HOLO_POS_2.x, 0.5, HOLO_POS_2.z );
            model.scale.set( 0.8, 0.8, 0.8 );

            this.group.add( model );
        } );

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );

        const loader = new GLTFLoader();
        loader.setDRACOLoader( dracoLoader );

        loader.load( '/assets/model/serpentinus.glb', ( gltf ) => {
            gltf.scene.position.set( HOLO_POS_3.x, 0.5, HOLO_POS_3.z );
            gltf.scene.scale.set( 0.1, 0.1, 0.1 );
            gltf.scene.rotateX( Math.PI / 2 );

            // Setup animation mixer
            const mixer = new THREE.AnimationMixer( gltf.scene );
            gltf.animations.forEach( ( clip ) => {
                mixer.clipAction( clip ).play();
            } );

            mixers.push( mixer );

            this.group.add( gltf.scene );
        } );

        loadDracoGltfModel( '/assets/model/abstract_waves.glb' )
        .then( ( model ) => {
            model.position.set( HOLO_POS_4.x, 0.3, HOLO_POS_4.z );
            model.scale.set( 0.5, 0.5, 0.5 );

            this.group.add( model );
        } );

        loadGltfModel( '/assets/model/flower.glb', )
        .then( ( model ) => {
            model.position.set( HOLO_POS_5.x, 0.4, HOLO_POS_5.z );
            model.scale.set( 0.001, 0.001, 0.001 );

            this.group.add( model );
        } );

        // Sound
        this.loadSound( './assets/audio/beyond-senses.mp3' );

        // Light
        this.addDirectionalLight( [ 0, 1.98, -30 ], 0x002aff, 10 );
        this.addDirectionalLight( [ 11.58, 22.62, 22.62 ], 0x1f0d3a, 3 );
        this.addDirectionalLight( [ 0, -0.96, -29.76 ], 0x8705fd, 3 );
        this.addDirectionalLight( [ 15.48, 9.36, -13.5 ], 0x090e2a, 1 );
        // this.addDirectionalLight( [ 0, 3, 0 ], 0x66ccff, 0 );
        
        // this.addSpotLight( [ 9.36, -0.54, 4.02 ], 0x8549d0, 500, 20, 0.631, 1, 2 );
        // this.addSpotLight( [ -4.38, -13.5, 19.32 ], 0xf9bb50, 500, 20, 0.402, 1, 1.707 );
        this.addSpotLight( [ 7.86, 0.15, -7.38 ], 0x76b5f9, 500, 100, 0.5, 1, 2 );

        // Portal
        this.portals.push( new PortalHitbox( [ 0, 0.4, -28 ], [ 6, 12, 6 ], 'lobby', [ -9.15, 20.89, 0.21 ], [ 0, -Math.PI / 2, 0 ] ) ); 

        this.portals.forEach( ( portal ) => {
            portal.scale.set( 0.1, 0.1, 0.1 );
            this.group.add( portal );
        } );
    }
}