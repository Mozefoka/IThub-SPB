<script setup lang="ts">
import ButtonCta from '@/components/ui/ButtonCta.vue'

interface Case {
  id: number
  title: string
  description: string
  features: string[]
  tags: string[]
  code: string
  links: string[]
}

interface Props {
  cases: Case[]
  zoom?: 'zoom'
  container?: 'wide'
  image?: string
}

const props = defineProps<Props>()
</script>

<template>
  <section class="study-program" :class="[`study-program--${props.zoom}`]">
    <div v-if="props.image" class="study-program__top-image">
      <img :src="props.image" alt="Диск" />
    </div>

    <div class="container" :class="`container--${props.container}`">
      <div class="study-program__intro">
        <h2 class="study-program__title title-md">Следующий кейс может быть твоим!</h2>
        <p class="study-program__subtitle">
          Выбери направление в маркетинге и начни создавать своё портфолио ещё во время обучения
        </p>
      </div>

      <article v-for="studyCase in props.cases" class="profession-card" :key="studyCase.id">
        <div class="profession-card__header">
          <h3 class="profession-card__title">{{ studyCase.title }}</h3>
          <p class="profession-card__description">
            {{ studyCase.description }}
          </p>
        </div>

        <ul class="profession-card__features">
          <li
            v-for="(feature, index) in studyCase.features"
            class="profession-card__feature"
            :key="index"
          >
            {{ feature }}
          </li>
        </ul>

        <div class="profession-card__tags">
          <span v-for="(tag, index) in studyCase.tags" class="profession-card__tag" :key="index">
            {{ tag }}
          </span>
        </div>

        <div class="profession-card__button">
          <ButtonCta>Поступить</ButtonCta>
        </div>

        <div class="profession-card__program">
          <h4 class="profession-card__program-title">Программа обучения</h4>
          <span class="profession-card__program-code">{{ studyCase.code }}</span>

          <ul class="profession-card__program-links">
            <li
              v-for="(link, index) in studyCase.links"
              class="profession-card__program-link"
              :key="index"
            >
              <a href="#">{{ link }}</a>
              <img src="/src/assets/icons/link-arrow.svg" alt="Стрелка" />
            </li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.study-program {
  margin-bottom: $margin-bottom;

  &--zoom {
    @include adaptive-zoom;
  }

  &__top-image {
    max-width: 500px;
    position: relative;
    left: 60%;
    transform: translateX(-60%);
  }

  &__intro {
    max-width: 500px;
    margin-bottom: 20px;
  }

  &__title {
    margin-bottom: 15px;
  }

  &__subtitle {
    font-size: clamp(12px, 1vw, 14px);
    line-height: 1.5;
  }
}

.profession-card {
  display: grid;
  grid-template-columns: minmax(0, 190px) 1fr;
  grid-template-areas:
    'header features program'
    'button tags tags';
  gap: 30px;
  padding: 20px;
  background-color: $color-dark;
  border-radius: 15px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  @media (max-width: 1199px) {
    grid-template-areas:
      'header features'
      'button features'
      'program tags';
  }

  @media (max-width: 959px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'features'
      'tags'
      'program '
      'button';
  }

  &__header {
    grid-column: 1;
    grid-row: 1;
    grid-area: header;
  }

  &__title {
    margin-bottom: 10px;
    font-size: clamp(14px, 1.5vw, 18px);
    font-weight: 700;
    line-height: 20px;
  }

  &__description {
    font-size: clamp(12px, 1vw, 14px);
    line-height: 15px;
    color: $color-gray;
  }

  &__features {
    grid-column: 2;
    grid-row: 1;
    grid-area: features;
  }

  &__feature {
    position: relative;
    padding-left: 10px;
    font-size: clamp(12px, 1vw, 14px);
    line-height: 20px;
    color: $color-gray;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
    }

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  &__program {
    display: flex;
    flex-direction: column;
    gap: 15px;
    grid-column: 3;
    grid-row: 1;
    grid-area: program;
  }

  &__program-title {
    font-size: clamp(14px, 1.5vw, 16px);
    font-weight: 700;
  }

  &__program-code {
    width: fit-content;
    padding: 10px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
    background-color: $color-light-dark;
    border-radius: 20px;
  }

  &__program-link {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__tags {
    grid-column: 2 / 4;
    grid-row: 2;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    grid-area: tags;
  }

  &__tag {
    padding: 10px;
    margin: auto 0;
    font-size: 14px;
    background-color: $color-light-dark;
    border-radius: 20px;
    white-space: nowrap;

    @media (max-width: 559px) {
      padding: 5px;
      font-size: 10px;
    }
  }

  &__button {
    grid-area: button;
    align-self: flex-end;
  }
}
</style>
