import { String, Fret, Finger, Grip } from "@/types";

type FingerPositions = (String | Fret | Finger)[][]

export default class Chord {
  private availableStrings: String[] = [1, 2, 3, 4, 5, 6]

  public strings: String[]
  public grip: Grip

  constructor(public label: string, private fingerPositions: FingerPositions, stringsToSkip: String[]) {
    this.strings = this.availableStrings.filter(s => !stringsToSkip.includes(s))

    this.generateGrip()
  }

  private warnIfSameStringOrFingerIsUsedTwice = () => {
    const strings = this.fingerPositions?.map(p => p[0])

    if (new Set(strings).size !== strings.length) {
      console.warn(`Same string is used twice in ${this.label}`)
    }

    if (this.fingerPositions.some((p1) => !!this.fingerPositions.find((p2) => {
      const [fret, finger] = [1, 2]

      return p1[finger] == p2[finger] && p1[fret] !== p2[fret]
    }))) {
      console.warn(`Same finger is used on different frets in ${this.label}`)
    }
  }

  private generateFingerData = (string) => {
    const fingerPosition = this.fingerPositions?.find(p => p[0] == string) || []

    if (fingerPosition?.length > 1 && fingerPosition?.length < 3) {
      console.warn(`Chord ${this.label} is missing data`)
    }

    return {
      [string]: {
        fret: fingerPosition[1],
        finger: fingerPosition[2],
      }
    }
  }

  private generateGrip = () => {
    this.warnIfSameStringOrFingerIsUsedTwice()

    this.grip = Object.assign({}, ...this.availableStrings.map(this.generateFingerData))
  }

  public getChord = () => {
    const { label, grip, strings } = this
    return { label, grip, strings }
  }
}