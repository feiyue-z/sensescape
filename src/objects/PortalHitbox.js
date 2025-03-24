import * as THREE from 'three';
import SceneManager from '../SceneManager';

export class PortalHitbox extends THREE.Object3D{
    constructor( position, size, target ) {
        super();

        this.target = target;
        this.position.set( ...position );

        this.geometry = new THREE.BoxGeometry( ...size );
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }); 
        // this.material.visible = true;
        this.mesh = new THREE.Mesh( this.geometry, this.material );

        this.add( this.mesh ); // Add hitbox mesh to this Object3D object
    }

    checkCollision( camera ) {
        const hitbox = new THREE.Box3().setFromObject( this ); // Bounding box of the portal
        const cameraPosition = camera.position;

        if ( hitbox.containsPoint(cameraPosition) ) {
            this.onCollision();
        }
    }

    onCollision() {
        SceneManager.loadScene( this.target );
    }
}