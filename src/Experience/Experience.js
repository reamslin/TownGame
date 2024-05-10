import * as THREE from "three";

import Debug from "./Utils/Debug.js";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";
import Controls from "./Controls.js";

import sources from "./sources.js";
import IsometricCamera from "./IsometricCamera.js";
import PerspectiveCamera from "./PerspectiveCamera.js";

let instance = null;

export default class Experience {
  constructor(_canvas) {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.experience = this;

    // Options
    this.canvas = _canvas;
    this.width = 3000;
    this.depth = 3000;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.resources = new Resources(sources);
    this.setScene();
    this.perspectiveCamera = new PerspectiveCamera();
    this.isometricCamera = new IsometricCamera();
    this.camera = this.isometricCamera;
    this.renderer = new Renderer();

    this.world = new World();

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }
  switchCamera() {
    if (this.camera == this.isometricCamera) {
      this.camera = this.perspectiveCamera;
      this.time.frameRateSlowdown = 0;
    } else {
      this.camera = this.isometricCamera;
      this.time.frameRateSlowdown = 50;
    }
  }

  setScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("black");
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) this.debug.ui.destroy();
  }
}
