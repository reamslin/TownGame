import Box from "./Box";
import Experience from "../Experience";

let resource;
const resourceName = "schoolModel";
const scale = 0.35;
export default class School extends Box {
  constructor(position, rotationY, boxSize) {
    if (!resource) {
      const experience = new Experience();
      const resources = experience.resources;
      resource = resources.items[resourceName];
    }
    super(position, rotationY, resource, scale, boxSize);
  }
  static scale = scale;
  static resourceName = resourceName;
  static snaps = true;
  static padding = 0;
  static offsetY = -2;
}
