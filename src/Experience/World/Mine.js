import Box from "./Box";
import Experience from "../Experience";

let resource;
const resourceName = "mineModel";
const scale = 0.5;
export default class Mine extends Box {
  constructor(position, rotationY, boxSize) {
    if (!resource) {
      const experience = new Experience();
      const resources = experience.resources;
      resource = resources.items[resourceName];
    }
    super(position, rotationY, resource, scale, boxSize, false);
  }
  static scale = scale;
  static resourceName = resourceName;

  static snaps = true;
  static squareBox = false;
  static offsetY = -16.5;
}
