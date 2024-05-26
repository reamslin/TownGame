import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");
    }

    this.setEnvironmentMap();
  }

  setEnvironmentMap() {
    try {
      this.environmentMap = {
        intensity: 1,
        texture: this.resources.items.environmentMapTexture,
      };

      if (!this.environmentMap.texture) {
        throw new Error("Environment map texture not found.");
      }

      this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;
      this.environmentMap.texture.mapping =
        THREE.EquirectangularReflectionMapping;
      this.scene.environment = this.environmentMap.texture;

      this.scene.background = this.resources.items.mapTexture;
      this.scene.backgroundIntensity = 0.05;
      this.scene.needsUpdate = true;

      // Debug
      if (this.debug.active) {
        this.debugFolder
          .add(this.environmentMap, "intensity")
          .name("envMapIntensity")
          .min(0)
          .max(4)
          .step(0.001)
          .onChange(this.environmentMap.updateMaterials);
      }
    } catch (error) {
      console.error("Error setting environment map:", error);
    }
  }
}
