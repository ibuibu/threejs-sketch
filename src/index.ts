import * as THREE from "three";
import VideoTexture from "./scenes/VideoTexture";
import Raycaster from "./scenes/RayCaster";
import PostProcess from "./scenes/PostProcess";
import PostProcessController from "./PostProcessController";
import * as dat from "dat.gui";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";

declare var window: Window;

window.addEventListener("DOMContentLoaded", () => {
  // Make renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("canvas"),
  });

  // Window Resize
  const onWindowResize = () => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  onWindowResize();
  window.addEventListener("resize", onWindowResize, false);

  // const composer = new EffectComposer(renderer);

  let gui = new dat.GUI({ name: "my gui" });
  const params = {
    sceneNo: 0,
    fullScreen: false,
  };

  let scenes = [];
  // SET SOME SCENES!!!!
  scenes.push(new VideoTexture(gui));
  scenes.push(new Raycaster());
  scenes.push(new PostProcess());

  const ppc = new PostProcessController(renderer, gui);

  gui
    .add(params, "sceneNo", [...Array(scenes.length).keys()])
    .onFinishChange(() => {
      ppc.setScene(scenes[params.sceneNo])
      ppc.composerReset();
    });
  gui.add(params, "fullScreen").onChange(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });


  const tick = (): void => {
    requestAnimationFrame(tick);
    scenes[params.sceneNo].update();
    ppc.composer.render();
  };
  tick();
});
