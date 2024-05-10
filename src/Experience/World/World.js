import * as THREE from "three";
import Experience from "../Experience.js";
import Floor from "./Floor.js";
import House from "./House.js";
import Tree from "./Tree.js";
import StraightTrack from "./StraightTrack.js";
import LeftTrack from "./LeftTrack.js";
import StraightLeftTrack from "./StraightLeftTrack.js";
import StraightRightTrack from "./StraightRightTrack.js";
import Factory from "./Factory.js";
import Church from "./Church.js";
import Mansion from "./Mansion.js";
import School from "./School.js";
import Mine from "./Mine.js";

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
      this.environment = new Environment();
      this.floor = new Floor();
      this.object = House;
      this.boxes = [];
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());
      this.boxes.push(new Tree());

      this.setRollOver();
      this.raycaster = new THREE.Raycaster();
      this.pointer = new THREE.Vector2();
      this.isShiftDown = false;
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
  timeout = null;
  onPointerMove(event) {
    this.handlePointerMove(event);
    // clearTimeout(this.timeout);
    // this.timeout = setTimeout(() => this.handlePointerMove(event), 50);
  }
  handlePointerMove(event) {
    this.pointer.set(
      (event.clientX / this.sizes.width) * 2 - 1,
      -(event.clientY / this.sizes.height) * 2 + 1
    );

    this.raycaster.setFromCamera(this.pointer, this.camera.instance);
    const intersects = this.raycaster.intersectObjects([this.floor.mesh]);
    if (intersects.length > 0) {
      const intersect = intersects[0];
      const oldPosition = {
        x: this.rollOver.group.position.x,
        z: this.rollOver.group.position.z,
      };
      this.rollOver.setNewPosition(intersect);

      if (
        this.rollOver.group.position.x === oldPosition.x &&
        this.rollOver.group.position.z === oldPosition.z
      ) {
        return;
      }

      if (this.rollOver.onFloor()) {
        console.log("testing for collision");
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
        this.boxes.unshift(newBox);
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
        this.object = Mine;
        break;
      case Mine:
        this.object = StraightTrack;
        break;
      case StraightTrack:
        this.object = LeftTrack;
        break;
      case LeftTrack:
        this.object = StraightLeftTrack;
        break;
      case StraightLeftTrack:
        this.object = StraightRightTrack;
        break;
      case StraightRightTrack:
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
