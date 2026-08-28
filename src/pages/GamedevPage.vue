<script setup lang="ts">
import BaseHero from '@/components/hero/BaseHero.vue'
import StudentCases from '@/components/StudentCases.vue'
import CyberHub from '@/components/CyberHub.vue'
import StudyProgram from '@/components/StudyProgram.vue'
import { gamedevCards } from '@/data/gamedev.ts'
</script>

<template>
  <main class="gamedev">
    <BaseHero
      title="src/assets/icons/gamedev-title.svg"
      subtitle="Набор 2026: 80% мест уже занято"
      main-image="src/assets/images/gamepad.webp"
    />

    <StudentCases title="Почему у наших студентов получается" />

    <CyberHub
      title="CyberHub: мечта студентов сбылась"
      description="Ещё с момента открытия хаб искал возможность создать собственный киберспортивный клуб, и осенью 2024 это случилось. CyberHub уже в декабре провёл свой первый внутренний турнир по двум дисциплинам: Dota 2 и CS2. Николай Авдонькин, создатель и руководитель клуба, рассказал о целях и планах на будущее."
      video="https://kinescope.io/tzPFG64ZZrK1wUQWgg4L4m"
    />

    <StudyProgram :cards="gamedevCards" />
  </main>
</template>

<style scoped></style>
