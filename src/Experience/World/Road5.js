import Box from "./Box";
import Experience from "../Experience";

const resourceName = "road5Model";
let resource;
const scale = 5;
export default class Road5 extends Box {
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
  static offsetY = 0;
}
