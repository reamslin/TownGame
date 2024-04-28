import * as THREE from "three";
import Experience from "./Experience";
import EventEmitter from "./Utils/EventEmitter";

export default class Controls extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.world = this.experience.world;
    this.floor = this.world.floor;
    this.camera = this.experience.camera;
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
      this.rollOver.position.copy(intersect.point).add(intersect.face.normal);
      this.rollOver.position
        .divideScalar(50)
        .floor()
        .multiplyScalar(50)
        .addScalar(25);
    }

    this.trigger("pointermove");
  }

  onPointerDown(event) {
    this.pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    this.raycaster.setFromCamera(this.pointer, this.camera.instance);
    this.trigger("pointerdown");
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case 16:
        this.isShiftDown = true;
        break;
    }
  }

  onKeyUp(event) {
    switch (event.keyCode) {
      case 16:
        this.isShiftDown = false;
        break;
    }
  }

  getIntersects(objects) {
    return this.raycaster.intersectObjects(objects, false);
  }
}
