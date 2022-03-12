<template>
  <div class="relative">
    <!-- fretboard styling - background -->
    <div class="bg-[#331111] absolute inset-x-0 top-0 bottom-1 z-0 rounded-t-md"></div>
    <!-- nut styling -->
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
          :id="`${string}-${fret}`"
          class="flex w-full"
          :style="{ height: fret < 5 ? `${6 - (fret / 16)}rem` : '5.75rem' }"
        >
          <!-- string -->
          <div
            v-if="string >= 1 && string <= 6"
            class="relative h-full border-r"
            :style="{ width: `${string < 3 ? '4' : string < 5 ? '3.5' : '3'}px` }"
            :class="getStringStyle(grip[string].status)"
          >
            <!-- finger notation -->
            <div
              v-if="grip[string].fret == fret && (!barreElementData || barreElementData.finger !== grip[string].finger)"
              :id="`${string}-${fret}-${grip[string].finger}`"
              class="absolute grid w-10 h-10 text-sm text-[#932500] -translate-x-1/2 -translate-y-1/2 bg-orange-100 border-2 border-[#F5C060] rounded-full shadow-inner place-items-center left-1/2 top-1/2"
              :style="{ boxShadow: 'inset 1px 0 6px 0 rgb(150 130 100 / 0.4), 1px 3px 4px #55555540' }"
            >
              <p
                class="text-[1.25rem] font-bold leading-none -translate-y-px"
              >{{ grip[string].finger }}</p>
            </div>
            <!-- barre notation -->
            <div
              v-if="barreElementData && barreElementData.fret == fret && barreElementData.leftMostString == string"
              class="absolute z-20 grid text-sm text-[#932500] bg-orange-100 border-2 border-[#F5C060] rounded-full place-items-center"
              :style="{ top: barreElementData.top, left: barreElementData.left, width: barreElementData.width, height: barreElementData.height, boxShadow: 'inset 1px 0 6px 0 rgb(150 130 100 / 0.4), 1px 3px 4px #55555540' }"
            >
              <p
                class="text-[1.25rem] font-bold leading-none -translate-y-px"
              >{{ barreElementData.finger }}</p>
            </div>
          </div>
          <!-- fret styling -->
          <div v-if="fret > 1" class="z-10 flex-1 h-1 border-b border-gray-900 bg-neutral-600"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BarreElementData, Grip } from '@/types';
import { onMounted } from 'vue'

const { grip } = defineProps<{
  grip: Grip
}>()

const availableStrings = [1, 2, 3, 4, 5, 6]
const numberOfFrets = 4
const barreElementData = ref<BarreElementData>(null)

const setBarreElementData = () => {
  const stringData = Object.entries(grip)
    .map(([s, f]) => ({ string: parseInt(s), finger: f.finger, fret: f.fret }))
    .filter(s => s?.finger && s?.fret)

  const barreFinger = stringData
    .find((s) => stringData
      .filter((str) => s.finger == str.finger)
      .length > 1
    )

  const allPositions = stringData.filter((s) => s.finger == barreFinger?.finger)
  const allPositionsAreOnSameFret = allPositions.every(f => f.fret == barreFinger.fret)

  if (!barreFinger?.finger || !allPositionsAreOnSameFret) {
    return
  }

  const barreStrings = allPositions.map(p => p.string)

  const leftMostString = stringData.find(s => s.string == Math.min(...barreStrings))
  const { string: stringL, fret: fretL, finger: fingerL } = leftMostString
  const leftMostElement = document.getElementById(`${stringL}-${fretL}-${fingerL}`)

  const rightMostString = stringData.find(s => s.string == Math.max(...barreStrings))
  const { string: stringR, fret: fretR, finger: fingerR } = rightMostString
  const rightMostElement = document.getElementById(`${stringR}-${fretR}-${fingerR}`)


  if (leftMostElement && rightMostElement) {
    const stringGapElement = document.getElementById(`${stringL}-${fretL}`)

    const stringSpan = rightMostString.string - leftMostString.string
    const width = leftMostElement.offsetWidth + stringGapElement.offsetWidth * stringSpan

    barreElementData.value = {
      finger: barreFinger.finger,
      fret: barreFinger.fret,
      leftMostString: leftMostString.string,
      width: `${width + 2}px`,
      height: `${leftMostElement.offsetHeight * 0.75}px`,
      top: `${leftMostElement.offsetTop - leftMostElement.offsetHeight / 3}px`,
      left: `${leftMostElement.offsetLeft - leftMostElement.offsetWidth / 2}px`,
    }
  }
}

const getStringStyle = (status) => {
  return {
    'PICK': 'bg-green-700 border-green-200',
    'VALID': 'bg-[#a2875e] border-yellow-200',
    'SKIP': 'bg-[#4b3e52] border-[#bbaa99]',
  }[status]
}

onMounted(() => {
  setBarreElementData()
})
</script>
