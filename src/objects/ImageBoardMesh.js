import * as THREE from 'three';

export default class ImageBoardMesh extends THREE.Mesh {
    constructor( options = {} ) {
        const {
            imagePath,
            width = 1,
            height = 1,
            position = [ 0, 0, 0 ]
        } = options;

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load( imagePath );
        const material = new THREE.MeshBasicMaterial( { 
            map: texture,
            transparent: true,  // Enable transparency
            alphaTest: 0.1,    // Helps with sorting transparent pixels
            // You could also use these if needed:
            // depthWrite: false,
            // depthTest: true,
            side: THREE.DoubleSide  // Render both sides of the plane
        } );
        const geometry = new THREE.PlaneGeometry( width, height );

        super( geometry, material );
        this.position.set( ...position );
        
        this.initialWidth = width;
        this.initialHeight = height;
    }

    updateTexture( newImagePath ) {
        const texture = new THREE.TextureLoader().load( newImagePath );
        this.material.map = texture;
        this.material.needsUpdate = true;
    }

    resize( scale ) {
        this.scale.set(
            this.initialWidth * scale,
            this.initialHeight * scale,
            1
        );
    }

    // setOpacity( value ) {
    //     this.material.opacity = value;
    //     this.material.transparent = value < 1;
    //     this.material.needsUpdate = true;
    // }
}