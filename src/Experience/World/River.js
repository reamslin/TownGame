import Box from "./Box";
import * as THREE from "three";
import Experience from "../Experience";

let resource;
const resourceName = "riverModel";
const scale = 15.5;
export default class River extends Box {
  constructor() {
    if (!resource) {
      const experience = new Experience();
      const resources = experience.resources;
      resource = resources.items[resourceName];
    }
    super(
      new THREE.Vector3(0, -264.9, 0),
      0,
      resource,
      scale,
      { z: 3000, x: 365, y: 0 },
      false
    );
  }
  static scale = scale;
  static resourceName = resourceName;

  static snaps = true;
}
