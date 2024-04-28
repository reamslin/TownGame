import * as THREE from "three";
import Experience from "../Experience.js";

let boxTexture = null;
let boxMaterial = null;
const boxGeometry = new THREE.BoxGeometry(50, 50, 50);

export default class Box {
  constructor(position) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    if (!boxTexture || !boxMaterial) {
      boxTexture = this.resources.items.boxTexture;
      boxTexture.colorSpace = THREE.SRGBColorSpace;
      boxMaterial = new THREE.MeshStandardMaterial({
        color: 0xfeb74c,
        map: boxTexture,
      });
    }
    this.setMesh(position);
  }

  setMesh(position) {
    this.mesh = new THREE.Mesh(boxGeometry, boxMaterial);
    this.mesh.position.copy(position);
    this.mesh.castShadow = true;
    this.scene.add(this.mesh);
  }
}
