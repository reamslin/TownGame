import * as THREE from "three";
import Experience from "../Experience.js";

export default class Box {
  constructor(position, rotationY, resource, scale, boxSize) {
    this.experience = new Experience();
    this.world = this.experience.world;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.resource = resource ? resource : this.resources.items.houseModel;
    this.scale = scale ? scale : 0.1;
    this.setModel(position, rotationY, boxSize);
  }

  setModel(position, rotationY, boxSize) {
    this.resource ? this.resource : this.resources.items.houseModel;
    this.mesh = new THREE.Object3D();
    console.log(this.resource);
    this.mesh.copy(this.resource.scene);
    this.mesh.scale.set(this.scale, this.scale, this.scale);
    this.setBoundingBox();
    this.boxSize = boxSize;
    this.group = new THREE.Group();
    this.group.add(this.mesh);
    this.scene.add(this.group);

    this.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
    this.group.position.copy(position);
    this.group.rotation.y = rotationY;
  }

  setBoundingBox() {
    this.mesh.boundingBox = new THREE.Box3().setFromObject(this.mesh);
    this.center = this.mesh.boundingBox.getCenter(new THREE.Vector3());
    this.boxSize = this.mesh.boundingBox.getSize(new THREE.Vector3());
    if (this.squareBox) {
      this.setSquareBoundingBox();
    }

    this.boxSize.x = Math.floor(this.boxSize.x);
    this.boxSize.z = Math.floor(this.boxSize.z);
    this.mesh.position.set(
      -this.center.x,
      this.boxSize.y / 2 - this.center.y,
      -this.center.z
    );
  }

  setSquareBoundingBox() {
    const max = Math.max(this.boxSize.x, this.boxSize.z);
    this.boxSize.x = max;
    this.boxSize.z = max;
  }
}
