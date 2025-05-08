import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class FramedRock {
  static textureLoader = new THREE.TextureLoader();

  constructor(
    modelPath,
    imagePath,
    position = new THREE.Vector3(0, 0, 0),
    rotation = new THREE.Euler(0, 0, 0)
  ) {
    this.modelPath = modelPath;
    this.imagePath = imagePath;
    this.position = position;
    this.rotation = rotation;
    this.group = new THREE.Group();
    this.group.name = `FramedRock-${imagePath.split('/').pop()}`;
    this.loader = new GLTFLoader();
  }

  async load() {
    // Load rock model
    const gltf = await this.loader.loadAsync(this.modelPath);
    const rock = gltf.scene;
    rock.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    rock.position.set(0, 0, 0);

    // Load image texture
    const imageTexture = await FramedRock.textureLoader.loadAsync(this.imagePath);

    // Create image plane
    const planeGeo = new THREE.PlaneGeometry(1.1, 1.375);
    const planeMat = new THREE.MeshBasicMaterial({
      map: imageTexture,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const imagePlane = new THREE.Mesh(planeGeo, planeMat);
    imagePlane.position.set(0.08, 0.15, -0.72);
    imagePlane.rotation.set(0, Math.PI, 0); // Face forward

    // Assemble group
    this.group.add(rock);
    this.group.add(imagePlane);
    this.group.position.copy(this.position);
    this.group.rotation.copy(this.rotation);
  }

  getObject3D() {
    return this.group;
  }
}
