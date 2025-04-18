import * as THREE from 'three';

import { NodeMaterial } from 'three/webgpu';
import { float, vec2, vec4, uv, clamp, add, sub, mul, div, fract, normalize, sin, cos, floor, time, mix } from 'three/tsl';

export default class HologramPedestal extends THREE.Mesh {
    constructor( size ) {
        const geometry = new THREE.BoxGeometry( ...size );
        
        const material = new NodeMaterial();
        material.transparent = true;

        function updateFragmentNode() {
            const vUv = uv();
            const color = new THREE.Color( 0x9b98ed );
            const alpha = float( 0.05 );

            //////
            //  HOLOGRAM
            //////

            // Scanline effect
            const scanline = clamp(
                add(
                    float( 0.95 ),
                    mul( float( 0.05 ), cos( mul( float( 3.14 ), mul( add( vUv.y, mul( float( 0.008 ), time ) ), float( 240.0 ) ) ) ) )
                ),
                float( 0.0 ),
                float( 1.0 )
            );

            // Grille effect
            const grille = add(
                float( 0.85 ),
                mul( float( 0.15 ), clamp( mul( float( 1.5 ), cos( mul( float( 3.14 ), mul( vUv.x, float( 640.0) ) ) ) ), float( 0.0 ), float( 1.0 ) ) )
            );

            //////
            //  GLOWING LIGHT
            /////

            // const PI = float( 3.141592) ;
            // const TAU = mul( PI, float( 2.0 ) );

            // const rand = ( n ) => fract( sin ( mul( dot( n, vec2( 12.9898, 4.1414 ) ), float( 43758.5453 ) ) ) );

            // const noise = ( p ) => {
            //     const ip = floor( p );
            //     const u = mul( fract(p), sub( float( 3.0 ), mul( float( 2.0 ), fract( p ) ) ) );
                
            //     return mul(
            //         mix(
            //             mix( rand( ip ), rand( add( ip, vec2( 1.0, 0.0 ) ) ), u.x ),
            //             mix( rand( add( ip, vec2( 0.0, 1.0 ) ) ), rand( add( ip, vec2( 1.0, 1.0 ) ) ), u.x ),
            //             u.y
            //         ),
            //         mix
            //     );
            // };

            // const fbm = ( p ) => {
            //     const noise1 = noise( mul( p, float( 1.0 ) ) );
            //     const noise2 = noise( mul( p, float( 2.0 ) ) );
            //     const noise3 = noise( mul( p, float( 4.0 ) ) );
            
            //     return add( noise1, mul( noise2, float( 0.5 ) ), mul( noise3, float( 0.25 ) ) ) ;
            // };

            // const remap = (val, im, ix, om, ox) => {
            //     return clamp(
            //         add( om, mul( div( sub( val, im ), sub( ix, im ) ), sub( ox, om ) ) ),
            //         om,
            //         ox
            //     )
            // };

            // const rot = ( th ) => {
            //     const a = sin( add( vec2( 1.5707963, 0 ), th ) );
            //     return mat2( a, vec2( -a.y, a.x ) );
            // };

            // const camera = ( ro, ta, cr) => {
            //     const cw = normalize( sub( ta, ro ) );
            //     const cp = vec3( sin( cr ), cos( cr ), 0.0 );
            //     const cu = normalize( cross( cw, cp ) );
            //     const cv = normalize( cross( cu, cw ) );
            //     return mat3( cu, cv, cw );
            // };

            // const p = div( sub( mul( gl_fragCoord, float( 2.0 ) ), iResolution ), min( iResolution.x, iResolution.y ) );
            // const t = mul( time, float(0.1));
            
            // const ro = vec3( mul( cos( t ), float( 10.0 ) ), float( 5.5 ), mul( sin( t ), float( 10.0 ) ) );
            // const ta = vec3( 0.0, 1.0, 0.0 );
            // const c = camera( ro, ta, float( 0.0 ) );
        
            // const ray = normalize( mul( c, vec3( p, float( 2.5 ) ) ) );
            
            // let s = float( 7.5 );
            // let vol = float( 0.0 );
        
            // for ( let i = 0; i < 60; i++ ) {
            //     const pos = add( ro, mul( ray, s ) );
            //     vol = add( vol, mul( fbm( pos.xz ), float( 0.05 ) ) );
            //     s = add( s, float( 0.1 ) );
            // }
            
            const finalColor = mul( color, mul( scanline, mul( grille, float( 1.2 ) ) ) );

            material.fragmentNode = vec4( finalColor, alpha );
        }

        updateFragmentNode();

        super( geometry, material );
    }
}

function rand( n ) {

}

// export default class X {
//     constructor() {
//         loadGltfModel( './assets/model/untitled.glb' )
//         .then( ( model ) => {
//             console.log( model );
//             // model.rotation.y = Math.PI / 2;
//             model.castShadow = true;
//             this.group.add( model );
//         } );
        

//     }

//     update() {
        
//         mesh.rotation.x += 0.005;
//         mesh.rotation.y += 0.005;
//     }
// }