import Box from "./Box";
import Experience from "../Experience";

let resource;
const resourceName = "storeModel";
const scale = 0.25;
export default class Store extends Box {
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
  static snapsTo = 100;
  static offsetY = 0;
}
