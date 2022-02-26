import Chord from '@/models/chord'

const chords: { [key: string]: Chord } = {
  G_OPEN_FULL: new Chord('G', [
    [1, 3, 3],
    [2, 2, 2],
    [5, 3, 4],
    [6, 3, 5],
  ],
    []),
  C_OPEN: new Chord('C', [
    [2, 3, 3],
    [3, 2, 2],
    [5, 1, 1],
  ],
    [1]),
  F: new Chord('F', [
    [1, 1, 1],
    [2, 3, 4],
    [3, 3, 5],
    [4, 2, 2],
    [5, 1, 1],
    [6, 1, 1],
  ], []),
  D_SEMI_BARRE: new Chord('D', [
    [4, 2, 1],
    [5, 3, 2],
    [6, 2, 1],
  ], [1, 2])
}

export default chords