import * as THREE from 'three';

import { LAYER_VOLUMETRIC_LIGHTING } from '../objects/VolumetricFog.js';

export class BaseScene {
    constructor() {
        this.group = new THREE.Group(); // Holds all objects in the scene
        this.portals = []
    }

    load() {}

    unload() {
        // Clean up resources
        this.group.traverse( ( child ) => {
            // if ( child.isMesh ) {
            //     if ( child.geometry ) {
            //         // child.geometry.dispose();
            //         if ( renderer && renderer.dispose ) {
            //             renderer.dispose();
            //         }
            //         child.geometry.dispose();
            //     }
                
            //     if ( child.material ) {
            //         if ( Array.isArray( child.material ) ) { // Multiple materials
            //             child.material.forEach( ( mat ) => {
            //                 if ( mat.map ) mat.map.dispose();
            //                 mat.dispose();
            //             } );
            //         } else { // Single material
            //             if ( child.material.map ) {
            //                 child.material.map.dispose();
            //             }
            //             child.material.dispose();
            //         }
            //     }
            // }
        } );
    }

    animate( camera ) {
        this.portals.forEach( ( portal ) => {
            portal.checkCollision( camera );
        } );
    }

    addPointLight( position, color, intensity, distance, decay = 2 ) {
        const pointLight = new THREE.PointLight( color, intensity, distance, decay );
        pointLight.castShadow = true;
        pointLight.position.set( ...position );
        pointLight.layers.enable( LAYER_VOLUMETRIC_LIGHTING );
    
        this.group.add( pointLight );
    
        return pointLight;
    }
    
    addSpotLight( position, color, intensity, distance, angle, penumbra, decay = 2 ) {
        const spotLight = new THREE.SpotLight( color, intensity, distance, angle, penumbra, decay );
        spotLight.castShadow = true;
        spotLight.position.set( ...position );
        spotLight.layers.enable( LAYER_VOLUMETRIC_LIGHTING );
    
        this.group.add( spotLight );
    
        return spotLight;
    }
    
    addDirectionalLight( position, color, intensity ) {
        const directionalLight = new THREE.DirectionalLight( color, intensity );
        directionalLight.castShadow = true;
        directionalLight.position.set( ...position );
        directionalLight.layers.enable( LAYER_VOLUMETRIC_LIGHTING );
    
        this.group.add( directionalLight );
    
        return directionalLight;
    }
}
