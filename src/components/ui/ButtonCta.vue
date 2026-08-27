<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: 'small' | 'medium' | 'large'
    variant?: 'primary' | 'secondary'
  }>(),
  {
    variant: 'primary',
  },
)

const buttonClasses = computed(() => [
  'button-cta',
  `button-cta--${props.size}`,
  `button-cta--${props.variant}`,
])
</script>

<template>
  <button :class="buttonClasses">
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
