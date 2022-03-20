import Chord from '~~/models/chord'
import { FingerDataArray, StringStatus } from '~~/types'

const P = 'PICK'
const V = 'VALID'
const S = 'SKIP'

const USE_6_STANDARD: StringStatus[] = [P, V, V, P, P, P]
const USE_5_STANDARD: StringStatus[] = [S, P, V, P, P, P]
const USE_4_STANDARD: StringStatus[] = [S, S, P, P, P, P]
const USE_5_SKIP_A: StringStatus[] = [P, S, V, P, P, P]
const USE_4_SKIP_A_E: StringStatus[] = [P, S, P, P, P, S]
const USE_4_SKIP_E_E: StringStatus[] = [S, P, P, P, P, S]

const baseChords = {
  // [string, fret, finger]
  F: new Chord('f', 'F', [
    [1, 1, 1],
    [2, 3, 4],
    [3, 3, 5],
    [4, 2, 2],
    [5, 1, 1],
    [6, 1, 1],
  ], USE_6_STANDARD),
  C_OPEN: new Chord('c-open', 'C', [
    [2, 3, 3],
    [3, 2, 2],
    [5, 1, 1],
  ], USE_5_STANDARD),
  G_OPEN: new Chord('g-open', 'G', [
    [1, 3, 3],
    [2, 2, 2],
    [5, 3, 4],
    [6, 3, 5],
  ], USE_6_STANDARD),
  A_OPEN: new Chord('a-open', 'A', [
    [3, 2, 1],
    [4, 2, 2],
    [5, 2, 3],
  ], USE_5_STANDARD),
  D_OPEN: new Chord('d-open', 'D', [
    [4, 2, 1],
    [5, 3, 3],
    [6, 2, 2],
  ], USE_4_STANDARD),
  E_MINOR_OPEN: new Chord('e-minor', 'Em', [
    [2, 2, 1],
    [3, 2, 2],
  ], USE_6_STANDARD),
  NO_CHORD: new Chord('no-chord', 'N/C', [], [S, S, S, S, S, S])
}

const extendedChords = {
  CMAJ7_OPEN_BASS_G_S: baseChords.C_OPEN.extend(
    {
      id: 'cmaj7-open-bass-g-s',
      label: 'Cmaj7',
      add: [[1, 3, 3]] as FingerDataArray[],
      lift: [2, 4],
      pattern: USE_4_SKIP_A_E,
    }
  ),
  G_OPEN_XS: baseChords.G_OPEN.extend({
    id: 'g-open-xs',
    lift: [2, 5],
    pattern: USE_5_SKIP_A
  }),
  G_OPEN_XXS: baseChords.G_OPEN.extend({
    id: 'g-open-xxs',
    lift: [2, 5, 6],
    pattern: USE_4_SKIP_A_E
  }),
  D_SEMI_BARRE: baseChords.D_OPEN.extend({
    id: 'd-semi-barre',
    add: [[5, 3, 2], [6, 2, 1]]
  }),
  D7_OPEN_BASS_C_S: baseChords.D_OPEN.extend({
    id: 'd7-open-bass-c-s',
    label: 'D7/C',
    add: [[2, 3, 3], [4, 2, 2], [5, 1, 1]],
    lift: [6],
    pattern: USE_4_SKIP_E_E,
  }),
  E_MINOR_OPEN_S: baseChords.E_MINOR_OPEN.extend({
    id: 'e-minor-open-s',
    lift: [2],
    add: [[3, 2, 1]],
    pattern: USE_4_SKIP_A_E,
  }),
  A7_OPEN_USE_2ND: baseChords.A_OPEN.extend({
    id: 'a7-open-use-2nd',
    label: 'A7',
    lift: [4],
    add: [[5, 2, 2]],
    pattern: USE_4_SKIP_E_E
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