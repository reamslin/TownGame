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

    // this.setSunLight();
    this.setEnvironmentMap();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 2);
    this.sunLight.position.set(1100, 1100, 800);

    //this.scene.add(this.sunLight);

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.sunLight, "intensity")
        .name("sunLightIntensity")
        .min(0)
        .max(20)
        .step(0.001);

      this.debugFolder
        .add(this.sunLight.position, "x")
        .name("sunLightX")
        .min(-2000)
        .max(2000)
        .step(1);
      this.debugFolder
        .add(this.sunLight.position, "y")
        .name("sunLightY")
        .min(-2000)
        .max(2000)
        .step(1);
      this.debugFolder
        .add(this.sunLight.position, "z")
        .name("sunLightZ")
        .min(-2000)
        .max(2000)
        .step(1);
    }
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 1;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;
    this.environmentMap.texture.mapping =
      THREE.EquirectangularReflectionMapping;
    this.scene.environment = this.environmentMap.texture;
    this.scene.background = this.environmentMap.texture;
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
  }
}
