import Box from "./Box";
import Experience from "../Experience";

let resource;
const resourceName = "trainStationModel";
const scale = 0.5;
export default class TrainStation extends Box {
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
  static squareBox = true;
}
