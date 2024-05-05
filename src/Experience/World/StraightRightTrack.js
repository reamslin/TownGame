import Track from "./Track";

let trackPieces = [
  "straightTrack1",
  "straightTrack2",
  "straightTrack3",
  "rightTrack",
];
export default class StraightRightTrack extends Track {
  constructor(position, rotationY, boxSize) {
    super(position, rotationY, boxSize, trackPieces);
  }

  static pieces = trackPieces;
}
