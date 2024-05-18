import * as THREE from "three";
import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";
import Experience from "./Experience.js";

export default class IsometricCamera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.canvas = this.experience.canvas;
    this.corner = 3;
    this.D = this.experience.depth * 0.7;

    this.setInstance();
  }

  update() {}

  setInstance() {
    this.instance = new THREE.OrthographicCamera(
      -this.D * this.sizes.aspectRatio,
      this.D * this.sizes.aspectRatio,
      this.D,
      -this.D,
      this.experience.depth,
      this.experience.depth * 3
    );
    this.instance.position.set(
      -this.experience.depth,
      this.experience.depth,
      -this.experience.depth
    );
    this.instance.lookAt(0, 0, 0);
    this.scene.add(this.instance);
  }

  rotate() {
    this.corner = (this.corner + 1) % 4;
    if (this.corner == 0) {
      this.instance.position.set(
        this.experience.depth,
        this.experience.depth,
        this.experience.depth
      );
    } else if (this.corner == 1) {
      this.instance.position.set(
        -this.experience.depth,
        this.experience.depth,
        this.experience.depth
      );
    } else if (this.corner == 2) {
      this.instance.position.set(
        -this.experience.depth,
        this.experience.depth,
        -this.experience.depth
      );
    } else if (this.corner == 3) {
      this.instance.position.set(
        this.experience.depth,
        this.experience.depth,
        -this.experience.depth
      );
    }
    this.instance.lookAt(0, 0, 0);
  }
  left = 0;
  truckLeft() {
    this.instance.position.x -= 50;
    this.instance.position.z += 50;
  }
  right = 0;
  truckRight() {
    this.instance.position.x += 50;
    this.instance.position.z -= 50;
  }
  vertical = 0;
  truckUp() {
    this.instance.position.x -= 50;
    this.instance.position.z -= 50;
  }
  vertical = 0;
  truckDown() {
    this.instance.position.x += 50;
    this.instance.position.z += 50;
  }

  truck(dir) {
    let relativeDir = this.directionMap[dir][this.corner];
    switch (relativeDir) {
      case "left":
        this.truckLeft();
        break;
      case "right":
        this.truckRight();
        break;
      case "up":
        this.truckUp();
        break;
      case "down":
        this.truckDown();
        break;
    }
  }

  directionMap = {
    left: ["left", "up", "right", "down"],
    right: ["right", "down", "left", "up"],
    up: ["up", "right", "down", "left"],
    down: ["down", "left", "up", "right"],
  };
  zoomIn() {
    this.D -= 100;
    this.resize();
    console.log(this.sizes.width, this.D);
  }
  zoomOut() {
    this.D += 100;
    this.resize();
    console.log(this.D);
  }
  resize() {
    this.instance.left = -this.D * this.sizes.aspectRatio;
    this.instance.right = this.D * this.sizes.aspectRatio;
    this.instance.top = this.D;
    this.instance.bottom = -this.D;
    this.instance.updateProjectionMatrix();
  }
}
