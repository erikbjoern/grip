import Chord from '~~/models/chord'
import { FingerDataArray, StringStatus } from '~~/types'

const P = 'PICK'
const V = 'VALID'
const S = 'SKIP'

const E_D_G_B: StringStatus[] = [P, S, P, P, P, S]
const E_D_G_B_LEAVE_E: StringStatus[] = [P, S, P, P, P, V]
const E_G_B_E_LEAVE_A_D: StringStatus[] = [P, V, V, P, P, P]
const E_G_B_E_LEAVE_D: StringStatus[] = [P, S, V, P, P, P]
const E_G_B_E: StringStatus[] = [P, S, S, P, P, P]
const A_D_G_B_LEAVE_E: StringStatus[] = [S, P, P, P, P, V]
const A_D_G_B: StringStatus[] = [S, P, P, P, P, S]
const A_G_B_E_LEAVE_D: StringStatus[] = [S, P, V, P, P, P]
const D_G_B_E: StringStatus[] = [S, S, P, P, P, P]
const D_G_B: StringStatus[] = [S, S, P, P, P, S]

const baseChords = {
  // [string, fret, finger]
  F: new Chord('f', 'F', [
    [1, 1, 1],
    [2, 3, 3],
    [3, 3, 4],
    [4, 2, 2],
    [5, 1, 1],
    [6, 1, 1],
  ], E_G_B_E_LEAVE_A_D),
  C_OPEN: new Chord('c-open', 'C', [
    [2, 3, 3],
    [3, 2, 2],
    [5, 1, 1],
  ], A_G_B_E_LEAVE_D),
  G_OPEN: new Chord('g-open', 'G', [
    [1, 3, 2],
    [2, 2, 1],
    [5, 3, 3],
    [6, 3, 4],
  ], E_G_B_E_LEAVE_A_D),
  D_OPEN: new Chord('d-open', 'D', [
    [4, 2, 1],
    [5, 3, 3],
    [6, 2, 2],
  ], D_G_B_E),
  A_OPEN: new Chord('a-open', 'A', [
    [3, 2, 1],
    [4, 2, 2],
    [5, 2, 3],
  ], A_G_B_E_LEAVE_D),
  A_MINOR_OPEN: new Chord('a-minor-open', 'Am', [
    [3, 2, 2],
    [4, 2, 3],
    [5, 1, 1],
  ], A_G_B_E_LEAVE_D),
  E_MINOR_OPEN: new Chord('e-minor-open', 'Em', [
    [2, 2, 1],
    [3, 2, 2],
  ], E_G_B_E_LEAVE_A_D),
  B: new Chord('b', 'B', [
    [2, 2, 1],
    [3, 4, 2],
    [4, 4, 3],
    [5, 4, 4],
    [6, 2, 1],
  ], A_G_B_E_LEAVE_D),
  F_SHARP_MINOR: new Chord('f-sharp-minor', 'F#m', [
    [1, 2, 1],
    [2, 4, 3],
    [3, 4, 4],
    [4, 2, 1],
    [5, 2, 1],
    [6, 2, 1],
  ], E_G_B_E_LEAVE_A_D),
  NO_CHORD: new Chord('no-chord', 'N/C', [], [S, S, S, S, S, S])
}

