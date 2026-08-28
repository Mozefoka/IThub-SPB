<script setup lang="ts">
import { ref } from 'vue'
import BaseSlider from '@/components/ui/BaseSlider.vue'

interface GameProject {
  id: number
  name: string
  poster: string
  video: string
  description: string
}

const props = defineProps({ title: String })

const playingId = ref<number | null>(null)

const games: GameProject[] = [
  {
    id: 1,
    name: 'Story of Henry',
    poster: 'src/assets/images/fly-agaric.png',
    video:
      'https://kinescope.io/embed/j72xySrZ2pNFrAUon8MSSD?&muted=true&autoplay=true&autopause=false',
    description:
      'Рабочий прототип игры. Студенты сами создали саундтрек для игры и смоделировали все визуальные составляющие: UI и дизайн сцен с персонажами',
  },

  {
    id: 2,
    name: "Michael's Camp",
    poster: 'src/assets/images/fly-agaric.png',
    video:
      'https://kinescope.io/embed/j72xySrZ2pNFrAUon8MSSD?&muted=true&autoplay=true&autopause=false',
    description:
      'Рабочий прототип игры. Студенты создали игру на базе диалогов, разработав визуалы персонажей и дополняющие её арты',
  },
]
</script>

<template>
  <section class="games">
    <div class="container">
      <h2 class="games__title">{{ props.title }}</h2>

      <div class="games__flex">
        <article v-for="game in games" class="games__card" :key="game.id">
          <div class="games__card-header">
            <span class="games__card-number">{{ String(game.id).padStart(2, '0') }}</span>
            <h3 class="games__card-name title-md">{{ game.name }}</h3>
          </div>

          <div class="games__card-video">
            <video
              v-if="game.video.endsWith('.mp4')"
              :src="game.video"
              class="games__card-video-item"
              :poster="game.poster"
              controls
              playsinline
              @contextmenu.prevent
            />

            <div v-else class="games__card-video-preview">
              <img
                v-if="playingId !== game.id"
                :src="game.poster"
                alt="Игра"
                class="games__card-video-item"
              />

              <button
                v-if="playingId !== game.id"
                class="games__card-video-preview-btn"
                @click="playingId = game.id"
              >
                <img src="@/assets/icons/play-btn.svg" alt="Воспроизвести" />
              </button>

              <iframe
                v-else
                :src="game.video"
                class="games__card-video-item"
                allow="fullscreen; picture-in-picture"
                allowfullscreen
              />
            </div>
          </div>

          <p class="games__card-description">{{ game.description }}</p>
        </article>
      </div>

      <div class="games__swiper">
        <div class="games__swiper-header">
          <div class="games__swiper-header-item">
            <span class="games__card-number">03</span>
            <h3 class="games__card-name title-md">PureRay</h3>
          </div>

          <p class="games__swiper-description games__card-description">
            Собственный игровой 3D-движок с интегрированным визуальным программированием
          </p>
        </div>

        <div class="games__swiper-slider">
          <BaseSlider
            slim="slim"
            :images="['src/assets/images/pureray.webp', 'src/assets/images/pureray2.webp']"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.games {
  @include zoom;
  margin-bottom: $margin-bottom;

  &__title {
    max-width: 550px;
    margin: 0 auto 40px auto;
    font-weight: 600;
    font-size: clamp(30px, 2.5vw, 40px);
    line-height: 50px;
    text-align: center;
  }

  &__flex {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 50px;

    @media (max-width: 639px) {
      flex-direction: column;
      align-items: center;
      gap: 50px;
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__card-header {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__card-number {
    font-weight: 700;
    font-size: 10px;
    color: $color-gray;
  }

  &__card-video-item {
    height: 315px;
    margin-bottom: 10px;
  }

  &__card-video-preview {
    position: relative;
  }

  &__card-video-preview-btn {
    width: 70px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      object-fit: cover;
    }
  }

  &__card-description {
    max-width: 280px;
    line-height: 1.15;
  }

  &__swiper {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media (max-width: 639px) {
      flex-direction: column;
    }
  }

  &__swiper-header {
    display: flex;
    flex-direction: column;

    @media (max-width: 639px) {
      flex-direction: row;
      justify-content: space-between;
      gap: 15px;
    }
  }

  &__swiper-header-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__swiper-description {
    margin-top: auto;
  }

  &__swiper-slider {
    max-width: 560px;

    @media (max-width: 769px) {
      max-width: 430px;
    }

    @media (max-width: 639px) {
      max-width: 100%;
    }
  }
}
</style>
