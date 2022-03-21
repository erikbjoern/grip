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
      <button
        class="fixed z-40 flex w-12 h-12 transition-opacity duration-200 -translate-y-1/2 bg-white rounded-full shadow bottom-8 left-4 lg:left-1/4"
        :class="isScrolledFullyLeft() && 'opacity-0 cursor-default'"
        @click.stop="!isScrolledFullyLeft() && go(-1)"
      >
        <svg
          class="m-auto text-gray-900 -translate-x-px fill-current"
          viewBox="0 0 24 24"
          height="26"
          width="26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.7071 5.29289C15.0976 5.68342 15.0976 6.31658 14.7071 6.70711L9.41421 12L14.7071 17.2929C15.0976 17.6834 15.0976 18.3166 14.7071 18.7071C14.3166 19.0976 13.6834 19.0976 13.2929 18.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L13.2929 5.29289C13.6834 4.90237 14.3166 4.90237 14.7071 5.29289Z"
          />
        </svg>
      </button>
      <ChordCard
        :primaryChord="chordData.chord"
        :alternativeChords="chordData.alternativeChords"
        :expanded="true"
        :id="[chordData.measure, chordData.beat].join('-')"
        name="chord-card"
        class="mx-auto shadow-md"
        @click.stop="() => { }"
      />
      <button
        class="fixed z-40 flex w-12 h-12 transition-opacity duration-200 -translate-y-1/2 bg-white rounded-full shadow bottom-8 right-4 lg:right-1/4"
        :class="isScrolledFullyRight() && 'opacity-0 cursor-default'"
        @click.stop="!isScrolledFullyRight() && go(1)"
      >
        <svg
          class="m-auto text-gray-900 translate-x-px fill-current"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Chord } from '@/types';
import { onMounted } from 'vue'
import ChordCard from '@/components/ChordCard.vue';

const props = defineProps<{ expandedChords: { chord: Chord, alternativeChords: Chord[], measure: number, beat: number }[], initialChordId: string }>()
const emit = defineEmits<{
  (event: 'close'): void
  (event: 'go', direction: 'next' | 'previous', currentIndex: number): void
}>()

const horizontalScrollContainer = ref<HTMLElement>(null)
const chordCards = ref<Element[]>([])
const hasDoneInitialScroll = ref(false)
const currentFocusedId = ref(props.initialChordId)

const setChordRef = (el, i) => {
  if (el?.firstChild) {
    chordCards.value[i] = el.querySelector('div[name=chord-card]')

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
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        const chordIds = chordCards.value.map(c => c.id)
        const currentId = entry.target.querySelector('div[name=chord-card]')?.id
        const indexOfFocusedId = chordIds.indexOf(currentFocusedId.value)

        if (currentId == currentFocusedId.value) {
          return
        }

        const currentIndex = chordIds.indexOf(currentId)
        const direction = (currentIndex > indexOfFocusedId) ? 'next' : 'previous'

        currentFocusedId.value = currentId
        emit('go', direction, currentIndex)
      }
    })
  },
  {
    root: horizontalScrollContainer.value,
    threshold: 1,
  }
)

function go(direction: 1 | -1) {
  const currentCardIndex = chordCards.value.findIndex(el => el.id == currentFocusedId.value)

  if (currentCardIndex == -1) return

  const nextCard = chordCards.value[currentCardIndex + direction]

  if (nextCard) {
    nextCard.scrollIntoView()
    currentFocusedId.value = nextCard.id

    emit('go', direction == 1 ? 'next' : 'previous', currentCardIndex)
  }
}

const isScrolledFullyLeft = () => {
  return horizontalScrollContainer.value?.scrollLeft == 0
}

const isScrolledFullyRight = () => {
  if (!horizontalScrollContainer.value) return false

  const containerWidth = horizontalScrollContainer.value.scrollWidth
  const pageWidth = visualViewport.width
  const maxScrollDistance = containerWidth - pageWidth
  const distanceToRightEdge = maxScrollDistance - horizontalScrollContainer.value.scrollLeft
  const thresholdMargin = 100

  return distanceToRightEdge < thresholdMargin
}

onMounted(() => {
  const targetedCard = chordCards.value.find(el => el.id == props.initialChordId)

  if (targetedCard) {
    targetedCard.scrollIntoView()
    hasDoneInitialScroll.value = true
  }
})

</script>