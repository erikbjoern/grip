import chords from "@/assets/chords";
import { Song } from "@/types";

const { C_OPEN, F, D_SEMI_BARRE, A_OPEN } = chords

const song: Song = {
  timeSignature: {
    beats: 4,
    denominator: 4,
  },
  measures: [
    [chords.G_OPEN_XXS, chords.G_OPEN_XXS, chords.CMAJ7_OPEN_BASS_G_S, chords.CMAJ7_OPEN_BASS_G_S],
    [chords.G_OPEN_XXS, chords.G_OPEN_XXS, chords.G_OPEN_XXS, chords.G_OPEN_XXS],
    [chords.E_MINOR_OPEN_S, chords.E_MINOR_OPEN_S, chords.A7_OPEN_USE_2_LEAVE_E, chords.A7_OPEN_USE_2_LEAVE_E],
    [chords.D7_OPEN_SUS4, chords.D7_OPEN_SUS4, chords.D7_OPEN, chords.D7_OPEN],
    [chords.C_OPEN, chords.C_OPEN, chords.D7_OPEN_BASS_C_S, chords.D7_OPEN_BASS_C_S],
    [chords.G_OPEN_BASS_B_XS_USE_2_4, chords.G_OPEN_BASS_B_XS_USE_2_4, chords.D7_OPEN_SUS4_BASS_A, chords.G_OPEN_XXS],
    [chords.C_OPEN, chords.G_OPEN_BASS_B_XS_USE_2_4, chords.A_MINOR7_OPEN_LEAVE_E, chords.D7_OPEN_SKIP_E],
    [chords.G_OPEN_XXS, chords.G_OPEN_XXS, chords.G_OPEN_XXS, chords.G_OPEN_XXS,],
    [chords.G_OPEN_XS, chords.G_OPEN_XS, chords.A7_OPEN_BASS_G_S_USE_2_1, chords.A7_OPEN_BASS_G_S_USE_2_1],
    [chords.F_SHARP_MINOR_SKIP_A, chords.F_SHARP_MINOR_SKIP_A, chords.B7_LEAVE_E, chords.B7_LEAVE_E],
    [chords.E_MINOR_OPEN_S, chords.E_MINOR_OPEN_S, chords.A7_OPEN_USE_2_LEAVE_E, chords.A7_OPEN_USE_2_LEAVE_E,],
    [chords.D_OPEN, chords.D_OPEN, chords.D7_OPEN, chords.D7_OPEN],
    [chords.G_OPEN_XS, chords.G_OPEN_XS, chords.A7_OPEN_BASS_G_S_USE_2_1, chords.A7_OPEN_BASS_G_S_USE_2_1],
    [chords.F_SHARP_MINOR_SKIP_A, chords.F_SHARP_MINOR_SKIP_A, chords.B7_LEAVE_E, chords.B7_LEAVE_E],
    [chords.E_MINOR_OPEN_S, chords.D_OPEN_BASS_F_SHARP_USE_T, chords.E_MINOR_BASS_G_SKIP_A_LEAVE_D, chords.A7_OPEN_USE_2_LEAVE_E],
    [chords.D_OPEN, chords.D_OPEN, chords.D7_OPEN, chords.D7_OPEN],
  ]
}

export default song