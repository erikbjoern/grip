export type Fret = number
export type String = 1 | 2 | 3 | 4 | 5 | 6
export type Finger = 1 | 2 | 3 | 4 | 5
export type FingerData = {
  fret: Fret,
  finger: Finger,
}
export type Grip = { [key in String]: FingerData }
export type Chord = {
  label: string,
  grip: Grip,
  strings: String[]
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