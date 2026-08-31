<script setup lang="ts">
import { ref, computed } from 'vue'
import BenefitsBlock from '@/components/ui/BenefitsBlock.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { images } from '@/data/images.ts'
import video from '@/assets/video/oiia.mp4'

interface Guest {
  name: string
  photo: string
  subscribers: string
}

interface TeachingApproachRules {
  id: number
  title: string
  teacher: { name: string; photo: string }
  description: string[]
  benefits?: string[]
  guests?: Guest[]
  type: 'video' | 'image'
  media: string
}

const teachingBlocks = ref<TeachingApproachRules[]>([
  {
    id: 1,
    title: 'Бизнес игра ITHUB x ENDY x ROCK&ROMI',
    teacher: { name: 'Александра Воронина', photo: images.alexandra },
    description: [
      'За 6 часов студенты ITHub объединились в команды маркетологов и дизайнеров, чтобы разработать проекты, продумать их позиционирование и представить свои решения экспертам индустрии',
    ],
    benefits: [
      'Опыт настоящей командной работы в связке маркетолог + дизайнер. Студенты учатся превращать идеи и смыслы бренда в визуальные решения',
      'Реальный кейс для портфолио и обратную связь от практикующих специалистов',
    ],
    type: 'video',
    media: video,
  },

  {
    id: 2,
    title: 'Пара с действующими блогерами',
    teacher: { name: 'Александра Воронина', photo: images.alexandra },
    guests: [
      {
        name: 'Александра Воронина',
        photo: images.alexandra,
        subscribers: '42.9 тыс. подписчиков',
      },

      {
        name: 'Александра Воронина',
        photo: images.alexandra,
        subscribers: '128 тыс. подписчиков',
      },
    ],
    description: [
      'Яна пригласила на занятие Кристину Гулину и Марию Яцемирскую — практикующих инфлюенсеров и создателей контента. Они поделились опытом создания контента, развития аудитории, работы с брендами и монетизации личного блога',
    ],
    type: 'video',
    media: 'https://kinescope.io/hE7Y98Eb6T85QTSe1dxUaR',
  },

  {
    id: 3,
    title: 'Открытая пара с Охта Парком',
    teacher: { name: 'Александра Воронина', photo: images.alexandra },
    description: [
      'На занятии студенты работали с реальными кейсами от рестораторов и отельеров: разбирали задачи бизнеса, предлагали решения и погружались в настоящие бизнес-процессы',
    ],
    type: 'image',
    media: images.team,
  },

  {
    id: 4,
    title: 'Открытая пара с «Петербургский кондитер»',
    teacher: { name: 'Александра Воронина', photo: images.alexandra },
    description: [
      'Студенты-маркетологи работали над реальной задачей фабрики «Петербургский кондитер»: разработали предложения по обновлению фирменного стиля и позиционирования бренда',

      'Свои решения они защитили перед экспертным жюри — генеральным директором предприятия, преподавателями и представителями digital-индустрии. После защиты студентов пригласили на экскурсию по производству, где 8 участников проекта получили предложения о стажировке',
    ],
    type: 'image',
    media: images.team,
  },
])

const activeId = ref<number>(teachingBlocks.value[0]!.id)

const currentBlock = computed(() =>
  teachingBlocks.value.find((block) => block.id === activeId.value),
)
</script>

