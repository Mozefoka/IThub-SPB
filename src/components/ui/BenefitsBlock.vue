<script setup lang="ts">
interface Benefits {
  title: string
  benefits: string[]
  variants?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Benefits>(), {
  variants: 'primary',
})
</script>

<template>
  <div class="benefits-block">
    <h3 class="benefits-block__title">{{ props.title }}</h3>

    <ul class="benefits-block__list" :class="[`benefits-block__list--${props.variants}`]">
      <li class="benefits-block__list-item" v-for="(benefit, i) in props.benefits" :key="i">
        <span>{{ String(i + 1).padStart(2, '0') }}</span>
        <p>{{ benefit }}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/_variables';

.benefits-block {
  &__title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  &__list {
    display: flex;
    justify-content: space-between;
    gap: 15px;

    &--primary {
      @media (max-width: 1199px) {
        flex-direction: column;
      }
    }

    &--secondary {
      @media (max-width: 1499px) {
        width: 570px;
      }

      @media (max-width: 959px) {
        width: 500px;
      }

      @media (max-width: 639px) {
        flex-direction: column;
        width: 100%;
      }
    }
  }

  &__list-item {
    display: flex;
    flex-direction: column;
    flex: 1 1 50%;
    gap: 10px;

    span {
      color: variables.$color-gray;
    }
  }
}
</style>
