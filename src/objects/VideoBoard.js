import * as THREE from 'three';

// TODO: not really done yet

export default function VideoMesh( url, width, height, position = [ 0, 0, 0 ] ) {
    const video = document.createElement( 'video' );
    video.src = 'path/to/video.mp4'; // TODO: replace with url
    video.loop = true;
    video.autoplay = true;
    video.muted = true; // Optional: Mute if no audio needed
    video.playsInline = true; // For mobile compatibility

    const videoTexture = new THREE.VideoTexture( video );
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    const videoMaterial = new THREE.MeshBasicMaterial( { map: videoTexture } );
    const videoGeometry = new THREE.PlaneGeometry( width, height ); // width, height

    const mesh = new THREE.Mesh( videoGeometry, videoMaterial );
    // TODO: set position

    return mesh;
}