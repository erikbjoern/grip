import chords from "@/assets/chords";
import { Song } from "@/types";

const { G_OPEN_FULL, G_OPEN_MINI, C_OPEN, F, D_SEMI_BARRE, A_OPEN } = chords

const song: Song = {
  timeSignature: {
    beats: 4,
    denominator: 4,
  },
  measures: [
    [A_OPEN, A_OPEN, A_OPEN, A_OPEN],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [A_OPEN, A_OPEN, A_OPEN, A_OPEN],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [A_OPEN, C_OPEN, A_OPEN, C_OPEN],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [F, D_SEMI_BARRE],
    [A_OPEN, A_OPEN, A_OPEN, A_OPEN],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [A_OPEN, A_OPEN, A_OPEN, A_OPEN],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [
      { primaryChord: G_OPEN_FULL, alternativeChords: [G_OPEN_MINI, C_OPEN, D_SEMI_BARRE] },
      { primaryChord: C_OPEN, alternativeChords: [] },
      G_OPEN_FULL, C_OPEN
    ],
    [C_OPEN, C_OPEN, A_OPEN, C_OPEN],
    [F, D_SEMI_BARRE]
  ]
}

export default song