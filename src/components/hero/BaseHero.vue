<script setup lang="ts">
import ButtonCta from '@/components/ui/ButtonCta.vue'
import { icons } from '@/data/images.ts'

interface Props {
  title: string
  subtitle: string
  mainImage: string
  leftImage?: string
  rightImage?: string
  keyboard?: boolean
  zoom?: 'zoom'
  star: 'primary' | 'secondary'
}

const props = defineProps<Props>()
</script>

<template>
  <section class="hero" :class="{ [`hero--${props.zoom}`]: props.zoom }">
    <div class="hero__star" :class="`hero__star--${props.star}`">
      <img :src="icons.purpleStar" alt="Звезда" />
    </div>

    <div class="hero__inner">
      <div
        class="hero__main-image"
        :class="{ [`hero__main-image--keyboard`]: props.keyboard }"
      >
        <img :src="props.mainImage" alt="Главная картинка" />
      </div>

      <div class="hero__content">
        <div v-if="props.leftImage" class="hero__left-image">
          <img :src="props.leftImage" alt="Картинка" />
        </div>

        <div class="hero__text">
          <div class="hero__title-img">
            <img :src="props.title" alt="Заголовок" />
          </div>
          <p class="hero__text-subtitle">{{ props.subtitle }}</p>
          <ButtonCta size="small" variant="secondary">Поступить</ButtonCta>
        </div>

        <div v-if="props.rightImage" class="hero__right-image">
          <img :src="props.rightImage" alt="Картинка" />
        </div>
      </div>
    </div>

    <div class="hero__star hero__star--right">
      <img :src="icons.purpleStar" alt="Звезда" />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.hero {
  @include zoom;

  position: relative;
  overflow: hidden;
  margin-bottom: $margin-bottom;

  &--zoom {
    zoom: 1.6;

    @media (max-width: 1549px) {
      zoom: 1.4;
    }

    @media (max-width: 1349px) {
      zoom: 1.2;
    }

    @media (max-width: 1179px) {
      zoom: 1;
    }
  }

  &__star {
    position: absolute;
    max-width: 450px;
    width: 100%;
    z-index: -1;
    animation: rotate-star 60s linear infinite;

    @media (max-width: 959px) {
      max-width: 380px;
    }

    @media (max-width: 639px) {
      max-width: 300px;
    }

    @media (max-width: 549px) {
      max-width: 250px;
    }

    &--primary {
      top: -150px;
      left: -150px;

      @media (max-width: 639px) {
        top: -70px;
        left: unset;
        right: 160px;
      }

      @media (max-width: 599px) {
        right: 150px;
      }

      @media (max-width: 499px) {
        right: 120px;
      }

      @media (max-width: 439px) {
        right: 90px;
      }

      @media (max-width: 390px) {
        right: 60px;
      }
    }

    &--secondary {
      top: -150px;
      left: -150px;

      @media (max-width: 639px) {
        max-width: 200px;
        top: -5%;
        left: 40%;
      }

      @media (max-width: 499px) {
        max-width: 150px;
        left: 41%;
      }

      @media (max-width: 399px) {
        max-width: 120px;
        left: 40%;
      }
    }

    &--right {
      right: -270px;
      bottom: -150px;

      @media (max-width: 639px) {
        display: none;
      }
    }

    img {
      width: 100%;
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__main-image {
    margin-top: -100px;
    margin-bottom: -25px;
    transform: rotate(-10deg);
    z-index: 2;

    @media (max-width: 639px) {
      transform: rotate(-5deg);
    }

    @media (max-width: 599px) {
      margin-top: -25px;
    }

    &--keyboard {
      transform: rotate(170deg);

      @media (max-width: 639px) {
        margin-top: -70px;
        transform: rotate(175deg);
      }

      @media (max-width: 599px) {
        margin-top: -70px;
      }

      @media (max-width: 499px) {
        margin-top: -40px;
      }
    }

    img {
      animation: base 3s linear infinite;
    }
  }

  &__content {
    position: relative;
    display: flex;
  }

  &__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &__text-subtitle {
    max-width: 270px;
    font-weight: 700;
    font-size: 20px;
    line-height: 1.2;
    opacity: 0.3;
    text-align: center;

    @media (max-width: 439px) {
      font-size: 16px;
    }
  }

  &__title-img {
    width: 535px;

    @media (max-width: 539px) {
      width: 450px;
    }

    @media (max-width: 439px) {
      width: 300px;
    }

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  &__left-image {
    max-width: 200px;
    position: absolute;
    left: -40%;
    bottom: 0;
    z-index: 3;

    @media (max-width: 959px) {
      left: -3%;
      bottom: -65%;
    }

    @media (max-width: 469px) {
      max-width: 150px;
      left: 5%;
      bottom: -45%;
    }

    @media (max-width: 439px) {
      max-width: 130px;
      left: -10%;
      bottom: -50%;
    }
  }

  &__right-image {
    max-width: 150px;
    position: absolute;
    top: -15%;
    right: -15%;
    z-index: 3;

    @media (max-width: 699px) {
      top: -25%;
      right: 0;
    }

    @media (max-width: 439px) {
      max-width: 120px;
      top: -30%;
      right: -10%;
    }
  }
}
</style>
