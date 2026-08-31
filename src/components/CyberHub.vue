<script setup lang="ts">
import { images } from '@/data/images.ts'

interface Cyberhub {
  title: string
  description: string
  video: string
}

const props = defineProps<Cyberhub>()
</script>

<template>
  <section class="cyberhub">
    <div class="container">
      <div class="cyberhub__content">
        <h2 class="cyberhub__title">{{ props.title }}</h2>
        <p class="cyberhub__description">{{ props.description }}</p>
        <div class="cyberhub__preview">
          <img :src="images.psp" alt="PSP" class="cyberhub__preview-image" />

          <video
            v-if="props.video.endsWith('.mp4')"
            :src="props.video"
            class="cyberhub__preview-video"
            controlsList="nodownload"
            controls
            playsinline
            @contextmenu.prevent
          ></video>

          <iframe
            v-else
            :src="props.video"
            class="cyberhub__preview-video"
            allow="fullscreen; picture-in-picture"
            allowfullscreen
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.cyberhub {
  @include zoom;

  margin-bottom: $margin-bottom;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    overflow: hidden;
  }

  &__title {
    max-width: 380px;
    font-weight: 700;
    font-size: 35px;

    @media (max-width: 399px) {
      font-size: 26px;
    }
  }

  &__description {
    max-width: 500px;
    font-size: clamp(12px, 1vw, 14px);
    line-height: 15px;
    margin-bottom: 10px;
  }

  &__preview {
    width: 760px;
    position: relative;
    overflow: hidden;

    @media (max-width: 759px) {
      width: 500px;
    }
  }

  &__preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__preview-video {
    max-width: 415px;
    width: 100%;
    height: 240px;
    position: absolute;
    top: 47%;
    left: 49.7%;
    object-fit: cover;
    transform: translate(-50%, -50%);

    @media (max-width: 759px) {
      max-width: 274px;
      height: 156px;
      left: 49.6%;
    }

    @media (max-width: 499px) {
      max-width: 274px;
      height: 156px;
      left: 49.6%;
    }
  }
}
</style>
