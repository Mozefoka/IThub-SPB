<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperInstance } from 'swiper'

import 'swiper/css'

interface Props {
  images: string[]
}

const props = defineProps<Props>()

const swiper = ref<SwiperInstance | null>(null)

const prevSlide = () => {
  swiper.value?.slidePrev()
}

const nextSlide = () => {
  swiper.value?.slideNext()
}
</script>

<template>
  <div class="base-slider">
    <button
      class="base-slider__button base-slider__button--prev"
      type="button"
      @click="prevSlide"
    ></button>

    <Swiper
      class="base-slider__swiper"
      :slides-per-view="1"
      :space-between="0"
      :speed="500"
      loop
      @swiper="swiper = $event"
    >
      <SwiperSlide v-for="(image, index) in props.images" :key="index" class="base-slider__slide">
        <img :src="image" :alt="`Слайд ${index + 1}`" class="base-slider__image" />
      </SwiperSlide>
    </Swiper>

    <button
      class="base-slider__button base-slider__button--next"
      type="button"
      @click="nextSlide"
    ></button>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.base-slider {
  display: flex;
  align-items: center;

  &__swiper {
    max-width: 300px;
    width: 100%;
    border-radius: 15px;
    overflow: hidden;

    @media (max-width: 639px) {
      max-width: 235px;
    }

    @media (max-width: 429px) {
      max-width: 200px;
    }

    @media (max-width: 379px) {
      max-width: 150px;
    }
  }

  &__slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image {
    object-fit: cover;
  }

  &__button {
    position: relative;
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 50%;
    background: rgb(142 142 143 / 0.3);

    @media (max-width: 639px) {
      width: 25px;
      height: 25px;
    }

    &:hover {
      background: rgb(142 142 143 / 0.5);
    }

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 10px;
      border-left: 1px solid $color-white;
      border-bottom: 1px solid $color-white;
      transform: translate(-35%, -50%) rotate(45deg);

      @media (max-width: 639px) {
        width: 8px;
        height: 8px;
      }
    }

    &--prev {
      margin-right: 20px;

      @media (max-width: 639px) {
        margin-right: 10px;
      }
    }

    &--next {
      margin-left: 20px;

      @media (max-width: 639px) {
        margin-left: 10px;
      }

      &::before {
        transform: translate(-65%, -50%) rotate(225deg);
      }
    }
  }
}
</style>
