import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class FramedRock {
  static textureLoader = new THREE.TextureLoader();

  constructor(
    modelPath,
    imagePath,
    position = new THREE.Vector3(0, 0, 0),
    rotation = new THREE.Euler(0, 0, 0),
    scale = new THREE.Vector3(1, 1, 1),
    onLoad = () => {} // optional callback
  ) {
    this.modelPath = modelPath;
    this.imagePath = imagePath;
    this.position = position;
    this.rotation = rotation;
    this.scale = scale;
    this.onLoad = onLoad;

    this.group = new THREE.Group();
    this.group.name = `FramedRock-${imagePath.split('/').pop()}`;
    this.loader = new GLTFLoader();

    // Start loading immediately
    this.load();
  }

  load() {
    this.loader.load(this.modelPath, (gltf) => {
      const rock = gltf.scene;
      rock.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      rock.position.set(0, 0, 0);

      // After rock is loaded, load image texture
      FramedRock.textureLoader.load(this.imagePath, (imageTexture) => {
        const planeGeo = new THREE.PlaneGeometry(1.1, 1.375);
        const planeMat = new THREE.MeshBasicMaterial({
          map: imageTexture,
          transparent: true,
          side: THREE.DoubleSide,
        });
        const imagePlane = new THREE.Mesh(planeGeo, planeMat);
        imagePlane.position.set(0.08, 0.15, -0.72);
        imagePlane.rotation.set(0, Math.PI, 0);

        // Assemble group
        this.group.add(rock);
        this.group.add(imagePlane);
        this.group.position.copy(this.position);
        this.group.rotation.copy(this.rotation);
        this.group.scale.copy(this.scale);

        // Callback after everything is ready
        this.onLoad(this.group);
      });
    });
  }

  getObject3D() {
    return this.group;
  }
}
