import * as THREE from 'three';
import SceneManager from '../SceneManager';

export class PortalHitbox extends THREE.Object3D {
    constructor( position, size, targetScene, targetCamPosition = [ 0, 0, 0 ], targetCamRotation = [ 0, 0, 0 ] ) {
        super();

        this.targetScene = targetScene;
        this.position.set( ...position );
        this.targetCamPosition = targetCamPosition;
        this.targetCamRotation = targetCamRotation;

        this.geometry = new THREE.BoxGeometry( ...size );
        this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } ); 
        // this.material.visible = true;
        // this.material = new THREE.MeshStandardMaterial( { color: 0xff0000 } ); 
        this.mesh = new THREE.Mesh( this.geometry, this.material );

        this.add( this.mesh ); // Add hitbox mesh to this Object3D object
    }

    checkCollision( camera ) {
        const hitbox = new THREE.Box3().setFromObject( this ); // Bounding box of the portal
        const cameraPosition = camera.position;

        if ( hitbox.containsPoint( cameraPosition ) ) {
            this.onCollision( camera );
        }
    }

    onCollision( camera ) {
        if ( this.targetScene !== '' ) {
            SceneManager.loadScene( this.targetScene );
        }
        
        camera.position.set( ...this.targetCamPosition );
        camera.rotation.set( ...this.targetCamRotation );
    }
}