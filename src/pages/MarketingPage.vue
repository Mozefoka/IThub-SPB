<script setup lang="ts">
import HeroMarketing from '@/components/hero/HeroMarketing.vue'
import TeachingApproach from '@/components/TeachingApproach.vue'
import SuccessStories from '@/components/SuccessStories.vue'
import StudentProjects from '@/components/StudentProjects.vue'
import StudyProgram from '@/components/StudyProgram.vue'
import BaseFaq from '@/components/BaseFaq.vue'
import LeadForm from '@/components/LeadForm.vue'
</script>

<template>
  <main class="marketing">
    <HeroMarketing />
<!--    <SuccessStories />-->
    <TeachingApproach />
    <StudentProjects />
    <StudyProgram />
    <LeadForm />
    <BaseFaq />
  </main>
</template>

<style scoped></style>
