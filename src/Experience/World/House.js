import Box from "./Box";
import Experience from "../Experience";

export default class House extends Box {
  constructor(position, rotationY) {
    const experience = new Experience();
    const resources = experience.resources;

    const resource = resources.items.houseModel;
    const scale = 0.1;
    super(position, rotationY, resource, scale);
  }
}
