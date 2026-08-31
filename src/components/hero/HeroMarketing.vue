<script setup lang="ts">
import ButtonCta from '@/components/ui/ButtonCta.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { images, icons } from '@/data/images.ts'
</script>

<template>
  <section class="marketing-hero">
    <div class="marketing-hero__star">
      <img :src="icons.purpleStar" alt="Звезда" />
    </div>

    <div class="container">
      <div class="marketing-hero__content">
        <p class="marketing-hero__stat title-s">88% выпускников работают по специальности</p>

        <div class="marketing-hero__badge">
          <BaseBadge> Все будет ITHub </BaseBadge>
        </div>

        <div class="marketing-hero__photos">
          <div class="marketing-hero__photos-item marketing-hero__photos-item--left">
            <img :src="images.face" alt="Выпускник" />
          </div>

          <div class="marketing-hero__photos-item marketing-hero__photos-item--middle">
            <img :src="images.face" alt="Выпускник" />
          </div>

          <div class="marketing-hero__photos-item marketing-hero__photos-item--right">
            <img :src="images.face" alt="Выпускник" />
          </div>
        </div>

        <h1 class="marketing-hero__title title-lg">
          Пока другие изучают маркетинг — наши студенты уже делают его
        </h1>

        <ButtonCta size="small">Поступить</ButtonCta>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/_variables' as *;
@use '@/styles/_mixins' as *;

.marketing-hero {
  @include adaptive-zoom;

  padding-top: 50px;
  position: relative;
  text-align: center;
  margin-bottom: $margin-bottom;

  &__star {
    position: absolute;
    top: -100px;
    left: -120px;

    @media (max-width: 639px) {
      position: static;
      margin-top: -250px;
    }

    img {
      width: 100%;
      animation: rotate-star 60s linear infinite;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &__stat {
    max-width: 300px;

    @media (max-width: 639px) {
      margin: -10px 0 30px 0;
    }
  }

  &__badge {
    align-self: flex-end;
    z-index: 2;

    @media (max-width: 639px) {
      display: none;
    }
  }

  &__photos {
    position: relative;
    width: 100%;
    top: -25px;
    margin-bottom: 40px;
  }

  &__photos-item {
    width: 120px;
    position: absolute;

    @media (max-width: 959px) {
      width: 90px;
    }

    &--left {
      animation: head 3s linear infinite;

      @media (max-width: 639px) {
        display: none;
      }
    }

    &--middle {
      position: absolute;
      top: -30px;
      left: 50%;
      animation: base 3s linear infinite;

      @media (max-width: 639px) {
        top: 0;
      }

      img {
        transform: translateX(-50%);
      }
    }

    &--right {
      animation: head 3s linear infinite;
      right: 0;

      @media (max-width: 639px) {
        display: none;
      }
    }
  }

  &__title {
    max-width: 790px;
    margin-bottom: 30px;

    @media (max-width: 959px) {
      max-width: 620px;
    }

    @media (max-width: 639px) {
      margin-bottom: 15px;
    }
  }
}
</style>
