import Chord from '@/models/chord'

const chords: { [key: string]: Chord } = {
  F: new Chord('F', [
    [1, 1, 1],
    [2, 3, 4],
    [3, 3, 5],
    [4, 2, 2],
    [5, 1, 1],
    [6, 1, 1],
  ], []),
  C_OPEN: new Chord('C', [
    [2, 3, 3],
    [3, 2, 2],
    [5, 1, 1],
  ], [1]),
  G_OPEN_FULL: new Chord('G', [
    [1, 3, 3],
    [2, 2, 2],
    [5, 3, 4],
    [6, 3, 5],
  ], []),
  D_SEMI_BARRE: new Chord('D', [
    [4, 2, 1],
    [5, 3, 2],
    [6, 2, 1],
  ], [1, 2]),
  A_OPEN: new Chord('A', [
    [3, 2, 1],
    [4, 2, 2],
    [5, 2, 3],
  ], [1])
}

export default chords