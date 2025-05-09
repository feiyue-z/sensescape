import * as THREE from 'three';

import { BaseScene } from "./BaseScene.js";
import { createVolumetricFog } from '../objects/VolumetricFog.js';
import { loadDracoGltfModel, loadGltfModel } from '../MeshUtils.js';
import { PortalHitbox } from '../objects/PortalHitbox.js';
import HologramPedestal from '../objects/HologramPedestal.js'
import { FramedRock } from '../objects/FramedRock.js';;

export class BeyondProductsScene extends BaseScene {
    constructor( listener, navigation_step ) {
        super( listener, navigation_step );

        this.load();
    }

    load() {
        // Fog
        // const volumetricFog = new createVolumetricFog();
        // this.group.add( volumetricFog );

        // Scene model
        // loadGltfModel( '/assets/model/beyond_products.gltf' )
        loadDracoGltfModel( '/assets/model/beyond_products_draco.glb' )
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
        this.loadSound( './assets/audio/beyond-products.mp3' );

        // const portal_1 = new PortalHitbox();

        // Light
        // this.addDirectionalLight( [ -1.74, -7.62, 1.26 ], 0x4e53e4, 137.5 );
        // this.addDirectionalLight( [ 23.88, -15.78, 2.52 ], 0xa361c2, 4 );

        // this.addSpotLight( [ -7.38, 1.02, -19.62 ], 0xffc35c, 67.5, 0, 1, 0.58, 2 );

        // this.addPointLight( [ -30, 3.3, 20.82 ], 0x5408fc, 105.5, 100, 2 );
        // this.addPointLight( [ 11.7, 6.36, 26.12 ], 0x1e00ff, 10, 20, 1 );
        // this.addPointLight( [ 25.44, 23.88, 7.86 ], 0xf9bb50, 67.5, 20, 2 );
        // this.addPointLight( [ 7.08, 4.02, 21.6 ], 0xf9bb59, 10, 100, 2 );
        // this.addPointLight( [ 25.44, 23.88, 7.86 ], 0xf9bb50, 67.5, 20, 2 );
        // this.addPointLight( [ 7.08, 4.02, 21.6 ], 0xf9bb50, 10, 100, 2 );
        // this.addPointLight( [ 30, 3.3, 12.42 ], 0x964bd2, 23, 100, 2 );
        
        this.addDirectionalLight( [ 0, 3, 0 ], 0x3767d7, 8.5 );
        this.addDirectionalLight( [ 9.36, -8.34, 6.42 ], 0xffb35c, 2 );
        this.addDirectionalLight( [ -11.28, 6.42, 2.7 ], 0x945da8, 2 );
        this.addDirectionalLight( [ -5.4, 1.26, 0.48 ], 0x8e5492, 3 );
        this.addDirectionalLight( [ -30, 4, 14.76 ], 0x47e0ff, 4 );

        this.addSpotLight( [ -3.6, -24.96, -0.54 ], 0x004cff, 500, 20, 1, 1, 2, false );

        this.addPointLight( [ -17.34, 3, 0 ], 0x535ef9, 3, 100, 2, false );
        this.addPointLight( [ -1.32, 3, -30 ], 0xfbc7ff, 23, 20, 2, false );

        // Portal

        // - Landing island
        this.portals.push( new PortalHitbox( [ -16.5, -1, -10.5 ], [ 6, 12, 6 ], '', [ -17, -2.8, -35 ] ) ); 
        this.portals.push( new PortalHitbox( [ -16.5, -1.3, -1.4 ], [ 6, 12, 6 ], 'lobby', [ -9.15, 20.89, 0.21 ], [ 0, -Math.PI / 2, 0 ] ) ); 

        // - Center island (starting from leftmost island, clock-wise)
        this.portals.push( new PortalHitbox( [ -31, -2.8, -40 ], [ 6, 12, 6 ], '', [ -126, -1, -39 ],  [ 0, Math.PI / 2, 0 ] ) );
        this.portals.push( new PortalHitbox( [ -26.8, -2.8, -49 ], [ 6, 12, 6 ], '', [ -79, -2, -111 ] ) );
        this.portals.push( new PortalHitbox( [ -16.5, -2.8, -56.7 ], [ 6, 12, 6 ], '', [ -17.8, -0.7, -137 ] ) );
        this.portals.push( new PortalHitbox( [ -6.6, -2.8, -46.4 ], [ 6, 12, 6 ], '', [ 54.7, -0.6, -103 ], [ 0, -Math.PI / 4, 0 ] ) );
        this.portals.push( new PortalHitbox( [ -8.6, -2.8, -36.9 ], [ 6, 12, 6 ], '', [ 81.7, -0.3, -59.4 ], [ 0, -Math.PI / 3, 0 ] ) );
        
        // - Island 1 (starting from leftmost island, clock-wise)
        this.portals.push( new PortalHitbox( [ -111, -1, -72 ], [ 6, 12, 6 ], '', [ -16.4, -1.3, -5.3 ] ) );

        // - Island 2
        this.portals.push( new PortalHitbox( [ -103.6, -2, -158 ], [ 6, 12, 6 ], '', [ -16.4, -1.3, -5.3 ] ) );

        // - Island 3
        this.portals.push( new PortalHitbox( [ 16, -0.7, -188 ], [ 6, 12, 6 ], '', [ -16.4, -1.3, -5.3 ] ) );

        // - Island 4
        this.portals.push( new PortalHitbox( [ 88, -0.6, -147.6 ], [ 6, 12, 6 ], '', [ -16.4, -1.3, -5.3 ] ) );

        // - Island 5
        this.portals.push( new PortalHitbox( [ 142, -0.3, -79.7 ], [ 6, 12, 6 ], '', [ -16.4, -1.3, -5.3 ] ) );

        this.portals.forEach( ( portal ) => {
            portal.scale.set( 0.3, 0.3, 0.3 );
            this.group.add( portal );
        } );

        const rocksData = [
            {
              image: '/assets/works/ellen_fritz.png',
              position: new THREE.Vector3(-21.7, 1, -36),
              rotation: new THREE.Euler(0, -Math.PI, 0),
              scale: new THREE.Vector3(0.2, 0.2, 0.2)
            }
        ];
      
        for (const rockData of rocksData) {
            new FramedRock(
              '/assets/model/1rock1.glb',
              rockData.image,
              rockData.position,
              rockData.rotation,
              rockData.scale,
              (group) => {
                this.group.add(group); // Add once it's ready
              }
            );
        }
    }
}