import * as THREE from "three";
import Donuts from "./donuts";
import MousePosition from "./MousePosition";
import Scene from "./scenes/VideoTexture";
import * as dat from "dat.gui";

declare var window: Window;

window.addEventListener("DOMContentLoaded", () => {

  let gui = new dat.GUI({ name: "my gui" });
  let params = {
    color1: "#FF0000",
    color2: [0, 128, 255],
    hoge: "hoge",
    age: 30,
    isBox: true,
    get: () => {
      console.log("aa");
    },
  };
  gui.addColor(params, "color1");
  gui.addColor(params, "color2");
  gui.add(params, "hoge");
  gui.add(params, "age", 0, 100).onChange(() => {
    console.log(params.age);
  });
  gui.add(params, "age", [0, 100]).onFinishChange(() => {
    console.log(params.age);
  });
  gui.add(params, "isBox");
  gui.add(params, "get");

  const renderer = new THREE.WebGLRenderer();
  document.body.appendChild(renderer.domElement);

  const a = new Scene();

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
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

  const geo = new THREE.BoxBufferGeometry(50, 50, 50);

  const meshList = [];
  for (let i = 0; i < 1000; i++) {
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.x = (Math.random() - 0.5) * 2000;
    mesh.position.y = (Math.random() - 0.5) * 2000;
    mesh.position.z = (Math.random() - 0.5) * 2000;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;
    scene.add(mesh);
    meshList.push(mesh);
  }

  scene.fog = new THREE.Fog(0x000000, 50, 2000);

  const raycaster = new THREE.Raycaster();
  const m = new MousePosition(renderer);

  let x = 0;
  const tick = (): void => {
    requestAnimationFrame(tick);
    raycaster.setFromCamera(m, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    meshList.map((mesh) => {
      if (intersects.length > 0 && mesh === intersects[0].object) {
        mesh.material.color.setHex(0xff0000);
        mesh.rotation.x += 10;
      } else {
        mesh.material.color.setHex(0xffffff);
      }
    });
    box.rotation.x += 0.05;
    box.rotation.y += 0.05;
    
    box.position.x += Math.sin(x)*100;
    box.position.z += Math.cos(x)*100;
    x += 0.1;
  

    a.update();
    renderer.render(a, camera);
  };
  tick();
});
