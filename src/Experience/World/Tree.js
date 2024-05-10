import Box from "./Box";
import Experience from "../Experience";
import * as THREE from "three";

let resource;
const resourceName = "treeModel";
const scale = 15;
export default class Tree extends Box {
  constructor() {
    if (!resource) {
      const experience = new Experience();
      const resources = experience.resources;
      resource = resources.items[resourceName];
    }
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * experience.world.floor.width,
      0,
      (Math.random() - 0.5) * experience.world.floor.depth
    );

    const rotationY = Math.random() * Math.PI * 2;
    const boxSize = { x: 10, y: 10, z: 10 };
    super(position, rotationY, resource, scale, boxSize, false);
  }
  static scale = scale;
  static resourceName = resourceName;

  static snaps = true;
}
