import { StringNum, FingerDataArray, Grip, StringStatus } from "@/types";

type ChordExtensionData = {
  id: string,
  label?: string,
  lift?: StringNum[],
  add?: FingerDataArray[],
  pattern?: StringStatus[]
}

export default class Chord {
  private availableStrings: StringNum[] = [1, 2, 3, 4, 5, 6]

  public grip: Grip
  public baseChordId: string

  constructor(
    public id: string,
    private label: string,
    private fingerPositions: FingerDataArray[],
    private stringProperties: StringStatus[]
  ) {
    this.baseChordId = id
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

  private getFingerPositionDataForString = (string: StringNum) => {
    return this.fingerPositions?.find(p => p[0] == string) || []
  }

  private generateFingerData = (string, i) => {
    const fingerPosition = this.getFingerPositionDataForString(string)

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

  private performExtensionOnInstance = (instance: Chord, data: ChordExtensionData) => {
    // TODO: add validations
    data.lift?.forEach(string => {
      const indexOfFingerPosition = instance.fingerPositions.indexOf(instance.getFingerPositionDataForString(string))

      if (indexOfFingerPosition !== -1) {
        instance.fingerPositions.splice(indexOfFingerPosition, 1)
      }
    })

    data.add?.forEach(fingerPositionData => {
      const string = fingerPositionData[0] as StringNum
      const existingPositionData = instance.getFingerPositionDataForString(string)

      if (existingPositionData) {
        instance.fingerPositions.splice(instance.fingerPositions.indexOf(existingPositionData), 1, fingerPositionData)
      } else {
        instance.fingerPositions.push(fingerPositionData)
      }
    })

    instance.id = data.id
    instance.label = data.label ?? instance.label
    instance.stringProperties = data.pattern ?? instance.stringProperties

    return instance
  }

  public extend = (data: ChordExtensionData) => {
    const chordCopy = new Chord(data.id, data.label || this.label, this.fingerPositions, data.pattern || this.stringProperties)
    return this.performExtensionOnInstance(chordCopy, data)
  }

  public getChord = () => {
    this.generateGrip()

    const { id, label, grip } = this
    return { id, label, grip }
  }
}