import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import VideoTexture from "./scenes/VideoTexture";
import Raycaster from "./scenes/RayCaster";
import Balls from "./scenes/Balls";
import ShaderPlane from "./scenes/ShaderPlane";
import PostProcessController from "./utils/PostProcessController";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js"

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

  const stats = Stats();
  document.body.appendChild(stats.dom);

  let gui = new GUI({ name: "my gui" });
  const params = {
    sceneNo: 0,
    fullScreen: false,
    stats: true,
  };

  let scenes = [];
  // SET SOME SCENES!!!!
  scenes.push(new VideoTexture(gui));
  scenes.push(new Raycaster(gui));
  scenes.push(new Balls(gui));
  scenes.push(new ShaderPlane(gui));

  const ppc = new PostProcessController(renderer, gui);
  ppc.setScene(scenes[params.sceneNo]);
  ppc.composerReset();

  gui.add(params, "fullScreen").onChange(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });
  gui.add(params, "stats").onChange(() => {
    if (params.stats) {
      stats.dom.style.display = "block";
    } else {
      stats.dom.style.display = "none";
    }
  });
  gui
    .add(params, "sceneNo", [...Array(scenes.length).keys()])
    .onFinishChange(() => {
      for (let i = 0; i < scenes.length; i++) {
        if (i === +params.sceneNo) {
          scenes[params.sceneNo].setGuiFolder(true);
        } else {
          scenes[i].setGuiFolder(false);
        }
      }
      ppc.setScene(scenes[params.sceneNo]);
      ppc.composerReset();
    });

  const tick = (): void => {
    requestAnimationFrame(tick);
    stats.begin();
    scenes[params.sceneNo].update();
    ppc.composer.render();
    stats.end();
  };
  tick();
});
