import Box from "./Box";
import Experience from "../Experience";
import * as THREE from "three";

let resource;
const resourceName = "canalModel";
const scale = 17;
export default class Canal extends Box {
  constructor() {
    if (!resource) {
      const experience = new Experience();
      const resources = experience.resources;
      resource = resources.items[resourceName];
    }
    super(new THREE.Vector3(1000, -28, 0), 0, resource, scale, {
      z: 3000,
      x: 200,
      y: 20,
    });
  }
  static scale = scale;
  static resourceName = resourceName;
  static snaps = true;
  static offsetY = 0;
}
