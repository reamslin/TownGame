import Box from "./Box";
import Experience from "../Experience";
import * as THREE from "three";

let resource;
const resourceName = "trackModel";
const scale = 0.5;
export default class Track extends Box {
  constructor(position, rotationY, boxSize, trackPieces) {
    if (!resource) {
      const experience = new Experience();
      const resources = experience.resources;
      resource = resources.items[resourceName];
    }
    super(position, rotationY, resource, scale, boxSize);
    this.trackPieces = trackPieces;
    this.setMesh();
  }
  static scale = scale;
  static resourceName = resourceName;
  static snaps = true;
  static type = THREE.Mesh;
  setMesh() {
    this.mesh.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        !this.trackPieces.includes(child.name)
      ) {
        child.visible = false;
      }
    });
  }
}
