import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter {
  constructor() {
    super();

    // Setup
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    this.frameRateSlowdown = 50;

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
  timeout = null;
  tick() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.handleTick(), this.frameRateSlowdown);
  }

  handleTick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger("tick");

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
