import * as THREE from 'three';
import { BaseScene } from './BaseScene.js';
import { FramedRock } from '../objects/FramedRock.js';

export class ParticleTestScene extends BaseScene {
  constructor(listener) {
    super(listener);
    this.load();
  }

  async load() {
    // Visual helpers
    const grid = new THREE.GridHelper(10, 10);
    const light = new THREE.PointLight(0xffffff, 1, 10);
    light.position.set(0, 2, 3);

    this.group.add(grid);
    this.group.add(light);

    const rocksData = [
      {
        image: '/assets/works/ellen_fritz.png',
        position: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Euler(0, 0, 0)
      },
      {
        image: '/assets/works/angel_ye.png',
        position: new THREE.Vector3(2, 0, -1),
        rotation: new THREE.Euler(0, Math.PI / 4, 0)
      },
      {
        image: '/assets/works/may_chen.png',
        position: new THREE.Vector3(-3, 0, 1),
        rotation: new THREE.Euler(0, -Math.PI / 2, 0)
      },
    ];

    for (const rockData of rocksData) {
      const rock = new FramedRock(
        '/assets/model/1rock1.glb',
        rockData.image,
        rockData.position,
        rockData.rotation
      );
      await rock.load();
      this.group.add(rock.getObject3D());
    }
  }

  animate(camera) {
    // No scene-specific updates yet
  }
}
