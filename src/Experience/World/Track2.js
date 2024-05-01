import Box from "./Box";
import Experience from "../Experience";

let resource;
const resourceName = "track2Model";
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
  static squareBox = false;
  static snaps = false;
  static padding = -100;
  static rotation = 2;
}
