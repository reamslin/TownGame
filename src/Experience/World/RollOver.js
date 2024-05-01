import * as THREE from "three";
import Track2 from "./Track2.js";
import Experience from "../Experience.js";

export default class RollOver {
  constructor(object) {
    this.object = object;
    this.experience = new Experience();
    this.world = this.experience.world;
    this.scene = this.world.scene;
    this.floor = this.world.floor;
    this.resources = this.experience.resources;

    this.cloneMesh();
    this.setBoundingBox();
    if (!this.collisionDetection()) {
      this.mesh.visible = true;
    }
    if (this.object.rotation) {
      this.group.rotation.y = this.object.rotation;
    }
  }

  cloneMesh() {
    this.resource = this.resources.items[this.object.resourceName];
    this.mesh = this.resource.scene.deepClone();
    this.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.color = new THREE.Color("green");
      }
    });

    this.mesh.scale.set(
      this.object.scale,
      this.object.scale,
      this.object.scale
    );
    this.group = new THREE.Group();
    this.group.add(this.mesh);
    this.scene.add(this.group);
  }

  rotate() {
    this.group.rotation.y -= Math.PI / 2;
    [this.boxSize.z, this.boxSize.x] = [this.boxSize.x, this.boxSize.z];
    this.boxHelper.rotation.copy(this.group.rotation);
  }

  setNewPosition(intersect) {
    intersect.point.y = Math.abs(intersect.point.y);
    let newPosition = intersect.point.add(intersect.face.normal);
    if (this.object.snaps) {
      const min = Math.min(this.boxSize.x, this.boxSize.z);
      newPosition.x /= min;
      newPosition.z /= min;
      newPosition.floor();
      newPosition.y = 0;
      newPosition.x *= min;
      newPosition.z *= min;
      newPosition.x += min / 2;
      newPosition.z += min / 2;
    }
    this.group.position.copy(newPosition);
    this.boxHelper.position.copy(newPosition);
  }

  onFloor() {
    return (
      -((this.floor.width - this.boxSize.x) / 2) < this.group.position.x &&
      this.group.position.x < (this.floor.width - this.boxSize.x) / 2 &&
      -((this.floor.depth - this.boxSize.z) / 2) < this.group.position.z &&
      this.group.position.z < (this.floor.depth - this.boxSize.z) / 2
    );
  }
  collisionDetection() {
    const intersected = this.world.boxes.find((box) => {
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

        if (!noIntersect) {
          console.log(r1, r2);
        }
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
          x1: box.group.position.x + box.boxSize.x / 2,
          y1: box.group.position.z + box.boxSize.z / 2,
          x2: box.group.position.x - box.boxSize.x / 2,
          y2: box.group.position.z - box.boxSize.z / 2,
        },
        {
          x1: this.group.position.x + this.boxSize.x / 2,
          y1: this.group.position.z + this.boxSize.z / 2,
          x2: this.group.position.x - this.boxSize.x / 2,
          y2: this.group.position.z - this.boxSize.z / 2,
        }
      );
      return intersect ? box : false;
    });
    return intersected ? intersected : false;
  }

  setBoundingBox() {
    this.mesh.boundingBox = new THREE.Box3().setFromObject(this.mesh);
    this.center = this.mesh.boundingBox.getCenter(new THREE.Vector3());
    this.boxSize = this.mesh.boundingBox.getSize(new THREE.Vector3());
    this.mesh.position.set(
      -this.center.x,
      this.boxSize.y / 2 - this.center.y,
      -this.center.z
    );

    this.boxSize = this.mesh.boundingBox.getSize(new THREE.Vector3());
    if (this.object.squareBox) {
      this.setSquareBoundingBox();
    }
    this.boxSize.x += this.object.padding;
    this.boxSize.z += this.object.padding;
    this.boxHelper = new THREE.Mesh(
      new THREE.BoxGeometry(this.boxSize.x, this.boxSize.y, this.boxSize.z),
      new THREE.MeshBasicMaterial({
        wireframe: true,
      })
    );

    this.scene.add(this.boxHelper);
  }

  setSquareBoundingBox() {
    const max = Math.max(this.boxSize.x, this.boxSize.z);
    this.boxSize.x = max;
    this.boxSize.z = max;
  }
}

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
