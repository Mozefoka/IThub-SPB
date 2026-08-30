<script setup lang="ts">
import WorkSlider from '@/components/WorkSlider.vue'
import { designSuccessStories, workItems } from '@/data/design.ts'
import SuccessStories from '@/components/SuccessStories.vue'
</script>

<template>
  <WorkSlider title="Твои работы будут говорить за тебя" :works="workItems" />
  <SuccessStories :cards="designSuccessStories" active="active" />
</template>

<style scoped></style>
