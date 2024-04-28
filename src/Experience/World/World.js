import * as THREE from "three";
import Experience from "../Experience.js";
import Floor from "./Floor.js";
import Box from "./Box.js";
import Fox from "./Fox.js";

import Environment from "./Environment.js";

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
      this.fox = new Fox();
      this.boxes = [];
      this.rollOver = new THREE.Mesh(
        new THREE.BoxGeometry(50, 50, 50),
        new THREE.MeshBasicMaterial({
          color: "red",
          opacity: 0.5,
          transparent: true,
        })
      );
      this.rollOver.visible = false;
      this.scene.add(this.rollOver);
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

  update() {
    if (this.fox) this.fox.update();
  }
  onFloor(position) {
    return (
      -500 <= position.x &&
      position.x <= 500 &&
      -500 <= position.z &&
      position.z <= 500
    );
  }
  onPointerMove(event) {
    this.pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    this.raycaster.setFromCamera(this.pointer, this.camera.instance);
    if (!this.isShiftDown) {
      const intersects = this.raycaster.intersectObjects([this.floor.mesh]);
      if (intersects.length > 0) {
        const intersect = intersects[0];

        intersect.point.y = Math.abs(intersect.point.y);
        const newPosition = intersect.point.add(intersect.face.normal);
        newPosition.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
        if (this.onFloor(newPosition)) {
          this.rollOver.position.copy(newPosition);
          this.rollOver.visible = true;
        }
      } else {
        this.rollOver.visible = false;
      }
    } else {
      const intersects = this.raycaster.intersectObjects(
        this.boxes.map((b) => b.mesh)
      );
      if (intersects.length > 0) {
        const intersect = intersects[0];
        this.rollOver.visible = true;
        this.rollOver.position.copy(intersect.object.position);
      } else {
        this.rollOver.visible = false;
      }
    }
  }

  onPointerDown(event) {
    this.pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    this.raycaster.setFromCamera(this.pointer, this.camera.instance);
    if (!this.isShiftDown) {
      const intersects = this.raycaster.intersectObjects([this.rollOver]);
      if (intersects.length > 0) {
        const intersect = intersects[0];
        intersect.point.y = Math.abs(intersect.point.y);
        this.boxes.push(new Box(this.rollOver.position));
      }
    } else {
      const intersects = this.raycaster.intersectObjects(
        this.boxes.map((b) => b.mesh)
      );
      if (intersects.length > 0) {
        const intersect = intersects[0];
        this.scene.remove(intersect.object);
        this.rollOver.visible = false;

        this.boxes.splice(
          this.boxes.findIndex((b) => b.mesh == intersect.object),
          1
        );
      }
    }
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case 16:
        this.isShiftDown = true;
        this.rollOver.visible = false;
        break;
    }
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      case 16:
        this.isShiftDown = false;
        this.rollOver.visible = true;
        this.raycaster.setFromCamera(this.pointer, this.camera.instance);
        const intersects = this.raycaster.intersectObjects([this.floor.mesh]);
        if (intersects.length > 0) {
          const intersect = intersects[0];
          intersect.point.y = Math.abs(intersect.point.y);
          const newPosition = intersect.point.add(intersect.face.normal);
          newPosition.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
          if (this.onFloor(newPosition)) {
            this.rollOver.position.copy(newPosition);
            this.rollOver.visible = true;
          }
        } else {
          this.rollOver.visible = false;
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
    }
  }
}
