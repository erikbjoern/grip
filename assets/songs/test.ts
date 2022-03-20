import chords from "@/assets/chords";
import { Song } from "@/types";

const { G_OPEN, C_OPEN, F, D_SEMI_BARRE, A_OPEN, CMAJ7_OPEN_BASS_G_S } = chords

const song: Song = {
  timeSignature: {
    beats: 4,
    denominator: 4,
  },
  measures: [
    [G_OPEN, G_OPEN, G_OPEN, G_OPEN],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [G_OPEN, G_OPEN, G_OPEN, G_OPEN],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [G_OPEN, C_OPEN, G_OPEN, C_OPEN],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [F, D_SEMI_BARRE, CMAJ7_OPEN_BASS_G_S],
    [G_OPEN, G_OPEN, G_OPEN, G_OPEN],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [G_OPEN, G_OPEN, G_OPEN, G_OPEN],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [G_OPEN, C_OPEN, G_OPEN, C_OPEN],
    [C_OPEN, C_OPEN, A_OPEN, C_OPEN],
    [F, D_SEMI_BARRE]
  ]
}

export default song