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
import Store from "./Store.js";
import Prison from "./Prison.js";
import Tenement from "./Tenement.js";
import TrainStation from "./TrainStation.js";
import Hospital from "./Hospital.js";
import Theater from "./Theater.js";
import Museum from "./Museum.js";
import Cemetery from "./Cemetery.js";
import River from "./River.js";
import Road1 from "./Road1.js";
import Road2 from "./Road2.js";
import Road3 from "./Road3.js";
import Road4 from "./Road4.js";
import Road5 from "./Road5.js";
import Canal from "./Canal.js";
import Round from "./Round.js";
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
      this.river = new River();
      this.canal = new Canal();
      this.boxes.push(this.river);
      this.boxes.push(this.canal);
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());
      // this.boxes.push(new Tree());

      this.setRollOver();
      this.raycaster = new THREE.Raycaster();
      this.pointer = new THREE.Vector2();
      this.isShiftDown = false;

      this.story = document.querySelector(".story");
      this.containerBoundingBox = this.story.getBoundingClientRect();
      this.containerWidth = this.containerBoundingBox.width;
      this.containerHeight = this.containerBoundingBox.height;

      this.objectVideoElement = document.querySelector("video");
      this.objectSourceElement = document.querySelector("source");
      this.objectTitleElement = document.querySelector(".selectedobject");
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
      const objectbuttons = document.querySelectorAll(".object");

      objectbuttons.forEach((b) => {
        b.addEventListener("click", (event) => {
          this.changeObject(event.target.id);
        });
      });

      const controlbuttons = document.querySelectorAll(".control");

      controlbuttons.forEach((b) => {
        b.addEventListener("click", (event) => {
          this.fireControl(event.target.id);
        });
      });
    });
  }

  fireControl(id) {
    switch (id) {
      case "entertown":
        this.experience.switchCamera();
        break;
      case "rotatecamera":
        this.camera.rotate();
        break;
      case "zoomin":
        this.camera.zoomIn();
        break;
      case "zoomout":
        this.camera.zoomOut();
        break;
      case "moveup":
        if (this.experience.camera == this.experience.isometricCamera)
          this.camera.truck("up");
        break;
      case "movedown":
        if (this.experience.camera == this.experience.isometricCamera)
          this.camera.truck("down");
        break;
      case "moveleft":
        if (this.experience.camera == this.experience.isometricCamera)
          this.camera.truck("left");
        break;
      case "moveright":
        if (this.experience.camera == this.experience.isometricCamera)
          this.camera.truck("right");
        break;
    }
  }

  changeObject(id) {
    switch (id) {
      case "house":
        this.object = House;
        this.objectSourceElement.src = "house.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "House";
        break;
      case "school":
        this.object = School;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "School";
        break;
      case "church":
        this.object = Church;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Church";
        break;
      case "factory":
        this.object = Factory;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Factory";
        break;
      case "hospital":
        this.object = Hospital;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Hospital";
        break;
      case "mansion":
        this.object = Mansion;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Mansion";
        break;
      case "straighttrack":
        this.object = StraightTrack;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Straight Track";
        break;
      case "turntrack":
        this.object = LeftTrack;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Left Track";
        break;
      case "straightlefttrack":
        this.object = StraightLeftTrack;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Straight Left Track";
        break;
      case "straightrighttrack":
        this.object = StraightRightTrack;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Straight Right Track";
        break;
      case "mine":
        this.object = Mine;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Mine";
        break;
      case "trainstation":
        this.object = TrainStation;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Train Station";
        break;
      case "pub":
        this.object = Pub;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Pub";
        break;
      case "jail":
        this.object = Prison;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Jail";
        break;
      case "museum":
        this.object = Museum;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Museum";
        break;
      case "store":
        this.object = Store;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Store";
        break;
      case "theater":
        this.object = Theater;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Theater";
        break;
      case "tenement":
        this.object = Tenement;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Tenement";
        break;
      case "cemetery":
        this.object = Cemetery;
        this.objectSourceElement.src = "school.mp4";
        this.objectVideoElement.load();
        this.objectTitleElement.innerText = "Cemetery";
        break;
    }
    this.setRollOver();
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
    if (
      event.target.classList[0] == "webgl" &&
      this.experience.camera == this.experience.isometricCamera
    ) {
      this.pointer.set(
        ((event.clientX - this.containerWidth) / this.sizes.width) * 2 - 1,
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
    } else {
      this.rollOver.mesh.visible = false;
    }
  }

  onPointerDown(event) {
    if (
      event.target.classList[0] == "webgl" &&
      this.experience.camera == this.experience.isometricCamera
    ) {
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
  }

  onKeyDown(event) {
    if (
      event.target.classList[0] == "webgl" &&
      this.experience.camera == this.experience.isometricCamera
    ) {
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
        case 37:
          if (this.experience.camera == this.experience.isometricCamera)
            this.camera.truck("left");
          break;
        case 39:
          if (this.experience.camera == this.experience.isometricCamera)
            this.camera.truck("right");
          break;
        case 38:
          if (this.experience.camera == this.experience.isometricCamera)
            this.camera.truck("up");
          break;
        case 40:
          if (this.experience.camera == this.experience.isometricCamera)
            this.camera.truck("down");
      }
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
    }
  }
}
