import * as THREE from "three";
import Experience from "../Experience.js";
import Floor from "./Floor.js";
import House from "./House.js";
import Factory from "./Factory.js";
import { OBB } from "three/addons/math/OBB.js";
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
      this.object = House;
      this.boxes = [];
      this.setRollOver();
      this.raycaster = new THREE.Raycaster();
      this.pointer = new THREE.Vector2();
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
    this.scene.remove(this.gridHelper);
    this.scene.remove(this.rollOver);
    this.scene.remove(this.boxHelper);
    this.rollOver = this.object.getRollOver();
    this.rollOver.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.color = new THREE.Color("green");
        child.material.transparent = true;
        child.material.opacity = 0.5;
      }
    });
    this.rollOver.scale.set(
      this.object.scale,
      this.object.scale,
      this.object.scale
    );
    this.rollOver.visible = false;
    this.rollOver.boundingBox = new THREE.Box3().setFromObject(this.rollOver);
    this.rollOver.boundingBox.expandByPoint(
      new THREE.Vector3(
        this.rollOver.boundingBox.max.z,
        this.rollOver.boundingBox.max.y,
        this.rollOver.boundingBox.max.x
      )
    );
    this.rollOver.boundingBox.expandByPoint(
      new THREE.Vector3(
        this.rollOver.boundingBox.min.z,
        this.rollOver.boundingBox.min.y,
        this.rollOver.boundingBox.min.x
      )
    );
    this.rollOver.boundingBox.expandByPoint(
      new THREE.Vector3(
        -this.rollOver.boundingBox.min.z,
        this.rollOver.boundingBox.min.y,
        -this.rollOver.boundingBox.min.x
      )
    );
    this.rollOver.boundingBox.expandByPoint(
      new THREE.Vector3(
        -this.rollOver.boundingBox.max.z,
        this.rollOver.boundingBox.max.y,
        -this.rollOver.boundingBox.max.x
      )
    );
    let c = this.rollOver.boundingBox.getCenter(new THREE.Vector3());
    this.boxSize = this.rollOver.boundingBox.getSize(new THREE.Vector3());
    this.boxSize.x += 10;
    this.boxSize.z += 10;
    this.rollOver.position.set(-c.x, this.boxSize.y / 2 - c.y, -c.z);

    this.boxHelper = new THREE.Mesh(
      new THREE.BoxGeometry(this.boxSize.x, this.boxSize.y, this.boxSize.z),
      new THREE.MeshBasicMaterial({
        wireframe: true,
      })
    );
    this.boxHelper.position.copy(this.rollOver.position);
    this.boxHelper.rotation.copy(this.rollOver.position);

    this.scene.add(this.boxHelper);

    this.scene.add(this.rollOver);
  }

  update() {
    if (this.fox) this.fox.update();
  }
  onFloor() {
    return (
      -((this.floor.width - this.boxSize.x) / 2) < this.rollOver.position.x &&
      this.rollOver.position.x < (this.floor.width - this.boxSize.x) / 2 &&
      -((this.floor.depth - this.boxSize.z) / 2) < this.rollOver.position.z &&
      this.rollOver.position.z < (this.floor.depth - this.boxSize.z) / 2
    );
  }

  noCollision() {
    const intersected = this.boxes.find((box) => {
      const getIntersectingRectangle = (r1, r2) => {
        [r1, r2] = [r1, r2].map((r) => {
          return {
            x: [r.x1, r.x2].sort((a, b) => a - b),
            y: [r.y1, r.y2].sort((a, b) => a - b),
          };
        });
        const noIntersect =
          Math.round(r2.x[0]) >= Math.round(r1.x[1]) ||
          Math.round(r2.x[1]) <= Math.round(r1.x[0]) ||
          Math.round(r2.y[0]) >= Math.round(r1.y[1]) ||
          Math.round(r2.y[1]) <= Math.round(r1.y[0]);

        return noIntersect
          ? false
          : {
              x1: Math.max(r1.x[0], r2.x[0]), // _[0] is the lesser,
              y1: Math.max(r1.y[0], r2.y[0]), // _[1] is the greater
              x2: Math.min(r1.x[1], r2.x[1]),
              y2: Math.min(r1.y[1], r2.y[1]),
            };
      };
      const intersect = getIntersectingRectangle(
        {
          x1: box.mesh.position.x + box.boxSize.x / 2,
          y1: box.mesh.position.z + box.boxSize.z / 2,
          x2: box.mesh.position.x - box.boxSize.x / 2,
          y2: box.mesh.position.z - box.boxSize.z / 2,
        },
        {
          x1: this.rollOver.position.x + this.boxSize.x / 2,
          y1: this.rollOver.position.z + this.boxSize.z / 2,
          x2: this.rollOver.position.x - this.boxSize.x / 2,
          y2: this.rollOver.position.z - this.boxSize.z / 2,
        }
      );
      return intersect ? true : false;
    });
    return intersected ? false : true;
  }
  getNewRollOverPosition(intersect) {
    intersect.point.y = Math.abs(intersect.point.y);
    const newPosition = intersect.point.add(intersect.face.normal);

    newPosition.x /= this.boxSize.x;
    newPosition.z /= this.boxSize.z;
    newPosition.floor();
    newPosition.x *= this.boxSize.x;
    newPosition.z *= this.boxSize.z;
    newPosition.x += this.boxSize.x / 2;
    newPosition.z += this.boxSize.z / 2;
    this.rollOver.position.copy(newPosition);
    this.boxHelper.position.copy(newPosition);
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
      this.getNewRollOverPosition(intersect);
      if (this.isShiftDown) {
        const box = this.boxes.find(
          (b) =>
            Math.floor(b.mesh.position.x) ==
              Math.floor(this.rollOver.position.x) &&
            Math.floor(b.mesh.position.z) ==
              Math.floor(this.rollOver.position.z)
        );
        if (box) {
          this.rollOver.box = box;
          this.rollOver.rotation.copy(box.mesh.rotation);
          this.boxHelper.rotation.copy(box.mesh.rotation);
          this.rollOver.visible = true;
        } else {
          this.rollOver.box = null;
          this.rollOver.visible = false;
        }
      } else {
        if (this.onFloor()) {
          const box = this.boxes.find(
            (b) =>
              Math.floor(b.mesh.position.x) ==
                Math.floor(this.rollOver.position.x) &&
              Math.floor(b.mesh.position.z) ==
                Math.floor(this.rollOver.position.z)
          );
          if (box) {
            this.rollOver.box = box;
            this.rollOver.visible = false;
          } else {
            this.rollOver.box = null;
            if (this.noCollision()) {
              this.rollOver.visible = true;
            } else {
              this.rollOver.visible = false;
            }
          }
        } else {
          this.rollOver.visible = false;
        }
      }
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
        const newBox = new this.object(
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
      case 190:
        this.object = Factory;
        this.setRollOver();
    }
  }
}
