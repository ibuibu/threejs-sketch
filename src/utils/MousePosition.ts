import * as THREE from "three";

class MousePosition extends THREE.Vector2 {

  constructor() {
    super();
    this.init();
  }

  init() {
    const handleMouseMove = (e: MouseEvent) => {
      const element = e.currentTarget as HTMLCanvasElement;
      const x = e.clientX - element.offsetLeft;
      const y = e.clientY - element.offsetTop;
      const w = element.offsetWidth;
      const h = element.offsetHeight;
      this.x = (x / w) * 2 - 1;
      this.y = -(y / h) * 2 + 1;
    };
    document
      .querySelector("canvas")
      .addEventListener("mousemove", handleMouseMove);
  }
}

export default MousePosition;
