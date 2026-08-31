<script setup lang="ts">
import WorkSlider from '@/components/WorkSlider.vue'
import { designCases, designSuccessStories, workItems } from '@/data/design.ts'
import SuccessStories from '@/components/SuccessStories.vue'
import TeacherCases from '@/components/TeacherCases.vue'
import StudentWork from '@/components/StudentWork.vue'
import StudyProgram from '@/components/StudyProgram.vue'
import LeadForm from '@/components/LeadForm.vue'
import BaseFaq from '@/components/BaseFaq.vue'
</script>

<template>
  <WorkSlider title="Твои работы будут говорить за тебя" :works="workItems" />
  <SuccessStories :cards="designSuccessStories" active="active" />
  <TeacherCases />
  <StudentWork title="Вы только посмотрите на проекты наших ребят" />
  <StudyProgram :cases="designCases" zoom="zoom" container="wide" :black="true" />
  <LeadForm title="Готов к карьере в дизайне?" />
  <BaseFaq />
</template>

<style scoped></style>
