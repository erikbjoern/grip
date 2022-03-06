import Chord from '@/models/chord'
import { StringProperty } from '~~/types'

const P = 'PICK'
const V = 'VALID'
const S = 'SKIP'

const STANDARD_6: StringProperty[] = [P, V, V, P, P, P]
const STANDARD_5: StringProperty[] = [S, P, V, P, P, P]
const STANDARD_4: StringProperty[] = [S, S, P, P, P, P]

const chords: { [key: string]: Chord } = {
  // [string, fret, finger]
  F: new Chord('F', [
    [1, 1, 1],
    [2, 3, 4],
    [3, 3, 5],
    [4, 2, 2],
    [5, 1, 1],
    [6, 1, 1],
  ], STANDARD_6),
  C_OPEN: new Chord('C', [
    [2, 3, 3],
    [3, 2, 2],
    [5, 1, 1],
  ], STANDARD_5),
  G_OPEN_FULL: new Chord('G', [
    [1, 3, 3],
    [2, 2, 2],
    [5, 3, 4],
    [6, 3, 5],
  ], STANDARD_6),
  D_SEMI_BARRE: new Chord('D', [
    [4, 2, 1],
    [5, 3, 2],
    [6, 2, 1],
  ], STANDARD_4),
  A_OPEN: new Chord('A', [
    [3, 2, 1],
    [4, 2, 2],
    [5, 2, 3],
  ], STANDARD_5),
  NO_CHORD: new Chord('N/C', [], [S, S, S, S, S, S])
}

export default chords