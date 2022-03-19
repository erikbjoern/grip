import ChordClass from '@/models/chord'

export type FretNum = number
export type StringNum = 1 | 2 | 3 | 4 | 5 | 6
export type FingerNum = 1 | 2 | 3 | 4 | 5
export type FingerData = {
  fret: FretNum,
  finger: FingerNum,
  status: StringStatus
}
export type Grip = { [key in StringNum]: FingerData }
export type Chord = {
  id: string
  label: string,
  grip: Grip,
  strings: StringNum[]
}

export type BarreElementData = {
  finger: number,
  fret: number,
  leftMostString: number,
  width: string,
  height: string,
  top: string,
  left: string,
}

type TimeSignature = {
  beats: number,
  denominator: number
}

type ChordWithAlternatives = {
  primaryChord: ChordClass,
  alternativeChords: ChordClass[]
}

export type Song = {
  timeSignature: TimeSignature,
  measures: (ChordClass | ChordWithAlternatives)[][]
}

export type StringStatus = 'VALID' | 'PICK' | 'SKIP'