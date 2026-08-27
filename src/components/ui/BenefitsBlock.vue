<script setup lang="ts">
interface BenefitsBlockProps {
  heading: string
  benefits: string[]
}

const props = defineProps<BenefitsBlockProps>()
</script>

<template>
  <div class="benefits-block">
    <h3 class="benefits-block__heading">{{ props.heading }}</h3>

    <ul class="benefits-block__list">
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
  &__heading {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  &__list {
    display: flex;
    justify-content: space-between;
    gap: 15px;

      @media (max-width: 1199px) {
        flex-direction: column;
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
