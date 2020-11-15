import * as THREE from "three";
import SceneBase from "./SceneBase";

declare var window: Window;

class Balls extends SceneBase{
  public camera: THREE.PerspectiveCamera;
  private _timer: number = 0;

  constructor(gui) {
    super(gui);
    this._init();
  }

  private _init = () => {
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.position.set(0, 0, 1000);

    this.fog = new THREE.Fog(0x000000, 50, 2000);

    let object = new THREE.Object3D();
    this.add(object);
    const geometry = new THREE.SphereBufferGeometry(1, 4, 4);
    for (let i = 0; i < 100; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff * Math.random(),
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position
        .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
        .normalize();
      mesh.position.multiplyScalar(Math.random() * 400);
      mesh.rotation.set(
        Math.random() * 2,
        Math.random() * 2,
        Math.random() * 2
      );
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
      object.add(mesh);
    }
    this.add(new THREE.AmbientLight(0x222222));
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    this.add(light);
  };

  public update = (): void => {
    this._timer += 0.1;
  };
}

export default Balls;
