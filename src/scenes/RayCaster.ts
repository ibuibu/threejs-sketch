import * as THREE from "three";
import SceneBase from "./SceneBase";
import MousePosition from "../utils/MousePosition";

declare var window: Window;

class Raycaster extends SceneBase {
  public name: string = "Raycaster";
  public camera: THREE.PerspectiveCamera;
  private _box: THREE.Mesh;
  private _timer: number = 0;
  private _raycaster: THREE.Raycaster;
  private _mousePosition: MousePosition;
  private _meshList: any[] = [];

  constructor() {
    super();
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

    this._box = new THREE.Mesh(
      new THREE.BoxGeometry(50, 50, 50),
      new THREE.MeshBasicMaterial()
    );
    this.add(this._box);

    const geo = new THREE.BoxBufferGeometry(50, 50, 50);

    for (let i = 0; i < 1000; i++) {
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const mesh = new THREE.Mesh(geo, material);
      mesh.position.x = (Math.random() - 0.5) * 2000;
      mesh.position.y = (Math.random() - 0.5) * 2000;
      mesh.position.z = (Math.random() - 0.5) * 2000;
      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.rotation.z = Math.random() * 2 * Math.PI;
      this.add(mesh);
      this._meshList.push(mesh);
    }

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    this.add(light);

    this.fog = new THREE.Fog(0x000000, 50, 2000);
    this._raycaster = new THREE.Raycaster();
    this._mousePosition = new MousePosition();
  };

  public update = (): void => {
    this._timer += 0.1;
    this._box.position.x += Math.sin(this._timer) * 10;
    this._box.position.z += Math.cos(this._timer) * 10;
    this._updateRay();
  };

  private _updateRay = (): void => {
    this._raycaster.setFromCamera(this._mousePosition, this.camera);
    const intersects = this._raycaster.intersectObjects(this.children);
    this._meshList.map((mesh) => {
      if (intersects.length > 0 && mesh === intersects[0].object) {
        mesh.material.color.setHex(0xff0000);
        mesh.rotation.x += 10;
      } else {
        mesh.material.color.setHex(0xffffff);
      }
    });
  };
}

export default Raycaster;
