import River from "./River";

let trackPieces = ["left"];
export default class CurveRiver extends River {
  constructor(position, rotationY, boxSize) {
    super(position, rotationY, boxSize, trackPieces);
  }

  static pieces = trackPieces;
}
