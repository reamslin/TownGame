import Track from "./Track";

let trackPieces = [
  "straightTrack1",
  "straightTrack2",
  "straightTrack3",
  "leftTrack",
];
export default class StraightLeftTrack extends Track {
  constructor(position, rotationY, boxSize) {
    super(position, rotationY, boxSize, trackPieces);
  }

  static pieces = trackPieces;
}
