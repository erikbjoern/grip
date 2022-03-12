<template>
  <div
    @click="$emit('close')"
    :class="!hasDoneInitialScroll && 'opacity-0'"
    class="flex items-center h-full snap-x snap-mandatory"
    ref="horizontalScrollContainer"
  >
    <div
      v-for="(chordData, i) in props.expandedChords"
      class="flex flex-none w-screen min-w-screen snap-center"
      :key="[chordData.measure, chordData.beat].join('-')"
      :ref="el => setChordRef(el, i)"
    >
      <ChordCard
        :primaryChord="chordData.chord"
        :alternativeChords="chordData.alternativeChords"
        :expanded="true"
        :id="[chordData.measure, chordData.beat].join('-')"
        class="mx-auto shadow-md"
        @click.stop="() => { }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Chord } from '@/types';
import { onMounted } from 'vue'
import ChordCard from '@/components/ChordCard.vue';

const props = defineProps<{ expandedChords: { chord: Chord, alternativeChords: Chord[], measure: number, beat: number }[], initialChordId: string }>()
const emit = defineEmits(['close', 'go'])

const horizontalScrollContainer = ref<HTMLElement>(null)
const chordCards = ref<Element[]>([])
const hasDoneInitialScroll = ref(false)
const currentFocusedId = ref(props.initialChordId)

const setChordRef = (el, i) => {
  if (el?.firstChild) {
    chordCards.value[i] = el.firstChild

    observer.observe(el)

    if (hasDoneInitialScroll.value) {
      chordCards.value.find(el => el.id == currentFocusedId.value)?.scrollIntoView()
    } else {
      const targetedCard = chordCards.value.find(el => el.id == props.initialChordId)

      if (targetedCard) {
        targetedCard.scrollIntoView()
        hasDoneInitialScroll.value = true
      }
    }
  }
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry: IntersectionObserverEntry & { target: { firstChild: { id: string } } }) => {
      if (entry.isIntersecting) {
        const chordIds = chordCards.value.map(c => c.id)
        const currentId = entry.target.firstChild.id
        const indexOfFocusedId = chordIds.indexOf(currentFocusedId.value)

        if (currentId == currentFocusedId.value) {
          return
        }

        if (chordIds.indexOf(currentId) > indexOfFocusedId) {
          currentFocusedId.value = currentId
          emit('go', 'next')
        }

        if (chordIds.indexOf(currentId) < indexOfFocusedId) {
          currentFocusedId.value = currentId
          emit('go', 'previous')
        }
      }
    })
  },
  {
    root: horizontalScrollContainer.value,
    threshold: 1,
  }
)

onMounted(() => {
  const targetedCard = chordCards.value.find(el => el.id == props.initialChordId)

  if (targetedCard) {
    targetedCard.scrollIntoView()
    hasDoneInitialScroll.value = true
  }
})

</script>