<script setup lang="ts">
import BaseSlider from '@/components/ui/BaseSlider.vue'
import { images } from '@/data/images.ts'

interface Project {
  id: number
  name: string
  title: string
  description: string
  images: string[]
}

const projects: Project[] = [
  {
    id: 1,
    name: 'IJHunt',
    title: 'Первую работу искать сложно. Особенно когда у тебя еще нет опыта',
    description:
      'Именно эту проблему решили студенты, создав IJHunt — цифрового наставника, который помогает пройти путь от первого портфолио до поиска работы',
    images: [images.ijhunt, images.pawadog],
  },

  {
    id: 2,
    name: 'Pawadog',
    title: 'Забота о питомце не должна превращаться в рутину',
    description:
      'Так родилась идея Pawadog — цифровой экосистемы, которая объединяет карту дог-френдли мест, сообщество владельцев собак и игровые механики',
    images: [images.ijhunt, images.pawadog],
  },

  {
    id: 3,
    name: 'IJHunt',
    title: 'Первую работу искать сложно. Особенно когда у тебя еще нет опыта',
    description:
      'Именно эту проблему решили студенты, создав IJHunt — цифрового наставника, который помогает пройти путь от первого портфолио до поиска работы',
    images: [images.ijhunt, images.pawadog],
  },

  {
    id: 4,
    name: 'Pawadog',
    title: 'Забота о питомце не должна превращаться в рутину',
    description:
      'Так родилась идея Pawadog — цифровой экосистемы, которая объединяет карту дог-френдли мест, сообщество владельцев собак и игровые механики',
    images: [images.ijhunt, images.pawadog],
  },
]
</script>

<template>
  <section class="student-projects">
    <h2 class="student-projects__title title-s">Посмотри, что уже сделали наши студенты</h2>

    <div
      v-for="project in projects"
      class="student-projects__block"
      :style="{ zIndex: project.id }"
      :key="project.id"
    >
      <div class="student-projects__content">
        <h3 class="student-projects__name title-md">
          {{ project.name }}
        </h3>
        <h4 class="student-projects__block-title">{{ project.title }}</h4>
        <p class="student-projects__description">{{ project.description }}</p>
      </div>

      <div class="student-projects__slider">
        <BaseSlider :images="[images.ijhunt, images.pawadog]" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.student-projects {
  @include adaptive-zoom;

  margin-bottom: $margin-bottom;

  &__title {
    position: sticky;
    top: 100px;
    text-align: center;
    margin-bottom: 30px;
  }

  &__block {
    position: sticky;
    top: 150px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 15px;
    padding: 100px 20px;
    border-radius: 15px 15px 0 0;
    background: url('@/assets/images/purple-bg.jpg') no-repeat center center;

    @media (max-width: 959px) {
      flex-direction: column;
      gap: 30px;
      padding: 50px 20px;
      text-align: center;
    }
  }

  &__content {
    max-width: 400px;
  }

  &__name {
    margin-bottom: 50px;
  }

  &__block-title {
    font-weight: 700;
    font-size: clamp(14px, 1.5vw, 18px);
    line-height: 20px;
    margin-bottom: 20px;
  }

  &__description {
    font-size: clamp(12px, 1vw, 14px);
    line-height: 15px;
  }

  &__slider {
    max-width: 400px;

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
}
</style>
