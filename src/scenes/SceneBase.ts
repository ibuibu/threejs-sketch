import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js"

declare var window: Window;

class SceneBase extends THREE.Scene {
  public camera: THREE.PerspectiveCamera;
  public gui: GUI;
  public _folder: GUI;

  constructor(gui: GUI) {
    super();
    this.gui = gui;
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

  private _onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };

  public setGuiFolder = (isDisplayed: boolean) => {
    if (isDisplayed) {
      this._folder = this.gui.addFolder(this.constructor.name);
    } else {
      if (this._folder) {
        this.gui.removeFolder(this._folder);
        this._folder = null;
      }
    }
  };
}

export default SceneBase;
