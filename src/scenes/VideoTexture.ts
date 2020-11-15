import * as THREE from "three";
import * as dat from "dat.gui";

declare let window: Window;

class VideoTexture extends THREE.Scene {
  public name: string = "VideoTexture";
  public camera: THREE.Camera;
  public gui: dat.GUI;
  private _box: any;
  private _timer: number = 0;

  constructor(gui: dat.GUI) {
    super();
    this.gui = gui;
    this._init();
  }

  private _init = async () => {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.z = 1000;

    this._box = new THREE.Mesh(
      new THREE.BoxGeometry(500, 500, 50),
      new THREE.MeshStandardMaterial()
    );
    this.add(this._box);

    this._box.material.needsUpdate = true;
    let params = {
      videoTex: async () => {
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
    let folder = this.gui.addFolder("VideoTexture");
    folder.add(params, "videoTex");

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    this.add(light);
  };

  public update = () => {
    this._timer += 0.1;
    this._box.position.x = 10 * Math.sin(this._timer);
    this._box.rotation.x = 1 * Math.sin(this._timer);
  };
}

export default VideoTexture;
