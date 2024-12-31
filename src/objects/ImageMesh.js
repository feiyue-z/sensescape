import * as THREE from 'three';

export default function ImageMesh( imagePath, size, position = [ 0, 0, 0 ] ) {

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load( imagePath );

    const material = new THREE.MeshBasicMaterial( { map: texture } );
    const geometry = new THREE.PlaneGeometry( ...size ); // width, height

    const imageMesh = new THREE.Mesh( geometry, material );
    imageMesh.position.set( ...position )

    return imageMesh;

}