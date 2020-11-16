import * as THREE from "three";
import SceneBase from "./SceneBase";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js"

declare let window: Window;

class VideoTexture extends SceneBase{
  public gui: GUI;
  public _folder: GUI;
  private _box: any;
  private _timer: number = 0;

  constructor(gui: GUI) {
    super(gui);
    this.gui = gui;
    this._init();
  }

  public setGuiFolder = (isDisplayed: boolean) => {
    if (isDisplayed) {
      const params = {
        getCamera: async () => {
          const localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          const videoElm = document.createElement("video");
          videoElm.srcObject = localStream;
          videoElm.play();
          const texture = new THREE.VideoTexture(videoElm);
          // 1テクセルが1ピクセルより大きな範囲をカバーするときのテクスチャサンプリング方法の指定
          texture.magFilter = THREE.LinearFilter;
          // 1テクセルが1ピクセルより小さな範囲をカバーするときのテクスチャサンプリング方法の指定
          texture.minFilter = THREE.LinearFilter;
          // 動画テクスチャフォーマットの指定
          texture.format = THREE.RGBFormat;
          const material = new THREE.MeshStandardMaterial({ map: texture });
          this._box.material = material;
        },
      };
      this._folder = this.gui.addFolder(this.constructor.name);
      this._folder.add(params, "getCamera");
    } else {
      if (this._folder) {
        this.gui.removeFolder(this._folder);
        this._folder = null;
      }
    }
  };

  _init = async () => {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.z = 1000;

    this._box = new THREE.Mesh(
      new THREE.BoxGeometry(700, 700, 50),
      new THREE.MeshStandardMaterial()
    );
    this.add(this._box);
    this._box.material.needsUpdate = true;

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    this.add(light);

    this.setGuiFolder(true);
  };

  public update = () => {
    this._timer += 0.1;
    this._box.position.x = 10 * Math.sin(this._timer);
    this._box.rotation.x = 1 * Math.sin(this._timer);
  };
}

export default VideoTexture;
