<script setup lang="ts">
import HeroMarketing from '@/components/hero/HeroMarketing.vue'
import TeachingApproach from '@/components/TeachingApproach.vue'
import SuccessStories from '@/components/SuccessStories.vue'
import StudentProjects from '@/components/StudentProjects.vue'
import StudyProgram from '@/components/StudyProgram.vue'
import BaseFaq from '@/components/BaseFaq.vue'
import LeadForm from '@/components/LeadForm.vue'
import { marketingCards } from '@/data/marketing'
</script>

<template>
  <main class="marketing">
    <HeroMarketing />
    <SuccessStories />
    <TeachingApproach />
    <StudentProjects />
    <StudyProgram :cards="marketingCards" zoom="zoom" />
    <LeadForm />
    <BaseFaq />
  </main>
</template>

<style scoped></style>
