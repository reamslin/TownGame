import * as THREE from "three";
import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";
import Experience from "./Experience.js";

export default class IsometricCamera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.corner = 0;
    this.D = 1000;

    this.setInstance();
  }

  update() {}

  setInstance() {
    this.instance = new THREE.OrthographicCamera(
      -this.D * this.sizes.aspectRatio,
      this.D * this.sizes.aspectRatio,
      this.D,
      -this.D,
      1,
      3000
    );
    this.instance.position.set(800, 800, 800);
    this.instance.lookAt(0, 0, 0);
    this.scene.add(this.instance);
  }

  rotate() {
    this.corner = (this.corner + 1) % 4;
    if (this.corner == 0) {
      this.instance.position.set(800, 800, 800);
    } else if (this.corner == 1) {
      this.instance.position.set(-800, 800, 800);
    } else if (this.corner == 2) {
      this.instance.position.set(-800, 800, -800);
    } else if (this.corner == 3) {
      this.instance.position.set(800, 800, -800);
    }
    this.instance.lookAt(0, 0, 0);
  }

  truck() {}
  zoomIn() {
    this.D -= 50;
    this.resize();
  }
  zoomOut() {
    this.D += 50;
    this.resize();
  }
  resize() {
    this.instance.left = -this.D * this.sizes.aspectRatio;
    this.instance.right = this.D * this.sizes.aspectRatio;
    this.instance.top = this.D;
    this.instance.bottom = -this.D;
    this.instance.updateProjectionMatrix();
  }
}
