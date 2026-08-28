<script setup lang="ts">
import ButtonCta from '@/components/ui/ButtonCta.vue'

interface Props {
  title: string
  subtitle: string
  mainImage: string
  leftImage?: string
  rightImage?: string
}

const props = defineProps<Props>()
</script>

<template>
  <section class="hero">
    <div class="hero__star hero__star--left">
      <img src="@/assets/icons/purple-star.svg" alt="Звезда" />
    </div>

    <div class="hero__inner">
      <div class="hero__main-image">
        <img :src="props.mainImage" alt="Главная картинка" />
      </div>

      <div class="hero__content">
        <div v-if="props.leftImage" class="hero__left-image">
          <img :src="props.leftImage" alt="Картинка" class="hero__left-image" />
        </div>

        <div class="hero__text">
          <div class="hero__title-img">
            <img :src="props.title" alt="Заголовок" />
          </div>
          <p class="title-s">{{ props.subtitle }}</p>
          <ButtonCta size="small" variant="secondary">Поступить</ButtonCta>
        </div>

        <div v-if="props.rightImage" class="hero__right-image">
          <img :src="props.rightImage" alt="Картинка" />
        </div>
      </div>
    </div>

    <div class="hero__star hero__star--right">
      <img src="@/assets/icons/purple-star.svg" alt="Звезда" />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.hero {
  @include hero-zoom;

  position: relative;
  overflow: hidden;
  margin-bottom: $margin-bottom;

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

    &--left {
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
    z-index: 5;

    @media (max-width: 639px) {
      transform: rotate(-5deg);
    }

    @media (max-width: 599px) {
      margin-top: -25px;
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
    max-width: 180px;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  &__right-image {
    max-width: 150px;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
