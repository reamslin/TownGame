import Box from "./Box";
import Experience from "../Experience";

let resource;
const resourceName = "houseModel";
const scale = 0.1;
export default class House extends Box {
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
