import * as THREE from "three";
import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";
import Experience from "./Experience.js";

export default class PerspectiveCamera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.controls = new FlyControls(this.instance, this.canvas);
    this.controls.movementSpeed = 100;
    this.controls.rollSpeed = Math.PI / 12;
    this.controls.autoForward = false;
    this.controls.dragToLook = true;
  }

  update() {
    this.controls.update(0.01);
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspectRatio,
      1,
      1000
    );
    this.instance.position.set(0, 20, 0);
    this.scene.add(this.instance);
  }
}
