<script lang="ts" setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperInstance } from 'swiper'
import { Navigation, Pagination, EffectFade } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

interface TextPart {
  text: string
  highlight?: boolean
}

interface Stage {
  id: number
  image: string
  title: string
  name: string
  text: TextPart[]
}

interface Props {
  stages: Stage[]
}

defineProps<Props>()

const prevBtnEl = ref<HTMLButtonElement | null>(null)
const nextBtnEl = ref<HTMLButtonElement | null>(null)
const paginationEl = ref<HTMLDivElement | null>(null)

function onSwiperInit(swiper: SwiperInstance) {
  if (swiper.params.navigation) {
    swiper.params.navigation.prevEl = prevBtnEl.value
    swiper.params.navigation.nextEl = nextBtnEl.value
    swiper.navigation.init()
    swiper.navigation.update()
  }

  if (swiper.params.pagination) {
    swiper.params.pagination.el = paginationEl.value
    swiper.params.pagination.clickable = true
    swiper.pagination.init()
    swiper.pagination.render()
    swiper.pagination.update()
  }
}
</script>

<template>
  <div class="slider-success">
    <div class="slider-success__row">
      <button
        ref="prevBtnEl"
        type="button"
        class="slider-success__arrow slider-success__arrow--prev"
        aria-label="Предыдущая история"
      >
        ‹
      </button>

      <div class="slider-success__shell">
        <Swiper
          class="slider-success__swiper"
          :speed="700"
          effect="fade"
          :fade-effect="{ crossFade: true }"
          :modules="[EffectFade, Navigation, Pagination]"
          :navigation="true"
          :pagination="{ el: paginationEl, clickable: true }"
          loop
          @swiper="onSwiperInit"
        >
          <SwiperSlide v-for="stage in stages" :key="stage.id" class="slider-success__slide">
            <div class="slider-success__panel slider-success__panel--photo">
              <img
                class="slider-success__photo"
                :src="stage.image"
                :alt="stage.name"
                loading="lazy"
              />
            </div>

            <div class="slider-success__panel slider-success__panel--content">
              <h3 class="slider-success__title">{{ stage.title }}</h3>

              <p class="slider-success__text">
                <span
                  v-for="(part, index) in stage.text"
                  :key="index"
                  class="slider-success__text-part"
                  :class="{ 'slider-success__text-part--highlight': part.highlight }"
                  >{{ part.text }}</span
                >
              </p>

              <span class="slider-success__author">{{ stage.name }}</span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <button
        ref="nextBtnEl"
        type="button"
        class="slider-success__arrow slider-success__arrow--next"
        aria-label="Следующая история"
      >
        ›
      </button>
    </div>

    <div ref="paginationEl" class="slider-success__pagination"></div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.slider-success {
  padding: 0 20px;
  margin-bottom: $margin-bottom;

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  &__shell {
    position: relative;
    flex: 0 1 860px;
    height: 450px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 15px;
    background-color: $color-dark;
    box-shadow: 0 30px 60px -25px rgba(0, 0, 0, 0.6);
  }

  &__swiper {
    position: absolute;
    inset: 0;
  }

  &__slide {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
  }

  &__panel {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &--content {
      padding: 50px;
    }
  }

  &__photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__title {
    margin: 0 0 20px;
    font-size: 26px;
    font-weight: 700;
    line-height: 1.3;
  }

  &__text {
    margin: 0 0 24px;
    font-size: 15px;
    line-height: 1.65;
  }

  &__text-part {
    font-size: 16px;
    margin-right: 0.3em;
    opacity: 0.7;

    &--highlight {
      font-weight: 700;
    }
  }

  &__author {
    font-size: 16px;
    font-weight: 600;
    color: $color-purple;
  }

  &__arrow {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 50%;
    color: $color-white;
    background-color: $color-dark;
    font-size: 23px;
    transition: opacity ease 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  &__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 25px;

    :deep(.swiper-pagination-bullet) {
      width: 7px;
      height: 7px;
      margin: 0;
      border-radius: 50%;
      background-color: $color-gray;
      opacity: 1;
      transition:
        width 0.3s,
        background 0.3s;
    }

    :deep(.swiper-pagination-bullet-active) {
      background-color: $color-dark;
    }
  }
}

@media (max-width: 959px) {
  .slider-success {
    &__row {
      gap: 10px;
    }

    &__shell {
      max-width: 550px;
      height: 750px;
    }

    &__slide {
      grid-template-columns: 1fr;
      grid-template-rows: 50% 50%;
    }

    &__panel--content {
      padding: 25px;
    }

    &__title {
      font-size: 22px;
    }

    &__arrow {
      width: 38px;
      height: 38px;
      font-size: 16px;
    }
  }
}

@media (max-width: 431px) {
  .slider-success {


    &__title {
      font-size: 18px;
      margin-bottom: 10px;
    }

    &__text {
      margin-bottom: 10px;
    }

    &__arrow {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
