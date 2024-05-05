import Box from "./Box";
import Experience from "../Experience";

const resourceName = "factoryModel";
let resource;
const scale = 15;
export default class Factory extends Box {
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
  static offsetY = -9.5;
}
