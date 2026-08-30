<script setup lang="ts">
import HeroMarketing from '@/components/hero/HeroMarketing.vue'
import TeachingApproach from '@/components/TeachingApproach.vue'
import SuccessStories from '@/components/SuccessStories.vue'
import StudentProjects from '@/components/StudentProjects.vue'
import StudyProgram from '@/components/StudyProgram.vue'
import BaseFaq from '@/components/BaseFaq.vue'
import LeadForm from '@/components/LeadForm.vue'
import { marketingCases, marketingSuccessStories } from '@/data/marketing'
</script>

<template>
  <main class="marketing">
    <HeroMarketing />
    <SuccessStories :cards="marketingSuccessStories" />
    <TeachingApproach />
    <StudentProjects />
    <StudyProgram :cases="marketingCases" zoom="zoom" />
    <LeadForm title="Готов к карьере в маркетинге?" />
    <BaseFaq />
  </main>
</template>

<style scoped></style>
