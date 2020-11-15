import * as THREE from 'three';

class Donuts extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.TorusGeometry(120, 40, 60, 50);
    const material = new THREE.MeshNormalMaterial();
    super(geometry, material);
  }
}

export default Donuts;
