<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCreative, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-creative'
import BaseBadge from '@/components/ui/BaseBadge.vue'

interface SuccessStory {
  id: number
  title: string
  photo: string
  studentName: string
  studentCourse: string
  badgeIcon?: string
  badgeText: string
  description: string[]
}

const stories: SuccessStory[] = [
  {
    id: 1,
    title: 'Трудоустроился на 2 курсе',
    photo: '/src/assets/images/roman.webp',
    studentName: 'Никита Барановский',
    studentCourse: 'Студент ITHub СПБ, 2 курс',
    badgeIcon: '/src/assets/icons/success-stories-icon.svg',
    badgeText: 'Траектория быстрого роста в ITHub',
    description: [
      'Уже на втором курсе Никита стал ведущим маркетологом в Union. Возглавил команду из четырех специалистов!',
      'Во время учебы он решал реальные задачи, участвовал в коммерческих проектах и прокачивался на бизнес-играх в ITHUB',
    ],
  },

  {
    id: 2,
    title: 'Стала призёром международного конкурса',
    photo: '/src/assets/images/roman.webp',
    studentName: 'Анастасия Акчурина',
    studentCourse: 'Студентка ITHub СПБ, 2 курс',
    badgeIcon: '/src/assets/icons/success-stories-icon.svg',
    badgeText: 'В ITHub теория мгновенно переходит в практику',
    description: [
      'Настя заняла 3-е место на международном конкурсе рекламы «Золотой колос». С проектом, который родился на бизнес-игре в IThub — там она вместе с командой прошла путь от идеи продукта до готовой стратегии продвижения',
    ],
  },

  {
    id: 3,
    title: 'Трудоустроился на 2 курсе',
    photo: '/src/assets/images/roman.webp',
    studentName: 'Никита Барановский',
    studentCourse: 'Студент ITHub СПБ, 2 курс',
    badgeText: 'Преподаватели ITHub дают студентам возможность работать с реальными бюджетами',
    description: [
      'Уже на втором курсе Никита стал ведущим маркетологом в Union. Возглавил команду из четырех специалистов!',
      'Во время учебы он решал реальные задачи, участвовал в коммерческих проектах и прокачивался на бизнес-играх в ITHUB',
    ],
  },
]
</script>

<template>
  <section class="success-stories">
    <h2 class="success-stories__title title-s">Истории успеха</h2>
    <Swiper
      :modules="[EffectCreative, Mousewheel]"
      effect="creative"
      slides-per-view="auto"
      :mousewheel="{ releaseOnEdges: true }"
      :creative-effect="{
        prev: { translate: [-1000, 400, 0], rotate: [0, 0, -90], opacity: 0.6 },
        next: { translate: [400, 400, 1000], rotate: [0, 0, 90], opacity: 0.6 },
      }"
    >
      <SwiperSlide v-for="story in stories" :key="story.id">
        <article class="success-stories__card">
          <h3 class="success-stories__card-title title-md">
            {{ story.title }}
          </h3>

          <div class="success-stories__card-photo">
            <img :src="story.photo" alt="Студент" />
          </div>

          <div class="success-stories__card-panel">
            <p class="success-stories__card-panel-name">
              {{ story.studentName }}
            </p>

            <p class="success-stories__card-panel-course">
              {{ story.studentCourse }}
            </p>

            <div class="success-stories__card-panel-badge">
              <BaseBadge :img="story.badgeIcon" :border="'secondary'">
                {{ story.badgeText }}
              </BaseBadge>
            </div>

            <div class="success-stories__card-panel-description">
              <p v-for="(paragraph, index) in story.description" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </article>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.success-stories {
  @include adaptive-zoom;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: radial-gradient(
    circle,
    rgba($color-purple, 0.6) 0%,
    rgba($color-purple, 0.25) 40%,
    transparent 55%
  );
  margin-bottom: $margin-bottom;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('@/assets/icons/long-star.svg') no-repeat center / 700px;
  }

  &__title {
    text-align: center;
    margin-bottom: 20px;
  }

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &__card-title {
    max-width: 340px;
    text-align: center;
  }

  &__card-photo {
    max-width: 300px;
    width: 100%;

    img {
      object-fit: cover;
    }
  }

  &__card-panel {
    max-width: 400px;
    position: relative;
    top: -150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    border-radius: 15px;
    background-color: $color-dark;
    text-align: center;
  }

  &__card-panel-name {
    font-weight: 700;
    font-size: clamp(14px, 1.5vw, 18px);
  }

  &__card-panel-course {
    font-size: clamp(12px, 1vw, 14px);
    color: $color-gray;
    margin-bottom: 20px;
  }

  &__card-panel-badge {
    max-width: 180px;
    position: absolute;
    top: -40px;
    right: -65px;
    transform: rotate(15deg);
    z-index: 2;
  }

  &__card-panel-description {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: clamp(12px, 1vw, 14px);
    line-height: 1.15;
  }

  &__slider {
    position: relative;
    z-index: 2;
  }
}
</style>
