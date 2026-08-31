<script setup lang="ts">
import BaseHero from '@/components/hero/BaseHero.vue'
import StudentTeaching from '@/components/StudentTeaching.vue'
import SliderSuccessStories from '@/components/SliderSuccessStories.vue'
import { itCases, itSliderStages } from '@/data/it.ts'
import StudyProgram from '@/components/StudyProgram.vue'
import LeadForm from '@/components/LeadForm.vue'
import BaseFaq from '@/components/BaseFaq.vue'
import { images, icons } from '@/data/images.ts'
</script>

<template>
  <BaseHero
    :title="icons.itTitle"
    subtitle="Твои первые серьёзные проекты начнутся здесь"
    :main-image="images.keyboard"
    :left-image="icons.enterDeleteKeys"
    :right-image="icons.altEscKeys"
    :keyboard="true"
    zoom="zoom"
    star="secondary"
  />
  <SliderSuccessStories :stages="itSliderStages" />
  <StudentTeaching
    title="Почему у наших студентов получается"
    left-title="Как это устроено в индустрии?"
    right-title="Как мы учим?"
    description="Пока где-то учат абстрактному айти, здесь студент с первого курса делает то же, что делают штатные разработчики в компаниях. К выпуску уже на руках реальные проекты, живой опыт работы с заказчиком и портфолио проектов, которые помогут при устройстве на работу"
    :img="images.linux"
  />
  <StudyProgram :cases="itCases" container="wide" />
  <LeadForm title="Готов к карьере в ИТ?" btn-variant="secondary" />
  <BaseFaq :img="icons.keycaps" />
</template>

<style scoped></style>
