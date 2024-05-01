import Box from "./Box";
import Experience from "../Experience";

const resourceName = "factoryModel";
let resource;
const scale = 10;
export default class Factory extends Box {
  constructor(position, rotationY) {
    if (!resource) {
      const experience = new Experience();
      const resources = experience.resources;
      resource = resources.items[resourceName];
    }

    super(position, rotationY, resource, scale);
  }
  static scale = scale;
  static resourceName = resourceName;
  static squareBox = false;
  static snaps = true;
  static padding = 0;
}
