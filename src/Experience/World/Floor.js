import * as THREE from "three";
import Experience from "../Experience.js";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.width = this.experience.width;
    this.depth = this.experience.depth;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(this.width, this.depth);
  }

  setTextures() {
    this.textures = {};

    this.textures.color = this.resources.items.grassColorTexture;
    this.textures.color.colorSpace = THREE.SRGBColorSpace;
    this.textures.color.repeat.set(10, 10);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal = this.resources.items.grassNormalTexture;
    this.textures.normal.repeat.set(10, 10);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;

    this.textures.arm = this.resources.items.grassArmTexture;
    this.textures.arm.repeat.set(10, 10);
    this.textures.arm.wrapS = THREE.RepeatWrapping;
    this.textures.arm.wrapT = THREE.RepeatWrapping;

    this.textures.disp = this.resources.items.grassDispTexture;
    this.textures.disp.repeat.set(10, 10);
    this.textures.disp.wrapS = THREE.RepeatWrapping;
    this.textures.disp.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
      aoMap: this.textures.arm,
      metalnessMap: this.textures.arm,
      roughnessMap: this.textures.arm,
      displacementMap: this.textures.disp,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.underlay = new THREE.Mesh(
      new THREE.BoxGeometry(this.width, this.depth, 50),
      this.material
    );
    this.mesh.position.y = -0.05;
    this.underlay.rotation.x = -Math.PI / 2;
    this.underlay.position.y = -26;
    // this.gridHelper = new THREE.GridHelper(this.width, this.width / 2);
    // this.scene.add(this.gridHelper);
    this.scene.add(this.mesh, this.underlay);
  }
}
