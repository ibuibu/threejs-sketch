import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

declare var window: Window;

class ShaderPlane extends THREE.Scene {
  public camera: THREE.Camera;
  public gui: GUI;
  public _folder: GUI;
  public uniforms: any;

  constructor(gui: GUI) {
    super();
    this.gui = gui;
    this._initialize();
  }

  public _initialize = () => {
    this.camera = new THREE.Camera();
    this.camera.position.set(0, 0, 1);

    const geo = new THREE.PlaneBufferGeometry(2, 2);

    this.uniforms = {
      u_time: { type: "f", value: 1.0 },
      u_resolution: { type: "v2", value: new THREE.Vector2() },
      u_mouse: { type: "v2", value: new THREE.Vector2() },
      u_sw: { type: "f", value: 0.0 },
      speed: { type: "f", value: 1.0 },
    };

    const vertexShader = `
void main() {
gl_Position = vec4( position, 1.0 );
}
`;

    const fragmentShader = `
uniform vec2 u_resolution;
uniform float u_time;

void main(void){
gl_FragColor = vec4( gl_FragCoord.xy/u_resolution, abs(sin(u_time*0.1)), 1.0);
}
`;
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const mesh = new THREE.Mesh(geo, mat);
    this.add(mesh);

    this._onWindowResize();
    window.addEventListener("resize", this._onWindowResize);
  };

  private _onWindowResize = () => {
    this.uniforms.u_resolution.value.x = window.innerWidth;
    this.uniforms.u_resolution.value.y = window.innerHeight;
  };

  public update = () => {
    this.uniforms.u_time.value += 0.1;
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

export default ShaderPlane;
