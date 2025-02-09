import * as THREE from 'three';

export default class Cube extends THREE.Mesh {
    constructor( options = {} ) {
        // Default options that can be overridden
        const {
            position = [0, 0, 0],
            width = 1,
            height = 1,
            depth = 1,
            color = 0x00ff00,
        } = options;

        const geometry = new THREE.BoxGeometry( width, height, depth );
        const material = new THREE.MeshBasicMaterial( { color } );
        
        super( geometry, material );
        this.position.set( ...position );
    }

    rotate( speed ) {
        this.rotation.x += speed;
        this.rotation.y += speed;
    }

    changeColor( newColor ) {
        if ( this.material ) {
            this.material.color.set(newColor);
        }
    }
}