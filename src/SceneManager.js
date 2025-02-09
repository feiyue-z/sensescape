import * as THREE from 'three';

class SceneManager {
    constructor( scene, interactives ) {
        this.currentScene = scene;
        this.currentInteractives = interactives;
        this.scenes = {};
        this.currentSceneKey = null;
    }

    addScene( key, scene ) {
        this.scenes[ key ] = {
            allObjects: scene.allObjects,
            interactiveObjects: scene.interactiveObjects
        };
    }

    loadScene( key ) {
        const scene = this.scenes[ key ];

        if ( !scene ) {
            console.error( `Cannot find scene ${ key }!` );
            return;
        }

        if ( this.currentSceneKey ) {
            this.unloadScene( this.currentSceneKey );
        }

        this.currentSceneKey = key;
        this.currentScene.add( scene.allObjects );

        // Note only the reference is updated here
        // because add() moves the objects to a new parent group
        this.currentInteractives.children = scene.interactiveObjects.children;
    }

    unloadScene( key ) {
        const scene = this.scenes[ key ];

        if ( !scene ) {
            console.error( `Cannot find scene ${ key }!` );
            return;
        }

        // Remove scene from root scene
        this.currentScene.remove( scene.allObjects );
        
        // Free up GPU memory by disposing of 3D objects in scene
        scene.allObjects.traverse( ( child ) => {
            if ( child.isMesh ) {
                child.geometry.dispose();
                if ( child.material.map ) {
                    child.material.map.dispose();
                }
                child.material.dispose();
            }
        });
    }
}

export default SceneManager;