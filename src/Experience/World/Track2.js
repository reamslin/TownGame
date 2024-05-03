import Box from "./Box";
import Experience from "../Experience";

let resource;
const resourceName = "track2Model";
const scale = 1;
export default class Track2 extends Box {
  constructor(position, rotationY, boxSize) {
    if (!resource) {
      const experience = new Experience();
      const resources = experience.resources;
      resource = resources.items[resourceName];
    }
    super(position, rotationY, resource, scale, boxSize, true, true);
  }
  static scale = scale;
  static resourceName = resourceName;
  static snaps = true;
  static snapsTo = 10;
  static padding = -2;
}
