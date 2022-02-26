<template>
  <div class="flex flex-col items-center w-screen min-w-0 p-8">
    <transition name="fade" mode="out-in">
      <div
        v-if="expandedChord"
        @click="expandChord(null)"
        class="absolute inset-0 z-10 bg-gray-500 bg-opacity-75"
      >
        <Grip
          :chord="expandedChord"
          :expanded="true"
          class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        />
      </div>
    </transition>
    <div class="flex flex-wrap flex-1 max-w-sm min-w-0 mt-32 gap-y-8">
      <div
        v-for="measure in song.measures.length"
        :key="measure"
        class="flex items-end flex-auto w-32 flex-nowrap"
      >
        <div v-for="beat in song.timeSignature.beats" :key="beat" class="flex-1 w-full">
          <Grip
            v-if="getChord(measure, beat) && isNotSameAsPreviousChord(measure, beat)"
            @click="expandChord(getChord(measure, beat))"
            :chord="getChord(measure, beat)"
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
import Grip from '@/components/Grip.vue'
import Chord from '@/models/chord'
import chords from '@/assets/chords/'

const song = {
  timeSignature: {
    beats: 4,
    denominator: 4,
  },
  measures: [
    [chords.G_OPEN_FULL, chords.G_OPEN_FULL, chords.G_OPEN_FULL, chords.G_OPEN_FULL],
    [chords.C_OPEN, chords.C_OPEN, chords.C_OPEN, chords.C_OPEN],
    [chords.G_OPEN_FULL, chords.G_OPEN_FULL, chords.G_OPEN_FULL, chords.G_OPEN_FULL],
    [chords.C_OPEN, chords.C_OPEN, chords.C_OPEN, chords.C_OPEN],
    [chords.G_OPEN_FULL, chords.C_OPEN, chords.G_OPEN_FULL, chords.C_OPEN],
    [chords.C_OPEN, chords.C_OPEN, chords.C_OPEN, chords.C_OPEN],
  ]
}

const getChord = (measure, beat): Chord => {
  if (song.measures[measure - 1]) {
    return song.measures[measure - 1][beat - 1]
  }
}

const isNotSameAsPreviousChord = (measure, beat) => {
  if (measure * beat == 1) return true

  const thisChord = getChord(measure, beat)

  let previousBeat, previousMeasure

  if (beat > 1) {
    previousBeat = beat - 1
    previousMeasure = measure
  } else {
    previousBeat = song.timeSignature.beats
    previousMeasure = measure - 1
  }

  const previousChord = getChord(previousMeasure, previousBeat)

  return thisChord !== previousChord
}

const expandedChord = ref<Chord>()

function expandChord(chord: Chord) {
  expandedChord.value = chord
}

</script>