// src/ParticleSystem.js
import * as THREE from 'three';
import Nebula, { SpriteRenderer } from 'three-nebula';
import particleConfig from './particles/data2.js';

let nebula;
let emitter;
let spriteRenderer;

export async function particleSystemInit(scene) {
  const system = await Nebula.fromJSONAsync(particleConfig, THREE);
  const renderer = new SpriteRenderer(scene, THREE);
  nebula = system.addRenderer(renderer);

  emitter = system.emitters[0];
}

export function updateParticleSystem(camera) {
    if (!nebula || !emitter) return;

    const camPos = new THREE.Vector3();
    const camDir = new THREE.Vector3();
    const camUp = new THREE.Vector3();

    camera.getWorldPosition(camPos);
    camera.getWorldDirection(camDir);
    camera.getWorldDirection(camDir);
    camera.getWorldDirection(camUp).cross(camDir); // Get "up" vector relative to direction

    const forwardOffset = camDir.multiplyScalar(0.2); // emit behind
    const downOffset = new THREE.Vector3(0, -0.08, 0);   // slightly below

    const emitterPos = camPos.clone().add(forwardOffset).add(downOffset);

    emitter.position.copy(emitterPos);
    nebula.update();
}

export function getParticleSystemGroup() {
    return spriteRenderer?.group || null;
}