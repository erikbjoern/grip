import Chord from '@/models/chord'
import { StringProperty } from '~~/types'

const P = 'PICK'
const V = 'VALID'
const S = 'SKIP'

const USE_6_STANDARD: StringProperty[] = [P, V, V, P, P, P]
const USE_5_STANDARD: StringProperty[] = [S, P, V, P, P, P]
const USE_4_STANDARD: StringProperty[] = [S, S, P, P, P, P]
const USE_5_SKIP_A: StringProperty[] = [P, S, V, P, P, P]

const chords = {
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
  G_OPEN_FULL: new Chord('g-open-full', 'G', [
    [1, 3, 3],
    [2, 2, 2],
    [5, 3, 4],
    [6, 3, 5],
  ], USE_6_STANDARD),
  G_OPEN_MINI: new Chord('g-open-mini', 'G', [
    [1, 3, 3],
    [6, 3, 5],
  ], USE_5_SKIP_A),
  D_SEMI_BARRE: new Chord('d-semi-barre', 'D', [
    [4, 2, 1],
    [5, 3, 2],
    [6, 2, 1],
  ], USE_4_STANDARD),
  A_OPEN: new Chord('a-open', 'A', [
    [3, 2, 1],
    [4, 2, 2],
    [5, 2, 3],
  ], USE_5_STANDARD),
  NO_CHORD: new Chord('no-chord', 'N/C', [], [S, S, S, S, S, S])
}

const chordIds = Object.values(chords).map(c => c.id)

for (const id of chordIds) {
  if (chordIds.indexOf(id) !== chordIds.lastIndexOf(id)) {
    console.error(`id "${id}" is not unique`)
    break
  }
}

export default chords