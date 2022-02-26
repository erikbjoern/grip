<template>
  <div
    class="flex flex-col items-center bg-white border border-green-500 select-none"
    :class="expanded ? 'rounded-lg px-10 py-6' : 'rounded-full w-6 h-6'"
  >
    <p
      class="mx-auto my-auto font-semibold leading-none -translate-x-px -translate-y-px"
      :class="expanded ? 'text-[2rem]' : ''"
    >{{ label }}</p>

    <div v-if="expanded" class="mt-4 w-screen max-w-[14rem] relative">
      <div class="bg-[#331111] absolute inset-x-0 top-0 bottom-1 z-0 rounded-t-md"></div>
      <div
        class="relative z-10 flex-1 h-[10px] -mx-px bg-gray-700 border-t border-b-2 border-gray-900 rounded-b-sm rounded-t"
      />
      <div
        class="grid relative grid-cols-[.5rem_1fr_1fr_1fr_1fr_1fr_max-content_.5rem] grid-rows-[repeat(4,max-content)] z-10"
      >
        <div v-for="fret in numberOfFrets" :key="fret" class="contents">
          <div
            v-for="string in [0, ...availableStrings, 0]"
            :key="string"
            class="flex w-full"
            :style="{ height: fret < 5 ? `${6 - (fret / 16)}rem` : '5.75rem' }"
          >
            <div
              v-if="string >= 1 && string <= 6"
              class="relative h-full border-r"
              :style="{ width: `${string < 4 ? '4' : '3'}px` }"
              :class="[stringIsPlayable(string) ? 'bg-green-700 border-green-200' : `bg-[#706660] border-[#bbaa99]`]"
            >
              <div
                v-if="grip[string].fret == fret"
                class="absolute grid w-10 h-10 text-sm text-orange-800 -translate-x-1/2 -translate-y-1/2 bg-orange-100 border-2 border-orange-300 rounded-full shadow-inner place-items-center left-1/2 top-1/2"
              >
                <p
                  class="text-[1.25rem] font-bold leading-none -translate-y-[.5px]"
                >{{ grip[string].finger }}</p>
              </div>
            </div>
            <div v-if="fret > 1" class="z-10 flex-1 h-1 bg-gray-500 border-b border-gray-900"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { String } from '@/types'
import Chord from '@/models/chord'

const props = defineProps<{
  chord: Chord
  expanded: boolean
}>()

const { label, grip, strings } = props.chord?.getChord()
const availableStrings = [1, 2, 3, 4, 5, 6]
const numberOfFrets = 4

const stringIsPlayable = (string: number) => strings.includes(string as String)
</script>