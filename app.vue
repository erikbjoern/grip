<template>
  <div class="flex flex-col items-center w-screen h-[90vh] min-w-0 p-8">
    <transition name="fade" mode="out-in">
      <div v-if="expandedChords.length" class="absolute inset-0 z-10 bg-gray-500 bg-opacity-75">
        <SwipeHorizontal
          @go="go"
          @close="expandChord(null)"
          class="z-20 max-w-full min-w-0 overflow-x-scroll"
          :expandedChords="expandedChords"
          :initialChordId="targetedChordId"
        />
      </div>
    </transition>
    <div class="flex flex-wrap flex-1 max-w-lg min-w-0 gap-y-8">
      <div
        v-for="measure in song.measures.length"
        :key="measure"
        class="flex items-end flex-auto w-48 flex-nowrap"
      >
        <div v-for="beat in song.timeSignature.beats" :key="beat" class="flex-1 w-full">
          <ChordCard
            v-if="(beat == 1 || isNotSameAsPreviousChord(measure, beat))"
            @click="expandChord({ measure, beat })"
            :primaryChord="getChord({ measure, beat })"
            :expanded="false"
            class="-translate-x-px cursor-pointer"
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
            />
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
import { useRoute } from './.nuxt/imports'
import { Chord } from '@/types'
import ChordCard from '@/components/ChordCard.vue'
import SwipeHorizontal from '@/components/SwipeHorizontal.vue'
import chords from '@/assets/chords'
import test from "@/assets/songs/test"
import one from "@/assets/songs/one"


let song = one
const route = useRoute()

if (route.path == '/test') {
  song = test
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

const getBeatData = (beatPosition: BeatPosition, target: Placement = 'current') => {
  const { measure, beat } = getBeat(beatPosition, target)
  let chord

  if (song.measures[measure - 1]) {
    chord = song.measures[measure - 1][beat - 1]
  }

  return (chord || chords.NO_CHORD)
}

const getChord = (beatPosition: BeatPosition, target: Placement = 'current'): Chord => {
  const beatData = getBeatData(beatPosition, target)
  const chord = 'primaryChord' in beatData ? beatData.primaryChord : beatData

  return chord.getChord()
}

const getAlternativeChords = (beatPosition: BeatPosition, target: Placement = 'current'): Chord[] => {
  const beatData = getBeatData(beatPosition, target)
  const chords = 'alternativeChords' in beatData ? beatData.alternativeChords : []

  return chords.map(c => c.getChord())
}

const isNotSameAsPreviousChord = (measure, beat) => {
  if (measure * beat == 1) return true

  const thisChord = getChord({ measure, beat })
  const previousChord = getChord({ measure, beat }, 'previous')

  return thisChord.id !== previousChord.id
}

type ChordData = { chord: Chord, alternativeChords: Chord[], measure: number, beat: number }
let expandedChords = ref<ChordData[]>([])

function fillupCurrentChords(direction: 'previous' | 'next') {
  const outerMostChord = direction == 'next'
    ? expandedChords.value[expandedChords.value.length - 1]
    : expandedChords.value[0]

  let nextBeat = getBeat(outerMostChord, direction)
  let nextChord
  let safetyCounter = 0

  while (!nextChord && safetyCounter < 100) {
    if (nextBeat.measure * nextBeat.beat <= 0 ||
      nextBeat.measure * nextBeat.beat >
      song.measures.length * song.timeSignature.beats) {
      break
    }

    nextChord = getChord(nextBeat)

    if (!nextChord && nextBeat.measure * nextBeat.beat >= song.measures.length * song.timeSignature.beats) {
      break
    } else if (!nextChord || nextChord?.id == outerMostChord?.chord?.id) {
      nextBeat = getBeat(nextBeat, direction)
      nextChord = undefined
    }

    safetyCounter++
  }

  if (!nextChord) return

  const chordData: ChordData = {
    chord: nextChord,
    alternativeChords: getAlternativeChords(nextBeat),
    measure: nextBeat.measure,
    beat: nextBeat.beat
  }

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
    const chordData = {
      chord: getChord(beatPosition),
      alternativeChords: getAlternativeChords(beatPosition),
      ...beatPosition
    }
    targetedChordId.value = `${chordData.measure}-${chordData.beat}`

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