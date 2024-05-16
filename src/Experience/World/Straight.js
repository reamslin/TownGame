import River from "./River";

let trackPieces = ["straight"];
export default class StraightRiver extends River {
  constructor(position, rotationY, boxSize) {
    super(position, rotationY, boxSize, trackPieces);
  }

  static pieces = trackPieces;
}
