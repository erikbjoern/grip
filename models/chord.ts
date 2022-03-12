import { String, Fret, Finger, Grip, StringProperty } from "@/types";

type FingerPositions = (String | Fret | Finger)[][]

export default class Chord {
  private availableStrings: String[] = [1, 2, 3, 4, 5, 6]

  public grip: Grip

  constructor(public id: string, public label: string, private fingerPositions: FingerPositions, private stringProperties: StringProperty[]) {
    this.generateGrip()
  }

  private warnIfSameStringOrFingerIsUsedTwice = () => {
    const strings = this.fingerPositions?.map(p => p[0])

    if (new Set(strings).size !== strings.length) {
      console.warn(`Same string is used twice in ${this.id}`)
    }

    if (this.fingerPositions.some((p1) => !!this.fingerPositions.find((p2) => {
      const [fret, finger] = [1, 2]

      return p1[finger] == p2[finger] && p1[fret] !== p2[fret]
    }))) {
      console.warn(`Same finger is used on different frets in ${this.id}`)
    }
  }

  private generateFingerData = (string, i) => {
    const fingerPosition = this.fingerPositions?.find(p => p[0] == string) || []

    if (fingerPosition?.length > 1 && fingerPosition?.length < 3) {
      console.warn(`Chord ${this.id} is missing data`)
    }

    return {
      [string]: {
        fret: fingerPosition[1],
        finger: fingerPosition[2],
        status: this.stringProperties[i]
      }
    }
  }

  private generateGrip = () => {
    this.warnIfSameStringOrFingerIsUsedTwice()

    this.grip = Object.assign({}, ...this.availableStrings.map(this.generateFingerData))
  }

  public getChord = () => {
    const { id, label, grip } = this
    return { id, label, grip }
  }
}