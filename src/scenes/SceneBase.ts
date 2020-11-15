import * as THREE from "three";
import * as dat from "dat.gui";

declare var window: Window;

class SceneBase extends THREE.Scene {
  public camera: THREE.PerspectiveCamera;
  public gui: dat.GUI;
  public _folder: dat.GUI;

  constructor(gui: dat.GUI) {
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
