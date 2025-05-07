// src/scenes/ParticleTestScene.js

import * as THREE from 'three';
import { BaseScene } from './BaseScene.js';
import { particleSystemInit } from '../ParticleSystem.js';

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
  }

  animate(camera) {
    // no scene-specific updates
  }
}
