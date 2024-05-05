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
    console.log(position, trackPieces);
    super(position, rotationY, resource, scale, boxSize);
    console.log(trackPieces);
    this.trackPieces = trackPieces;
    this.setMesh();
  }
  static scale = scale;
  static resourceName = resourceName;
  static snaps = true;

  setMesh() {
    console.log(this);
    this.mesh.traverse((child) => {
      console.log(child);
      if (
        child instanceof THREE.Mesh &&
        !this.trackPieces.includes(child.name)
      ) {
        child.visible = false;
      }
    });
  }
}
