import Box from "./Box";
import Experience from "../Experience";

let resource;
const resourceName = "track1Model";
const scale = 1;
export default class Track extends Box {
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
  static snaps = true;
  static squareBox = false;
  static padding = -25;
}
