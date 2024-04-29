import * as THREE from "three";
import Experience from "../Experience.js";
import Floor from "./Floor.js";
import House from "./House.js";
import Fox from "./Fox.js";

import Environment from "./Environment.js";
(THREE.Object3D.prototype.deepClone = function (recursive) {
  return new this.constructor().deepCopy(this, recursive);
}),
  (THREE.Object3D.prototype.deepCopy = function (source, recursive) {
    if (recursive === undefined) recursive = true;

    this.name = source.name;

    this.up.copy(source.up);

    this.position.copy(source.position);
    this.quaternion.copy(source.quaternion);
    this.scale.copy(source.scale);

    this.matrix.copy(source.matrix);
    this.matrixWorld.copy(source.matrixWorld);
    if (source.material) {
      //changed
      this.material = source.material.clone();
    }
    if (source.geometry) {
      //changed
      this.geometry = source.geometry.clone();
    }
    this.matrixAutoUpdate = source.matrixAutoUpdate;
    this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

    this.layers.mask = source.layers.mask;
    this.visible = source.visible;

    this.castShadow = source.castShadow;
    this.receiveShadow = source.receiveShadow;

    this.frustumCulled = source.frustumCulled;
    this.renderOrder = source.renderOrder;

    this.userData = JSON.parse(JSON.stringify(source.userData));

    if (recursive === true) {
      for (var i = 0; i < source.children.length; i++) {
        var child = source.children[i];
        this.add(child.deepClone()); //changed
      }
    }

    return this;
  });

export default class World {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.isShiftDown = false;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.floor = new Floor();
      this.boxes = [];
      this.setRollOver();
      this.isShiftDown = false;
      this.environment = new Environment();
      window.addEventListener("mousemove", (event) => {
        this.onPointerMove(event);
      });
      window.addEventListener("mousedown", (event) => {
        this.onPointerDown(event);
      });
      window.addEventListener("keydown", (event) => {
        this.onKeyDown(event);
      });
      window.addEventListener("keyup", (event) => {
        this.onKeyUp(event);
      });
    });
  }

  setRollOver() {
    this.rollOver = this.resources.items.houseModel.scene.deepClone();
    this.rollOver.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.color = new THREE.Color("green");
        child.material.transparent = true;
        child.material.opacity = 0.5;
      }
    });
    this.rollOver.scale.set(0.1, 0.1, 0.1);
    this.rollOver.visible = false;
    this.rollOver.boundingBox = new THREE.Box3().setFromObject(this.rollOver);
    this.boxSize = new THREE.Vector3();
    this.rollOver.boundingBox.getSize(this.boxSize);
    this.boxSize.x += 10;
    this.boxSize.y += 10;
    this.boxSize.z += 10;
    this.scene.add(this.rollOver);
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
  }

  update() {
    if (this.fox) this.fox.update();
  }
  onFloor(position) {
    return (
      -(this.floor.width / 2) <= position.x &&
      position.x <= this.floor.width / 2 &&
      -(this.floor.depth / 2) <= position.z &&
      position.z <= this.floor.depth / 2
    );
  }
  onPointerMove(event) {
    this.pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    this.raycaster.setFromCamera(this.pointer, this.camera.instance);
    const intersects = this.raycaster.intersectObjects([this.floor.mesh]);
    if (intersects.length > 0) {
      const intersect = intersects[0];

      intersect.point.y = Math.abs(intersect.point.y);
      const newPosition = intersect.point.add(intersect.face.normal);

      newPosition.x /= this.boxSize.x;
      newPosition.y /= this.boxSize.y;
      newPosition.z /= this.boxSize.z;
      newPosition.floor();
      newPosition.x *= this.boxSize.x;
      newPosition.y *= this.boxSize.y;
      newPosition.z *= this.boxSize.z;
      newPosition.x += this.boxSize.x / 2;
      newPosition.z += this.boxSize.z / 2;
      if (this.onFloor(newPosition)) {
        this.rollOver.position.copy(newPosition);
        const box = this.boxes.find(
          (b) =>
            b.mesh.position.x == this.rollOver.position.x &&
            b.mesh.position.z == this.rollOver.position.z
        );
        if (box) {
          this.rollOver.box = box;
          if (this.isShiftDown) {
            this.rollOver.rotation.copy(box.mesh.rotation);
            this.rollOver.visible = true;
          } else {
            this.rollOver.visible = false;
          }
        } else {
          this.rollOver.box = null;
          if (this.isShiftDown) {
            this.rollOver.visible = false;
          } else {
            this.rollOver.visible = true;
          }
        }
      } else {
        this.rollOver.visible = false;
      }
    } else {
      this.rollOver.visible = false;
    }
  }

  rotateRollOver() {
    this.rollOver.rotation.y += -Math.PI / 2;
  }

  onPointerDown() {
    if (this.rollOver.visible) {
      if (this.rollOver.box) {
        if (this.isShiftDown) {
          this.scene.remove(this.rollOver.box.mesh);
          // dispose mesh?
          this.boxes.splice(
            this.boxes.findIndex((b) => b === this.rollOver.box),
            1
          );
          this.rollOver.visible = false;
        }
      } else {
        const newBox = new House(
          { ...this.rollOver.position },
          this.rollOver.rotation.y
        );
        this.boxes.push(newBox);
        this.rollOver.box = newBox;
        this.rollOver.visible = false;
      }
    }
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case 16:
        this.isShiftDown = true;
        this.rollOver.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.color = new THREE.Color("red");
          }
        });
        if (this.rollOver.box) {
          this.rollOver.rotation.copy(this.rollOver.box.mesh.rotation);
          this.rollOver.visible = true;
        } else {
          this.rollOver.visible = false;
        }
        break;
    }
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      case 16:
        this.isShiftDown = false;
        this.rollOver.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.color = new THREE.Color("green");
          }
        });
        if (this.rollOver.box) {
          this.rollOver.visible = false;
        } else {
          this.rollOver.visible = true;
        }
        break;
      case 82:
        this.camera.rotate();
        break;
      case 187:
        this.camera.zoomIn();
        break;
      case 189:
        this.camera.zoomOut();
        break;
      case 17:
        this.rotateRollOver();
        break;
      case 67:
        this.experience.switchCamera();
        break;
    }
  }
}
