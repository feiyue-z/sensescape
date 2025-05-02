import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { volumetricPass, volumetricMaterial, denoiseStrength } from './objects/VolumetricFog.js';
import SceneManager from './SceneManager.js';

const gui = new GUI();
let pointLightCount = 0;
let spotLightCount = 0;
let directionalLightCount = 0;

export function initGUI() {
    // Scene panel

    const loadScene = {
        loadLobby: function() {
            SceneManager.loadScene( 'lobby' );
        },
        loadBeyondProducts: function() {
            SceneManager.loadScene( 'products' );
        },
        loadBeyondSenses: function() {
            SceneManager.loadScene( 'senses' );
        },
        loadBeyondSpaces: function() {
            SceneManager.loadScene( 'spaces' );
        }
    };

    const scenes = gui.addFolder( 'Scenes' ).open();
    scenes.add( loadScene, 'loadLobby' ).name( 'Lobby' );
    scenes.add( loadScene, 'loadBeyondProducts' ).name( 'Beyond Products' );
    scenes.add( loadScene, 'loadBeyondSenses' ).name( 'Beyond Senses' );
    scenes.add( loadScene, 'loadBeyondSpaces' ).name( 'Beyond Spaces' );

    // Volumetric fog panel

    const volumetricParams = {
        resolution: volumetricPass.getResolution(),
        denoise: true
    };

    const rayMarching = gui.addFolder( 'Ray Marching' ).close();
    rayMarching.add( volumetricParams, 'resolution', .1, .5 ).onChange( ( resolution ) => {
        volumetricPass.setResolution( resolution );
    } );
    rayMarching.add( volumetricMaterial, 'steps', 2, 12 ).name( 'step count' );
    rayMarching.add( denoiseStrength, 'value', 0, 1 ).name( 'denoise strength' );

    // Lighting panel

    const addLight = {
        addPointLight: function() { 
            const pointLight = SceneManager.getCurrentScene().addPointLight( [ 0, 3, 0 ], 0xf9bb50, 3, 100 );
            pointLightCount += 1;
            addPointLightFolder( pointLight, `PointLight ${ pointLightCount }` );
        },
        addSpotLight: function() {
            const spotLight = SceneManager.getCurrentScene().addSpotLight2( [ 0, 3, 0 ], 0xf9bb50, 3, 100, 0.5, 1, 2 );
            spotLightCount += 1;
            addSpotLightFolder( spotLight, `SpotLight ${ spotLightCount }` );
        },
        addDirectionalLight: function() {
            const directionalLight = SceneManager.getCurrentScene().addDirectionalLight( [ 0, 3, 0 ], 0xf9bb50, 3 );
            directionalLightCount += 1;
            addDirectionalLightFolder( directionalLight, `DirectionalLight ${ directionalLightCount }` );
        }
    };
    
    gui.add( addLight, 'addPointLight' ).name( 'Add PointLight' );
    gui.add( addLight, 'addSpotLight' ).name( 'Add SpotLight' );
    gui.add( addLight, 'addDirectionalLight' ).name( 'Add DirectionalLight' );
}

function addPointLightFolder( pointLight, title ) {
    const params = {
        x: pointLight.position.x,
        y: pointLight.position.y,
        z: pointLight.position.z,
        color: `#${ pointLight.color.getHexString() }`,
        intensity: pointLight.intensity,
        distance: pointLight.distance,
        decay: pointLight.decay,
        visible: pointLight.visible
    };

    const folder = gui.addFolder( title ).open();

    folder.add( params, 'x', -30, 30 ).onChange( ( x ) => {
        pointLight.position.x = x;
    } );
    folder.add( params, 'y', -30, 30 ).onChange( ( y ) => {
        pointLight.position.y = y;
    } );
    folder.add( params, 'z', -30, 30 ).onChange( ( z ) => {
        pointLight.position.z = z;
    } );
    folder.addColor( params, 'color' ).onChange( ( color ) => {
        pointLight.color.set( color );
    } );
    folder.add( params, 'intensity', 0, 500 ).onChange( ( intensity ) => {
        pointLight.intensity = intensity;
    } );
    folder.add( params, 'distance', 0, 20 ).onChange( ( distance ) => {
        pointLight.distance = distance;
    } );
    folder.add( params, 'decay', 1, 2 ).onChange( ( decay ) => {
        pointLight.decay = decay;
    } );
    folder.add( params, 'visible' ).onChange( ( visible ) => {
        pointLight.visible = visible
    } );
}

function addSpotLightFolder( spotLight, title ) {
    const params = {
        x: spotLight.position.x,
        y: spotLight.position.y,
        z: spotLight.position.z,
        color: `#${ spotLight.color.getHexString() }`,
        intensity: spotLight.intensity,
        distance: spotLight.distance,
        angle: spotLight.angle,
        penumbra: spotLight.penumbra,
        decay: spotLight.decay,
        visible: spotLight.visible
    };

    const folder = gui.addFolder( title ).open();

    folder.add( params, 'x', -30, 30 ).onChange( ( x ) => {
        spotLight.position.x = x;
    } );
    folder.add( params, 'y', -30, 30 ).onChange( ( y ) => {
        spotLight.position.y = y;
    } );
    folder.add( params, 'z', -30, 30 ).onChange( ( z ) => {
        spotLight.position.z = z;
    } );
    folder.addColor( params, 'color' ).onChange( ( color ) => {
        spotLight.color.set( color );
    } );
    folder.add( params, 'intensity', 0, 500 ).onChange( ( intensity ) => {
        spotLight.intensity = intensity;
    } );
    folder.add( params, 'distance', 0, 20 ).onChange( ( distance ) => {
        spotLight.distance = distance;
    } );
    folder.add( params, 'angle', 0, 1 ).onChange( ( angle ) => {
        spotLight.angle = angle;
    } );
    folder.add( params, 'penumbra', 0, 1 ).onChange( ( penumbra ) => {
        spotLight.penumbra = penumbra;
    } );
    folder.add( params, 'decay', 1, 2 ).onChange( ( decay ) => {
        spotLight.decay = decay;
    } );
    folder.add( params, 'visible' ).onChange( ( visible ) => {
        spotLight.visible = visible
    } );
}

function addDirectionalLightFolder( directionalLight, title ) {
    const params = {
        x: directionalLight.position.x,
        y: directionalLight.position.y,
        z: directionalLight.position.z,
        color: `#${ directionalLight.color.getHexString() }`,
        intensity: directionalLight.intensity,
        visible: directionalLight.visible
    };

    const folder = gui.addFolder( title ).open();

    folder.add( params, 'x', -30, 30 ).onChange( ( x ) => {
        directionalLight.position.x = x;
    } );
    folder.add( params, 'y', -30, 30 ).onChange( ( y ) => {
        directionalLight.position.y = y;
    } );
    folder.add( params, 'z', -30, 30 ).onChange( ( z ) => {
        directionalLight.position.z = z;
    } );
    folder.addColor( params, 'color' ).onChange( ( color ) => {
        directionalLight.color.set( color );
    } );
    folder.add( params, 'intensity', 0, 500 ).onChange( ( intensity ) => {
        directionalLight.intensity = intensity;
    } );
    folder.add( params, 'visible' ).onChange( ( visible ) => {
        directionalLight.visible = visible
    } );
}