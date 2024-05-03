import Box from "./Box";
import Experience from "../Experience";

let resource;
const resourceName = "track3Model";
const scale = 1;
export default class Track3 extends Box {
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
  static snapsTo = 10;
  static padding = -2;
}
