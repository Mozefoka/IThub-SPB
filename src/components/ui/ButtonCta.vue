<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: 'small' | 'medium' | 'large'
    variant?: 'primary' | 'secondary'
    form?: boolean
  }>(),
  {
    variant: 'primary',
  },
)

const scrollToLeadForm = () => {
  document.getElementById('lead-form')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const buttonClasses = computed(() => [
  'button-cta',
  `button-cta--${props.size}`,
  `button-cta--${props.variant}`,
])
</script>

<template>
  <button v-if="form" type="submit" :class="buttonClasses">
    <slot />
  </button>

  <button v-else :class="buttonClasses" @click="scrollToLeadForm">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@use '@/styles/_variables.scss' as *;

.button-cta {
  width: 100%;
  padding: 10px;
  font-weight: 700;
  color: $color-white;
  background-color: $color-purple;

  &--primary {
    border-radius: 30px;
  }

  &--secondary {
    border: solid 1px $color-white;
  }

  &--small {
    max-width: 150px;
  }

  &--medium {
    max-width: 200px;
  }

  &--large {
    max-width: 265px;
  }
}
</style>
