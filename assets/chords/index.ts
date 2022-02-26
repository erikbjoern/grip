import Chord from '@/models/chord'

const chords: { [key: string]: Chord } = {
  G_OPEN_FULL: new Chord('G', [
    [1,3,3],
    [2,2,2],
    [5,3,4],
    [6,3,5],
  ]),
  C_OPEN: new Chord('C', [
    [2,3,3],
    [3,2,2],
    [5,1,1], 
  ],
  [1])
}

export default chords