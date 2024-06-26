import EventEmitter from "./EventEmitter.js";

export default class Sizes extends EventEmitter {
  constructor(width, height) {
    super();

    // Setup
    this.width = width;
    this.height = height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.aspectRatio = this.width / this.height;

    // Resize event
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.aspectRatio = this.width / this.height;
      this.trigger("resize");
    });
  }
}
