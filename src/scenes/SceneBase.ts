import * as THREE from "three";

declare var window: Window;

class SceneBase extends THREE.Scene {
  public camera: THREE.PerspectiveCamera;
  private _timer: number = 0;

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

    this._onWindowResize();
    window.addEventListener("resize", this._onWindowResize);
  };

  public update = (): void => {
    this._timer += 0.1;
  };

  _onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };
}

export default SceneBase;
