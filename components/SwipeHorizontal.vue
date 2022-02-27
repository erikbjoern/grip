<template>
  <div
    @click="emit('click')"
    :class="!hasDoneInitialScroll && 'opacity-0'"
    class="flex items-center h-full snap-x snap-mandatory"
    ref="horizontalScrollContainer"
  >
    <div
      v-for="(chordData, i) in props.chords"
      class="flex flex-none w-screen min-w-screen snap-center"
      :key="[chordData.measure, chordData.beat].join('-')"
      :ref="el => setChordRef(el, i)"
    >
      <Grip
        :chord="chordData.chord"
        :expanded="true"
        :id="[chordData.measure, chordData.beat].join('-')"
        class="mx-auto shadow-md"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Chord from '~~/models/chord';
import Grip from '~~/components/Grip.vue';
import { onMounted } from 'vue'

const props = defineProps<{ chords: { chord: Chord, measure: number, beat: number }[], initialChordId: string }>()
const emit = defineEmits(['click', 'go'])

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
    entries.forEach(entry => {
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