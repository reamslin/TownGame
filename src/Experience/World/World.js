import * as THREE from "three";
import Experience from "../Experience.js";
import Floor from "./Floor.js";
import House from "./House.js";
import Track from "./Track.js";
import Track2 from "./Track2.js";
import Track3 from "./Track3.js";
import Factory from "./Factory.js";
import Church from "./Church.js";
import Mansion from "./Mansion.js";
import School from "./School.js";

import Environment from "./Environment.js";
import RollOver from "./RollOver.js";
import Pub from "./Pub.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
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
    if (this.rollOver) {
      this.scene.remove(this.rollOver.group);
    }
    this.rollOver = new RollOver(this.object);
  }

  onPointerMove(event) {
    this.pointer.set(
      (event.clientX / this.sizes.width) * 2 - 1,
      -(event.clientY / this.sizes.height) * 2 + 1
    );

    this.raycaster.setFromCamera(this.pointer, this.camera.instance);
    const intersects = this.raycaster.intersectObjects([this.floor.mesh]);
    if (intersects.length > 0) {
      const intersect = intersects[0];
      this.rollOver.setNewPosition(intersect);
      if (this.rollOver.onFloor()) {
        const box = this.rollOver.collisionDetection();
        if (box) {
          if (this.isShiftDown) {
            if (box instanceof this.object) {
              this.rollOver.box = box;
              this.rollOver.group.rotation.copy(box.group.rotation);
              this.rollOver.group.position.copy(box.group.position);
              this.rollOver.mesh.visible = true;
            } else {
              this.rollOver.box = null;
              this.rollOver.mesh.visible = false;
            }
          } else {
            if (box instanceof this.object) {
              this.rollOver.box = box;
              this.rollOver.mesh.visible = false;
            } else {
              this.rollOver.box = null;
              this.rollOver.mesh.visible = false;
            }
          }
        } else {
          if (this.isShiftDown) {
            this.rollOver.box = null;
            this.rollOver.mesh.visible = false;
          } else {
            this.rollOver.box = null;
            this.rollOver.mesh.visible = true;
          }
        }
      } else {
        this.rollOver.mesh.visible = false;
      }
    }
  }

  onPointerDown() {
    if (this.rollOver.mesh.visible) {
      if (this.rollOver.box) {
        if (this.isShiftDown) {
          this.scene.remove(this.rollOver.box.group);
          // dispose mesh?
          this.boxes.splice(
            this.boxes.findIndex((b) => b === this.rollOver.box),
            1
          );
          this.rollOver.mesh.visible = false;
        }
      } else {
        const newBox = new this.object(
          { ...this.rollOver.group.position },
          this.rollOver.group.rotation.y,
          { ...this.rollOver.boxSize }
        );
        this.boxes.push(newBox);
        this.rollOver.box = newBox;
        this.rollOver.mesh.visible = false;
      }
    }
  }

  nextObject() {
    switch (this.object) {
      case House:
        this.object = Church;
        break;
      case Church:
        this.object = School;
        break;
      case School:
        this.object = Factory;
        break;
      case Factory:
        this.object = Mansion;
        break;
      case Mansion:
        this.object = Pub;
        break;
      case Pub:
        this.object = Track;
        break;
      case Track:
        this.object = Track2;
        break;
      case Track2:
        this.object = Track3;
        break;
      case Track3:
        this.object = House;
        break;
    }
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case 16:
        this.isShiftDown = true;
        this.rollOver.mesh.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.color = new THREE.Color("red");
          }
        });
        if (this.rollOver.box) {
          this.rollOver.group.rotation.copy(this.rollOver.box.group.rotation);
          this.rollOver.mesh.visible = true;
        } else {
          this.rollOver.mesh.visible = false;
        }
        break;
    }
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      case 16:
        this.isShiftDown = false;
        this.rollOver.mesh.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.color = new THREE.Color("green");
          }
        });
        if (this.rollOver.box) {
          this.rollOver.mesh.visible = false;
        } else {
          this.rollOver.mesh.visible = true;
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
        this.rollOver.rotate();
        break;
      case 67:
        this.experience.switchCamera();
        break;
      case 190:
        this.nextObject();
        this.setRollOver();
    }
  }
}
