class SceneManager {
    constructor() {
        if ( SceneManager.instance ) {
            return SceneManager.instance;
        }

        this.rootScene = null;
        this.scenes = {};
        this.currentScene = null;

        SceneManager.instance = this;
    }

    init( scene ) {
        this.rootScene = scene;
    }

    addScene( key, scene ) {
        this.scenes[ key ] = scene;
    }

    loadScene( key ) {
        const newScene = this.scenes[ key ];

        if ( !newScene ) {
            console.error( `Cannot find scene ${ key }!` );
            return;
        }

        if ( this.currentScene ) {
            this.unloadScene();
        }

        this.currentScene = newScene;
        this.rootScene.add( this.currentScene.group );
    }

    unloadScene() {
        if ( this.currentScene ) {
            this.rootScene.remove( this.currentScene.group );
            this.currentScene.unload();
            this.currentScene = null;
        }
    }

    getCurrentScene() {
        return this.currentScene;
    }

    animate( camera ) {
        if ( this.currentScene ) {
            this.currentScene.animate( camera );
        }
    }
}

export default new SceneManager();