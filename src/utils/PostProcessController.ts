import * as THREE from "three";
import * as dat from "dat.gui";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
import { Pass } from "three/examples/jsm/postprocessing/Pass";

type PassController = {
  pass: Pass;
  isEnabled: boolean;
  folder: dat.GUI; 
};

class PostProcessController {
  public composer: EffectComposer;
  private _gui: dat.GUI;
  private _passControllers: PassController[] = [];
  private _renderer: THREE.WebGLRenderer;
  private _scene: any; //クラス化したい

  constructor(renderer: THREE.WebGLRenderer, gui) {
    this.composer = new EffectComposer(renderer);
    this._gui = gui;
    this._init();
  }

  public setScene = (scene: any) => {
    this._scene = scene;
  };

  public composerReset = (): void => {
    this.composer.passes = [];
    this.composer.addPass(new RenderPass(this._scene, this._scene.camera));
    for (const pp of this._passControllers) {
      if (pp.isEnabled) {
        this.composer.addPass(pp.pass);
      }
    }
  };

  private _init = (): void => {
    // Add Pass Names!!!
    const postParams = {
      glitch: false,
      film: false,
    };

    // Add Passes!!!!
    const passes = [new GlitchPass(), new FilmPass(0.8, 0.325, 256)];
    for (const pass of passes) {
      this._passControllers.push({ pass: pass, isEnabled: false, folder: null });
    }

    const folder = this._gui.addFolder("PostProcess");
    Object.keys(postParams).map((postParam, i) => {
      folder.add(postParams, postParam).onFinishChange(() => {
        if (postParams[postParam]) {
          this._passControllers[i].isEnabled = true;
          // this._passControllers[i].folder = folder.addFolder(postParam);
        } else {
          this._passControllers[i].isEnabled = false;
          // folder.removeFolder(this._passControllers[i].folder);
        }
        this.composerReset();
      });
    });
  };
}

export default PostProcessController;