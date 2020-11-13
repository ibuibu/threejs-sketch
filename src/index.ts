import * as THREE from "three";
import Donuts from './donuts';

declare var window: Window;

window.addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(800, 600);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 10000);
  camera.position.set(0, 0, 1000);

  const geometry = new THREE.BoxGeometry(250, 250, 250);
  const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  const box = new THREE.Mesh(geometry, material);
  box.position.z = -5;
  scene.add(box);

  scene.add(new Donuts());

  // 平行光源を生成
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);

  const tick = (): void => {
    requestAnimationFrame(tick);

    box.rotation.x += 0.05;
    box.rotation.y += 0.05;

    // 描画
    renderer.render(scene, camera);
  };
  tick();

  console.log("Hello Three.js");
});