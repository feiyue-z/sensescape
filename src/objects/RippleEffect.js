import * as THREE from 'three';

export default function RippleEffect( radius = 5 ) {
    const geometry = new THREE.CircleGeometry( radius, 64 );
    const material = new THREE.ShaderMaterial( {
        // side: THREE.DoubleSide,
        uniforms: {
            uTime: { value: 0 },
            uSpeed: { value: 2.0 },
            uFrequency: { value: 5.0 },
            uAmplitude: { value: 0.2 }
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec2 vPos;

            void main() {
                vUv = uv;
                vPos = position.xy; // Store position for ripple calculation
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime;
            uniform float uSpeed;
            uniform float uFrequency;
            uniform float uAmplitude;

            varying vec2 vUv;
            varying vec2 vPos;

            void main() {
                // Compute distance from center
                float dist = length(vPos);
                
                // Avoid division by zero
                float wave = cos(dist * uFrequency - uTime * uSpeed) * uAmplitude;
                
                // Generate ripple effect
                float alpha = smoothstep(0.5, 0.2, dist) * wave;

                // Base color (white with transparency)
                vec3 color = vec3(1.0);

                gl_FragColor = vec4(color, alpha);
            }
        `,
        transparent: true
    } );

    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( -3, 2, -3 );

    // Add an update method
    mesh.update = ( deltaTime ) => {
        mesh.material.uniforms.uTime.value += deltaTime;
    };

    return mesh;
}
