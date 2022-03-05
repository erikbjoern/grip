import chords from "@/assets/chords";
import { Song } from "@/types";

const { G_OPEN_FULL, C_OPEN, F, D_SEMI_BARRE, A_OPEN } = chords

const song: Song = {
  timeSignature: {
    beats: 4,
    denominator: 4,
  },
  measures: [
    [G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [G_OPEN_FULL, C_OPEN, G_OPEN_FULL, C_OPEN],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [F, D_SEMI_BARRE],
    [G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [G_OPEN_FULL, C_OPEN, G_OPEN_FULL, C_OPEN],
    [C_OPEN, C_OPEN, A_OPEN, C_OPEN],
    [F, D_SEMI_BARRE]
  ]
}

export default song