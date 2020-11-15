import * as THREE from "three";

declare var window: Window;

class SceneBase extends THREE.Scene {
  public camera: THREE.PerspectiveCamera;

  constructor() {
    super();
    this._initialize();
  }

  public _initialize = () => {
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

  _onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };
}

export default SceneBase;
