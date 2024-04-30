import Box from "./Box";
import Experience from "../Experience";

let resource;
const scale = 0.1;
export default class House extends Box {
  constructor(position, rotationY) {
    if (!resource) {
      const experience = new Experience();
      const resources = experience.resources;
      resource = resources.items.houseModel;
    }

    super(position, rotationY, resource, scale);
  }

  static getRollOver() {
    if (!resource) {
      const experience = new Experience();
      const resources = experience.resources;
      resource = resources.items.houseModel;
    }
    return resource.scene.deepClone();
  }
  static scale = scale;
}
