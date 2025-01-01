import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

export default function ImageMesh( imagePath, width, height, position = [ 0, 0, 0 ] ) {

    const texture = textureLoader.load( imagePath );

    const material = new THREE.MeshBasicMaterial( { map: texture } );
    const geometry = new THREE.PlaneGeometry( width, height );

    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( ...position )

    return mesh;

}