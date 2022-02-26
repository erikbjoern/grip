import { String, Fret, Finger, Grip } from "@/types";

type FingerPositions = (String | Fret | Finger)[][]

export default class Chord {
  private availableStrings: String[] = [1, 2, 3, 4, 5, 6]

  public strings: String[]
  public grip: Grip

  constructor(private label: string, private fingerPositions: FingerPositions, stringsToSkip?: String[]) {
    this.strings = this.availableStrings.filter(s => !stringsToSkip?.includes(s))

    this.generateGrip()
  }

  private sameStringOrFingerIsUsedTwice = () => {
    const strings = this.fingerPositions?.map(p => p[0])
    const fingers = this.fingerPositions?.map(p => p[2])
    const isUniqueSet = (arr = []) => new Set(arr).size == arr.length

    return (!isUniqueSet(strings) || !isUniqueSet(fingers))
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
    if (this.sameStringOrFingerIsUsedTwice()) {
      console.warn(`Same finger or string is used twice in ${this.label}`)
    }

    this.grip = Object.assign({}, ...this.availableStrings.map(this.generateFingerData))
  }

  public getChord = () => {
    const { label, grip, strings } = this
    return { label, grip, strings }
  }
}