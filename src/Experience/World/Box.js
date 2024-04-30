import * as THREE from "three";
import Experience from "../Experience.js";

export default class Box {
  constructor(position, rotationY, resource, scale) {
    this.experience = new Experience();
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
    this.mesh.copy(this.resource.scene);
    this.mesh.scale.set(this.scale, this.scale, this.scale);
    this.setBoundingBox();
    this.scene.add(this.mesh);

    this.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
    this.mesh.position.copy(position);
    this.mesh.rotation.y = rotationY;
    console.log(this.mesh.position, this.experience.world.rollOver.position);
  }

  setBoundingBox() {
    this.mesh.boundingBox = new THREE.Box3().setFromObject(this.mesh);

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

    this.boxSize = this.mesh.boundingBox.getSize(new THREE.Vector3());
  }
}