<template>
  <section class="teaching-approach">
    <div class="container">
      <div class="teaching-approach__content">
        <h3 class="teaching-approach__title title-s">Подход наших преподавателей</h3>

        <div class="teaching-approach__tabs">
          <button
            v-for="block in teachingBlocks"
            :key="block.id"
            type="button"
            class="teaching-approach__tabs-button"
            :class="{ 'teaching-approach__tabs-button--active': block.id === activeId }"
            @click="activeId = block.id"
          >
            {{ block.title }}
          </button>
        </div>

        <div v-if="currentBlock" class="teaching-approach__panel">
          <h2 class="teaching-approach__panel-title title-md">{{ currentBlock.title }}</h2>

          <div class="teaching-approach__panel-body">
            <div class="teaching-approach__panel-teacher">
              <div class="teaching-approach__panel-teacher-photo">
                <img :src="currentBlock.teacher.photo" alt="Преподаватель" />
              </div>

              <div class="teaching-approach__panel-teacher-text">
                <p class="teaching-approach__panel-teacher-position">Преподаватель</p>
                <p class="teaching-approach__panel-teacher-name">
                  {{ currentBlock.teacher.name }}
                </p>
              </div>
            </div>

            <div v-if="currentBlock.guests?.length" class="teaching-approach__guests">
              <div
                v-for="guest in currentBlock.guests"
                :key="guest.name"
                class="teaching-approach__guest"
              >
                <div class="teaching-approach__guest-img">
                  <img :src="guest.photo" :alt="guest.name" />
                </div>

                <div class="teaching-approach__guest-text">
                  <div class="teaching-approach__guest-badge">
                    <BaseBadge :size="'s'" :border="'secondary'">
                      {{ guest.subscribers }}
                    </BaseBadge>
                  </div>

                  <p class="teaching-approach__guest-name">{{ guest.name }}</p>
                </div>
              </div>
            </div>

            <div class="teaching-approach__description">
              <p v-for="(paragraph, index) in currentBlock.description" :key="index">
                {{ paragraph }}
              </p>
            </div>

            <BenefitsBlock
              v-if="currentBlock.benefits?.length"
              title="Что получают студенты?"
              :benefits="currentBlock.benefits"
            />
          </div>

          <div class="teaching-approach__media">
            <div v-if="currentBlock.type === 'video'" class="teaching-approach__media-video">
              <video
                v-if="currentBlock.media.endsWith('.mp4')"
                class="teaching-approach__media-item"
                :src="currentBlock.media"
                autoplay
                muted
                loop
                playsinline
              />
              <iframe
                v-else
                class="teaching-approach__media-item"
                :key="currentBlock.id"
                :src="`${currentBlock.media}?background=1`"
                allow="autoplay"
              />
            </div>
            <img
              v-else
              :src="currentBlock.media"
              :alt="currentBlock.title"
              class="teaching-approach__media-item"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/_variables' as *;
@use '@/styles/_mixins' as *;

.teaching-approach {
  @include adaptive-zoom;

  margin-bottom: $margin-bottom;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  &__title {
    align-self: center;
  }

  &__tabs {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;

    @media (max-width: 959px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 479px) {
      grid-template-columns: 1fr;
    }
  }

  &__tabs-button {
    padding: 20px;
    font-size: clamp(12px, 1vw, 14px);
    line-height: 1.2;
    border-radius: 15px;
    color: $color-gray;
    background-color: $color-dark;
    transition: all ease 0.2s;

    @media (max-width: 639px) {
      padding: 5px;
    }

    &--active {
      color: $color-white;
      background-color: $color-purple;
    }
  }

  &__panel {
    display: grid;
    gap: 20px 50px;
    grid-template-columns: minmax(0, 555px) minmax(0, 300px);
    grid-template-areas:
      'title media'
      'body media';

    @media (max-width: 959px) {
      grid-template-areas:
        'title title'
        'body media';
    }

    @media (max-width: 639px) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'title'
        'media'
        'body';
    }
  }

  &__panel-body {
    display: flex;
    flex-direction: column;
    gap: 30px;
    grid-area: body;
  }

  &__panel-title {
    max-width: 460px;
    grid-area: title;

    @media (max-width: 639px) {
      max-width: 350px;
      text-align: center;
    }
  }

  &__panel-teacher {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__panel-teacher-photo {
    width: 70px;
    height: 70px;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  &__panel-teacher-text {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__panel-teacher-position {
    color: $color-gray;
  }

  &__panel-teacher-name {
    font-size: 18px;
    font-weight: 700;
    color: $color-white;
  }

  &__guests {
    display: flex;
    gap: 10px;

    @media (max-width: 959px) {
      flex-direction: column;
    }

    @media (max-width: 639px) {
      flex-direction: row;
    }

    @media (max-width: 479px) {
      flex-direction: column;
    }
  }

  &__guest {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__guest-img {
    width: 70px;
    height: 70px;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  &__guest-text {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__guest-badge {
    max-width: 140px;
    position: relative;
    left: -25px;
    z-index: -1;
  }

  &__guest-name {
    font-weight: 700;
    max-width: 120px;
  }

  &__description {
    display: flex;
    flex-direction: column;
    gap: 30px;

    p {
      line-height: 15px;
    }
  }

  &__media {
    border-radius: 20px;
    overflow: hidden;
    grid-area: media;

    @media (max-width: 639px) {
      height: 300px;
    }
  }

  &__media-item {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__media-video {
    height: 100%;
  }
}
</style>
