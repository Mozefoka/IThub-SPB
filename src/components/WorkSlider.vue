<script lang="ts" setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import ButtonCta from '@/components/ui/ButtonCta.vue'

interface WorkItem {
  id: number
  image: string
  alt?: string
}

interface Props {
  works: WorkItem[]
  title: string
}

defineProps<Props>()

const prevBtnEl = ref<HTMLButtonElement | null>(null)
const nextBtnEl = ref<HTMLButtonElement | null>(null)
</script>

<template>
  <div class="works-slider">
    <div class="works-slider__header">
      <h1 class="works-slider__title title-lg">{{ title }}</h1>

      <div class="works-slider__controls">
        <button ref="prevBtnEl" type="button" class="works-slider__arrow works-slider__arrow--prev">
          <svg
            class="works-slider__arrow-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10 3L5 8L10 13"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <button ref="nextBtnEl" type="button" class="works-slider__arrow works-slider__arrow--next">
          <svg
            class="works-slider__arrow-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10 3L5 8L10 13"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div class="works-slider__header-btn">
        <ButtonCta>Поступить</ButtonCta>
      </div>
    </div>

    <Swiper
      class="works-slider__swiper"
      :modules="[Navigation, Autoplay]"
      :slides-per-view="3"
      :centered-slides="true"
      :space-between="25"
      :loop="true"
      :speed="600"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :navigation="{ prevEl: prevBtnEl, nextEl: nextBtnEl }"
      :breakpoints="{
        0: { slidesPerView: 1, spaceBetween: 12 },
        959: { slidesPerView: 3, spaceBetween: 24 },
      }"
    >
      <SwiperSlide v-for="work in works" :key="work.id" class="works-slider__slide">
        <img class="works-slider__image" :src="work.image" :alt="work.alt ?? ''" loading="lazy" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.works-slider {
  height: 675px;
  padding: 0 20px;
  margin: 100px 0 120px;

    @media (max-width: 479px) {
      margin-bottom: 100px;
    }

  &__header {
    zoom: 1.6;

    @media (max-width: 1429px) {
      zoom: 1.3;
    }

    @media (max-width: 1150px) {
      zoom: 1.2;
    }

    @media (max-width: 479px) {
      zoom: 1.3;
    }

    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
    align-items: center;
    gap: 15px;
    margin-bottom: 40px;

    @media (max-width: 959px) {
      grid-template-columns: 2fr 1fr;
      align-items: flex-end;
    }

    @media (max-width: 639px) {
      grid-template-columns: 1fr;
    }
  }

  &__header-btn {
    max-width: 160px;
    width: 100%;
    justify-self: flex-end;

    @media (max-width: 639px) {
      grid-row: 2;
      justify-self: flex-start;
    }

    @media (max-width: 479px) {
      grid-row: auto;
      justify-self: flex-start;
    }
  }

  &__title {
    max-width: 480px;

    @media (max-width: 639px) {
      max-width: 380px;
    }
  }

  &__controls {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    @media (max-width: 959px) {
      order: 3;
      justify-self: flex-start;
    }

    @media (max-width: 639px) {
      grid-row: 2;
      justify-self: flex-end;
    }

    @media (max-width: 479px) {
      grid-row: auto;
      justify-self: flex-start;
    }
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    border: 1px solid $color-gray;
    border-radius: 50%;

    background: transparent;
    color:$color-white;

    cursor: pointer;
    transition:
      border-color 0.2s ease,
      color 0.2s ease,
      transform 0.15s ease;

    &:hover {
      border-color: $color-purple;
      color: $color-purple;
    }

    &:active {
      transform: scale(0.94);
    }
  }

  &__arrow--next &__arrow-icon {
    transform: scaleX(-1);
  }

  :deep(.swiper-wrapper) {
    align-items: flex-start;
  }

  &__slide {
    height: 300px;
    transition: height 0.6s ease;

    &.swiper-slide-active {
      height: 450px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
