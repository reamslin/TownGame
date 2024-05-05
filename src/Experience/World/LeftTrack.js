import Track from "./Track";

let trackPieces = ["leftTrack"];
export default class LeftTrack extends Track {
  constructor(position, rotationY, boxSize) {
    super(position, rotationY, boxSize, trackPieces);
  }

  static pieces = trackPieces;
}