const extendedChords = {
  C_OPEN_LEAVE_E: baseChords.C_OPEN.extend({
    id: 'c-open-leave-e',
    pattern: A_D_G_B_LEAVE_E,
  }),
  CMAJ7_OPEN_BASS_G_S: baseChords.C_OPEN.extend({
    id: 'cmaj7-open-bass-g-s',
    label: 'Cmaj7/G',
    add: [[1, 3, 2], [3,2,1]] as FingerDataArray[],
    lift: [2, 5],
    pattern: E_D_G_B,
  }),
  G_OPEN_XS: baseChords.G_OPEN.extend({
    id: 'g-open-xs',
    lift: [2, 5],
    pattern: E_G_B_E_LEAVE_D
  }),
  G_OPEN_XXS: baseChords.G_OPEN.extend({
    id: 'g-open-xxs',
    lift: [2, 5, 6],
    add: [[1, 3, 2]],
    pattern: E_D_G_B
  }),
  G_OPEN_SUS2_XS: baseChords.G_OPEN.extend({
    id: 'g-open-sus2-xs',
    label: 'Gsus2',
    lift: [2, 5, 6],
    add: [[1, 3, 2], [4,2,1]],
    pattern: E_D_G_B
  }),
  G_OPEN_BASS_B_XS_USE_2_4: baseChords.G_OPEN.extend({
    id: 'g-open-bass-b-xs-use-2-4',
    label: 'G/B',
    lift: [1, 6],
    pattern: A_D_G_B
  }),
  D_SEMI_BARRE: baseChords.D_OPEN.extend({
    id: 'd-semi-barre',
    add: [[5, 3, 2], [6, 2, 1]]
  }),
  D_OPEN_SUS4: baseChords.D_OPEN.extend({
    id: 'd-open-sus4',
    label: 'Dsus4',
    add: [[6, 3, 4]],
  }),
  D_OPEN_BASS_F_SHARP_USE_T: baseChords.D_OPEN.extend({
    id: 'd-open-bass-f-sharp-use-t',
    label: 'D/F#',
    add: [[1, 2, 'T']],
    pattern: E_G_B_E_LEAVE_A_D,
  }),
  D7_OPEN: baseChords.D_OPEN.extend({
    id: 'd7-open',
    label: 'D7',
    add: [[4, 2, 2], [5, 1, 1], [6, 2, 3]]
  }),
  D7_OPEN_SKIP_E: baseChords.D_OPEN.extend({
    id: 'd7-open-skip-e',
    label: 'D7',
    lift: [6],
    add: [[4, 2, 2,], [5, 1, 1]],
    pattern: D_G_B,
  }),
  D7_OPEN_SUS4: baseChords.D_OPEN.extend({
    id: 'd7-open-sus4',
    label: 'D7sus4',
    add: [[4, 2, 2], [5, 1, 1], [6, 3, 5]]
  }),
  D7_OPEN_SUS4_BASS_A: baseChords.D_OPEN.extend({
    id: 'd7-open-sus4-bass-a',
    label: 'D7sus4/A',
    lift: [4, 6],
    add: [[5, 1, 1]],
    pattern: A_D_G_B,
  }),
  D7_OPEN_BASS_C_S: baseChords.D_OPEN.extend({
    id: 'd7-open-bass-c-s',
    label: 'D7/C',
    add: [[2, 3, 3], [4, 2, 2], [5, 1, 1]],
    lift: [6],
    pattern: A_D_G_B,
  }),
  A_MINOR7_OPEN_LEAVE_E: baseChords.A_MINOR_OPEN.extend({
    id: 'a-minor7-open-leave-e',
    label: 'Am7',
    lift: [4],
    pattern: A_D_G_B_LEAVE_E,
  }),
  A7_OPEN_USE_2_LEAVE_E: baseChords.A_OPEN.extend({
    id: 'a7-open-use-2',
    label: 'A7',
    lift: [4],
    add: [[5, 2, 2]],
    pattern: A_D_G_B_LEAVE_E
  }),
  A7_OPEN_BASS_G_S_USE_2_1: baseChords.A_OPEN.extend({
    id: 'a7-open-bass-g-s-use-2-1',
    label: 'A7/G',
    lift: [3, 4],
    add: [[1, 3, 2], [5, 2, 1]],
    pattern: E_G_B_E,
  }),
  E_MINOR_OPEN_S: baseChords.E_MINOR_OPEN.extend({
    id: 'e-minor-open-s',
    lift: [2],
    add: [[3, 2, 1]],
    pattern: E_D_G_B_LEAVE_E,
  }),
  E_MINOR_BASS_G: baseChords.E_MINOR_OPEN.extend({
    id: 'e-minor-bass-g',
    label: 'Em/G',
    add: [[1, 3, 3]]
  }),
  E_MINOR_BASS_G_SKIP_A_LEAVE_D: baseChords.E_MINOR_OPEN.extend({
    id: 'e-minor-bass-g-skip-a-leave-d',
    label: 'Em/G',
    lift: [2],
    add: [[1, 3, 3], [3, 2, 1]],
    pattern: E_G_B_E_LEAVE_D,
  }),
  B7_LEAVE_E: baseChords.B.extend({
    id: 'b7-leave-e',
    label: 'B7',
    add: [[4, 2, 1]],
    pattern: A_D_G_B_LEAVE_E,
  }),
  F_SHARP_MINOR_SKIP_A: baseChords.F_SHARP_MINOR.extend({
    id: 'f-sharp-minor-skip-a',
    add: [[2, 2, 1], [3, 4, 3]],
    pattern: E_G_B_E_LEAVE_D,
  }),
}

const chordIds = Object.values(baseChords).map(c => c.id)

for (const id of chordIds) {
  if (chordIds.indexOf(id) !== chordIds.lastIndexOf(id)) {
    console.error(`id "${id}" is not unique`)
    break
  }
}

export default { ...baseChords, ...extendedChords }