<template>
  <div class="flex flex-col items-center w-screen h-[90vh] min-w-0 p-8">
    <transition name="fade" mode="out-in">
      <div v-if="expandedChords.length" class="absolute inset-0 z-10 bg-gray-500 bg-opacity-75">
        <SwipeHorizontal
          @go="go"
          @click="expandChord(null)"
          class="z-20 max-w-full min-w-0 overflow-x-scroll"
          :chords="expandedChords"
          :initialChordId="targetedChordId"
        />
      </div>
    </transition>
    <div class="flex flex-wrap flex-1 max-w-sm min-w-0 gap-y-8">
      <div
        v-for="measure in song.measures.length"
        :key="measure"
        class="flex items-end flex-auto w-32 flex-nowrap"
      >
        <div v-for="beat in song.timeSignature.beats" :key="beat" class="flex-1 w-full">
          <Grip
            v-if="getChord({ measure, beat }) && isNotSameAsPreviousChord(measure, beat)"
            @click="expandChord({ measure, beat })"
            :chord="getChord({ measure, beat })"
            :expanded="false"
            class="cursor-pointer"
          />
          <div class="flex items-center flex-1 w-full h-8 pt-2">
            <div
              class="w-px"
              :class="[measure * beat == 1 ? 'border-l-2 border border-gray-900' : 'bg-gray-900', (beat - 1) % song.timeSignature.beats == 0 ? 'h-full' : 'h-2']"
            />
            <div
              v-for="noteValue in song.timeSignature.denominator"
              :key="noteValue"
              class="h-[2px] flex-1 bg-gray-900"
            ></div>
            <div
              class="w-px"
              :class="[measure * beat == song.measures.length * song.timeSignature.beats ? 'border-r-2 border-l border-gray-900' : 'bg-gray-900', (beat) % song.timeSignature.beats == 0 ? 'h-full' : 'h-2']"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Grip from '@/components/Grip.vue'
import SwipeHorizontal from '@/components/SwipeHorizontal.vue'
import Chord from '@/models/chord'
import chords from '@/assets/chords/'

const { G_OPEN_FULL, C_OPEN, F, D_SEMI_BARRE, A_OPEN } = chords

const song = {
  timeSignature: {
    beats: 4,
    denominator: 4,
  },
  measures: [
    [G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [G_OPEN_FULL, C_OPEN, G_OPEN_FULL, C_OPEN],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [F, D_SEMI_BARRE],
    [G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL, G_OPEN_FULL],
    [C_OPEN, C_OPEN, C_OPEN, C_OPEN],
    [G_OPEN_FULL, C_OPEN, G_OPEN_FULL, C_OPEN],
    [C_OPEN, C_OPEN, A_OPEN, C_OPEN],
    [F, D_SEMI_BARRE]
  ]
}

const targetedChordId = ref('')

type BeatPosition = { measure: number, beat: number }
type Placement = 'next' | 'current' | 'previous'

const getBeat = ({ measure, beat } = {} as BeatPosition, target: Placement = 'current') => {
  let targetMeasure = measure
  let targetBeat = beat

  if (target == 'previous') {
    if (beat > 1) {
      targetBeat = beat - 1
      targetMeasure = measure
    } else {
      targetBeat = song.timeSignature.beats
      targetMeasure = measure - 1
    }
  }

  if (target == 'next') {
    if (beat < song.timeSignature.beats) {
      targetBeat = beat + 1
      targetMeasure = measure
    } else {
      targetBeat = 1
      targetMeasure = measure + 1
    }
  }

  return { measure: targetMeasure, beat: targetBeat }
}

const getChord = (beatPosition: BeatPosition, target: Placement = 'current'): Chord => {
  const { measure, beat } = getBeat(beatPosition, target)

  if (song.measures[measure - 1]) {
    return song.measures[measure - 1][beat - 1]
  }
}

const isNotSameAsPreviousChord = (measure, beat) => {
  if (measure * beat == 1) return true

  const thisChord = getChord({ measure, beat })
  const previousChord = getChord({ measure, beat }, 'previous')

  return thisChord !== previousChord
}

type ChordData = { chord: Chord, measure: number, beat: number }
let expandedChords = ref<ChordData[]>([])

function fillupCurrentChords(direction: 'previous' | 'next') {
  const outerMostChord = direction == 'next'
    ? expandedChords.value[expandedChords.value.length - 1]
    : expandedChords.value[0]

  let nextBeat = getBeat(outerMostChord, direction)
  let nextChord

  while (!nextChord) {
    if (nextBeat.measure * nextBeat.beat <= 0 ||
      nextBeat.measure * nextBeat.beat >
      song.measures.length * song.timeSignature.beats) {
      break
    }

    nextChord = getChord(nextBeat)

    if (!nextChord && nextBeat.measure * nextBeat.beat >= song.measures.length * song.timeSignature.beats) {
      break
    } else if (!nextChord || nextChord?.label == outerMostChord?.chord?.label) {
      nextBeat = getBeat(nextBeat, direction)
      nextChord = undefined
    }
  }

  if (!nextChord) return

  const chordData: ChordData = { chord: nextChord, measure: nextBeat.measure, beat: nextBeat.beat }

  if (direction == 'next') {
    expandedChords.value.push(chordData)

    if (expandedChords.value.length > 20) {
      expandedChords.value.shift()
    }
  }

  if (direction == 'previous') {
    expandedChords.value.unshift(chordData)

    if (expandedChords.value.length > 20) {
      expandedChords.value.pop()
    }
  }
}

function go(direction: 'previous' | 'next') {
  fillupCurrentChords(direction)

  expandedChords.value = [...expandedChords.value]
}


function expandChord(beatPosition: BeatPosition) {

  if (beatPosition === null) {
    while (expandedChords.value.length) {
      expandedChords.value.pop()
    }
  } else {
    const chordData = { chord: getChord(beatPosition), ...beatPosition }
    targetedChordId.value = `${chordData.measure}-${chordData.beat}`
    console.log(targetedChordId.value)
    expandedChords.value.push(chordData)

    let direction: 'previous' | 'next' = 'next'

    let safetyCounter = 0
    while (expandedChords.value.length < 7 && safetyCounter < 50) {
      fillupCurrentChords(direction)
      direction = direction == 'next' ? 'previous' : 'next'
      safetyCounter++
    }
  }
}
</script>