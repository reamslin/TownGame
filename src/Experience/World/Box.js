import * as THREE from "three";
import Experience from "../Experience.js";

export default class Box {
  constructor(position, rotationY, resource, scale) {
    this.experience = new Experience();
    this.world = this.experience.world;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.resource = resource ? resource : this.resources.items.houseModel;
    this.scale = scale ? scale : 0.1;
    this.setModel(position, rotationY);
  }

  setModel(position, rotationY) {
    this.resource ? this.resource : this.resources.items.houseModel;
    this.mesh = new THREE.Object3D();
    console.log(this.resource);
    this.mesh.copy(this.resource.scene);
    this.mesh.scale.set(this.scale, this.scale, this.scale);
    this.setBoundingBox();
    this.boxSize = { ...this.world.rollOver.boxSize };
    this.group = new THREE.Group();
    this.group.add(this.mesh);
    this.scene.add(this.group);

    this.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = false;
      }
    });
    this.group.position.copy(position);
    this.group.rotation.y = rotationY;
  }

  setBoundingBox() {
    this.mesh.boundingBox = new THREE.Box3().setFromObject(this.mesh);
    let c = this.mesh.boundingBox.getCenter(new THREE.Vector3());
    let size = this.mesh.boundingBox.getSize(new THREE.Vector3());
    this.mesh.position.set(-c.x, size.y / 2 - c.y, -c.z);
    if (this.squareBox) {
      this.setSquareBoundingBox();
    }
  }

  setSquareBoundingBox() {
    this.mesh.boundingBox.expandByPoint(
      new THREE.Vector3(
        this.mesh.boundingBox.max.z,
        this.mesh.boundingBox.max.y,
        this.mesh.boundingBox.max.x
      )
    );
    this.mesh.boundingBox.expandByPoint(
      new THREE.Vector3(
        this.mesh.boundingBox.min.z,
        this.mesh.boundingBox.min.y,
        this.mesh.boundingBox.min.x
      )
    );
    this.mesh.boundingBox.expandByPoint(
      new THREE.Vector3(
        -this.mesh.boundingBox.min.z,
        this.mesh.boundingBox.min.y,
        -this.mesh.boundingBox.min.x
      )
    );
    this.mesh.boundingBox.expandByPoint(
      new THREE.Vector3(
        -this.mesh.boundingBox.max.z,
        this.mesh.boundingBox.max.y,
        -this.mesh.boundingBox.max.x
      )
    );
  }
}
