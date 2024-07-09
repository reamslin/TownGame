import * as THREE from "three";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";
import Experience from "./Experience.js";

export default class PerspectiveCamera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(35, this.sizes.aspectRatio, 1, this.sizes.depth);
    this.instance.position.set(0, 0, 0);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new FirstPersonControls(this.instance, this.canvas);
    this.controls.movementSpeed = 50;
    this.controls.lookSpeed = 0.05;
    this.controls.constrainVertical = true;
    this.controls.activeLook = false;
  }

  update() {
    this.controls.activeLook = this.controls.mouseDragOn;
    this.controls.update(0.01);
    this.instance.position.y = 25;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }
}
