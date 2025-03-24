import * as THREE from 'three';
import { vec3, Fn, time, texture3D, screenUV, uniform, screenCoordinate, pass } from 'three/tsl';
import { PostProcessing, VolumeNodeMaterial } from 'three/webgpu';
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';
import { bayer16 } from 'three/addons/tsl/math/Bayer.js';
import { gaussianBlur } from 'three/addons/tsl/display/GaussianBlurNode.js';

export const LAYER_VOLUMETRIC_LIGHTING = 10;
export let volumetricPass, volumetricMaterial, denoiseStrength;

export function createVolumetricFog() {
    const noiseTexture3D = createTexture3D();
    const smokeAmount = uniform( 2 );

    volumetricMaterial = new VolumeNodeMaterial();

    volumetricMaterial.steps = 12;
    volumetricMaterial.offsetNode = bayer16( screenCoordinate ); // Add dithering to reduce banding
    volumetricMaterial.scatteringNode = Fn( ( { positionRay } ) => {
        // Return the amount of fog based on the noise texture
        const timeScaled = vec3( time, 0, time.mul( .3 ) );

        const sampleGrain = ( scale, timeScale = 1 ) => texture3D( noiseTexture3D, positionRay.add( timeScaled.mul( timeScale ) ).mul( scale ).mod( 1 ), 0 ).r.add( .5 );

        let density = sampleGrain( .1 );
        density = density.mul( sampleGrain( .05, 1 ) );
        density = density.mul( sampleGrain( .02, 2 ) );

        return smokeAmount.mix( 1, density );
    } );
    
    const volumetricMesh = new THREE.Mesh( new THREE.BoxGeometry( 20, 10, 20 ), volumetricMaterial );
    volumetricMesh.receiveShadow = true;
    volumetricMesh.position.y = 2;
    volumetricMesh.layers.disableAll();
    volumetricMesh.layers.enable( LAYER_VOLUMETRIC_LIGHTING );

    return volumetricMesh;
}

export function createVolumetricPostProcessing( renderer, scene, camera ) {
    // Post-Processing
    const postProcessing = new PostProcessing( renderer );

    // Layers
    const volumetricLightingIntensity = uniform( 1 );

    const volumetricLayer = new THREE.Layers();
    volumetricLayer.disableAll();
    volumetricLayer.enable( LAYER_VOLUMETRIC_LIGHTING );

    // Scene Pass
    const scenePass = pass( scene, camera );
    const sceneDepth = scenePass.getTextureNode( 'depth' );

    // Material - Apply occlusion depth of volumetric lighting based on the scene depth
    volumetricMaterial.depthNode = sceneDepth.sample( screenUV );

    // Volumetric Lighting Pass
    volumetricPass = pass( scene, camera, { depthBuffer: false } );
    volumetricPass.setLayers( volumetricLayer );
    volumetricPass.setResolution( .25 );

    // Compose and Denoise
    denoiseStrength = uniform( .6 );
    const blurredVolumetricPass = gaussianBlur( volumetricPass, denoiseStrength );
    const scenePassColor = scenePass.add( blurredVolumetricPass.mul( volumetricLightingIntensity ) );

    postProcessing.outputNode = scenePassColor;

    return postProcessing;
}

function createTexture3D() {
    let i = 0;

    const size = 128;
    const data = new Uint8Array( size * size * size );

    const scale = 10;
    const perlin = new ImprovedNoise();

    const repeatFactor = 5.0;

    for ( let z = 0; z < size; z++ ) {
        for ( let y = 0; y < size; y++ ) {
            for ( let x = 0; x < size; x++ ) {
                const nx = ( x / size ) * repeatFactor;
                const ny = ( y / size ) * repeatFactor;
                const nz = ( z / size ) * repeatFactor;

                const noiseValue = perlin.noise( nx * scale, ny * scale, nz * scale );

                data[ i ] = ( 128 + 128 * noiseValue );
                i++;
            }
        }
    }

    const texture = new THREE.Data3DTexture( data, size, size, size );
    texture.format = THREE.RedFormat;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.unpackAlignment = 1;
    texture.needsUpdate = true;

    return texture;
}