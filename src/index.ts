import * as THREE from "three";
import Donuts from "./donuts";

declare var window: Window;

window.addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer();
  document.body.appendChild(renderer.domElement);


  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 0, 1000);

  const onWindowResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
  
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", onWindowResize, false);

  onWindowResize();

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

  const group = new THREE.Group();
  scene.add(group);
  const geo = new THREE.BoxBufferGeometry(50, 50, 50);
  const mat = new THREE.MeshStandardMaterial();

  for (let i = 0; i < 1000; i++) {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.x = (Math.random() - 0.5) * 2000;
    mesh.position.y = (Math.random() - 0.5) * 2000;
    mesh.position.z = (Math.random() - 0.5) * 2000;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;
    group.add(mesh);
  }

  scene.fog = new THREE.Fog(0x000000, 50, 2000);

  const tick = (): void => {
    requestAnimationFrame(tick);

    box.rotation.x += 0.05;
    box.rotation.y += 0.05;

    renderer.render(scene, camera);
  };
  tick();
});
