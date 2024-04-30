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

  static getRollOver() {
    if (!resource) {
      const experience = new Experience();
      const resources = experience.resources;
      resource = resources.items[resourceName];
    }
    return resource.scene.deepClone();
  }
  static scale = scale;
}
