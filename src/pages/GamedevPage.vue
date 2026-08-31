<script setup lang="ts">
import BaseHero from '@/components/hero/BaseHero.vue'
import StudentCases from '@/components/StudentCases.vue'
import CyberHub from '@/components/CyberHub.vue'
import StudyProgram from '@/components/StudyProgram.vue'
import { gamedevCases, gamedevSuccessStories } from '@/data/gamedev.ts'
import GameProjects from '@/components/GameProjects.vue'
import LeadForm from '@/components/LeadForm.vue'
import SuccessStories from '@/components/SuccessStories.vue'
import BaseFaq from '@/components/BaseFaq.vue'
import { icons, images } from '@/data/images.ts'
</script>

<template>
  <main class="gamedev">
    <BaseHero
      :title="icons.gamedevTitle"
      subtitle="Набор 2026: 80% мест уже занято"
      :main-image="images.gamepad"
      star="primary"
    />
    <SuccessStories :cards="gamedevSuccessStories" />
    <StudentCases title="Почему у наших студентов получается" />
    <CyberHub
      title="CyberHub: мечта студентов сбылась"
      description="Ещё с момента открытия хаб искал возможность создать собственный киберспортивный клуб, и осенью 2024 это случилось. CyberHub уже в декабре провёл свой первый внутренний турнир по двум дисциплинам: Dota 2 и CS2. Николай Авдонькин, создатель и руководитель клуба, рассказал о целях и планах на будущее."
      video="https://kinescope.io/tzPFG64ZZrK1wUQWgg4L4m"
    />
    <GameProjects title="Вы только посмотрите на проекты наших ребят" />
    <StudyProgram :cases="gamedevCases" image="src/assets/images/disc.png" />
    <LeadForm title="Готов к карьере в разработке игр?" btn-variant="secondary" />
    <BaseFaq />
  </main>
</template>

<style scoped></style>
