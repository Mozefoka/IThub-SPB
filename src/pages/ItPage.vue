<script setup lang="ts">
import BaseHero from '@/components/hero/BaseHero.vue'
import StudentTeaching from '@/components/StudentTeaching.vue'
import SliderSuccessStories from '@/components/SliderSuccessStories.vue'
import { itCases, itSliderStages } from '@/data/it.ts'
import StudyProgram from '@/components/StudyProgram.vue'
import LeadForm from '@/components/LeadForm.vue'
import BaseFaq from '@/components/BaseFaq.vue'
</script>

<template>
  <BaseHero
    title="src/assets/icons/it-title.svg"
    subtitle="Твои первые серьёзные проекты начнутся здесь"
    main-image="src/assets/images/keyboard.webp"
    left-image="src/assets/icons/enter-delete-keys.png"
    right-image="src/assets/icons/alt-esc-keys.png"
    :keyboard=true
    zoom="zoom"
    star="secondary"
  />
  <SliderSuccessStories :stages="itSliderStages" />
  <StudentTeaching
    title="Почему у наших студентов получается"
    left-title="Как это устроено в индустрии?"
    right-title="Как мы учим?"
    description="Пока где-то учат абстрактному айти, здесь студент с первого курса делает то же, что делают штатные разработчики в компаниях. К выпуску уже на руках реальные проекты, живой опыт работы с заказчиком и портфолио проектов, которые помогут при устройстве на работу"
    img="src/assets/images/linux.png"
  />
  <StudyProgram :cases="itCases" container="wide" />
  <LeadForm title="Готов к карьере в ИТ?" btn-variant="secondary" />
  <BaseFaq img="src/assets/icons/keycaps.png" />
</template>

<style scoped></style>
