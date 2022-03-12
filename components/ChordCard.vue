<template>
  <div
    class="flex flex-col items-center bg-white border-green-500 select-none"
    :class="[expanded ? 'rounded-lg px-8 py-6' : 'rounded-full min-w-[1.5rem] w-[fit-content] h-6', selectedChord.label !== 'N/C' && 'border']"
  >
    <p
      class="px-[0.3rem] mx-auto my-auto font-semibold leading-none whitespace-nowrap"
      :class="expanded ? 'text-[2rem]' : ''"
    >{{ selectedChord.label }}</p>

    <div v-if="expanded" class="mt-4 w-[16rem]">
      <div class="px-1">
        <GripOnFretBoard :grip="selectedChord.grip" :key="selectedChord.id" />
      </div>

      <div v-if="alternativeChords.length" class="flex gap-3 mt-4 overflow-x-auto">
        <div
          v-for="(chord, i) in [primaryChord, ...alternativeChords].filter(v => !!v)"
          @click="selectChord(chord, i)"
          class="flex w-[3.75rem] h-[5rem] border rounded transition-colors duration-200 flex-none"
          :class="chord.id == selectedChord.id ? 'border-green-500' : 'border-gray-300 hover:bg-gray-200 hover:border-gray-400'"
          :key="chord.id"
          :ref="el => chordRefs[i] = el"
        >
          <div class="relative w-12 h-[3.5rem] m-auto">
            <GripOnFretBoard
              :grip="chord.grip"
              class="top-0 left-0 absolute w-[20rem] transform scale-[0.15] origin-top-left"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chord } from '@/types'
import GripOnFretBoard from '@/components/Grip.vue';

const { primaryChord, alternativeChords, expanded } = defineProps<{
  primaryChord: Chord
  alternativeChords?: Chord[]
  expanded: boolean
}>()

const selectedChord = ref(primaryChord)
const chordRefs = ref([])

function selectChord(chord, index) {
  selectedChord.value = chord

  chordRefs.value[index]?.scrollIntoView({ behavior: 'smooth' })
}
</script>