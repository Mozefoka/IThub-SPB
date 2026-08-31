<script setup lang="ts">
import BenefitsBlock from '@/components/ui/BenefitsBlock.vue'
import BaseSlider from '@/components/ui/BaseSlider.vue'
import { images } from '@/data/images.ts'

interface StudentCase {
  id: number
  caseTitle: string
  subtitle?: string
  description: string
  images: string[]
}

const props = defineProps({ title: String })

const studentCases: StudentCase[] = [
  {
    id: 1,
    caseTitle: 'Международный Game Jam от Pirate Software',
    description:
      'На две недели стены хаба превратились в настоящую геймдев-лабораторию, где команды с нуля создавали рабочие игровые прототипы для отправки на суд мирового жюри. А финалом марафона стал стрим, где преподаватели IThub лично сели тестировать студенческие игры, устроив честный разбор в прямом эфире',
    images: [images.rules, images.team2],
  },

  {
    id: 2,
    caseTitle: 'Всероссийская конференция разработчиков игр',
    subtitle:
      'Ассистенты кафедры вместе со студентами пришли на Всероссийскую конференцию гейм-разработчиков',
    description:
      'Ребята работали волонтерами: управляли процессами на площадке, встречали косплееров и собственными глазами увидели, как устроена изнанка топ-мероприятий индустрии',
    images: [images.konfa, images.rules, images.team2],
  },
]
</script>

<template>
  <section class="student-cases">
    <h2 class="student-cases__title title-lg">{{ props.title }}</h2>

    <article v-for="studentCase in studentCases" class="student-cases__card" :key="studentCase.id">
      <div class="student-cases__card-text">
        <h3 class="student-cases__card-title title-md">{{ studentCase.caseTitle }}</h3>
        <p v-if="studentCase.subtitle" class="student-cases__card-subtitle">
          {{ studentCase.subtitle }}
        </p>
        <p class="student-cases__card-description">{{ studentCase.description }}</p>
      </div>

      <div class="student-cases__card-benefits">
        <BenefitsBlock
          variants="secondary"
          title="В чём польза для студентов?"
          :benefits="[
            'Реальное участие в глобальном хакатоне от легенд индустрии, которое мгновенно прокачивает резюме любого разработчика',
            'Опыт сумасшедшей командной работы в условиях, когда идею нужно превратить в играбельный продукт за считанные дни',
          ]"
        />
      </div>

      <div class="student-cases__card-slider">
        <BaseSlider :images="studentCase.images" />
      </div>
    </article>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.student-cases {
  padding: 0 10px;
  margin-bottom: $margin-bottom;
  zoom: 1.6;

  @media (max-width: 1150px) {
    zoom: 1.4;
  }

  @media (max-width: 799px) {
    zoom: 1.2;
  }

  @media (max-width: 639px) {
    zoom: 1;
  }

  &__title {
    max-width: 660px;
    margin: 0 auto 50px auto;
    text-align: center;
  }

  &__card {
    display: grid;
    grid-template-columns: minmax(0, 570px) minmax(0, 430px);
    grid-template-areas:
      'text slider'
      'benefits slider';
    justify-content: space-between;
    column-gap: 20px;

    &:not(:last-child) {
      margin-bottom: $margin-bottom;
    }

    @media (max-width: 1499px) {
      grid-template-columns: minmax(0, 570px) minmax(0, 360px);
    }

    @media (max-width: 959px) {
      grid-template-columns: minmax(0, 300px) minmax(0, 360px);
    }

    @media (max-width: 799px) {
      grid-template-columns: minmax(0, 300px) minmax(77px, 360px);
    }

    @media (max-width: 639px) {
      grid-template-columns: minmax(0, 1fr) minmax(250px, 1fr);
      grid-template-areas:
        'text text'
        'benefits slider';
    }

    @media (max-width: 479px) {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas:
        'text'
        'slider'
        'benefits';
    }
  }

  &__card-text {
    grid-area: text;
    margin-bottom: 30px;
  }

  &__card-subtitle {
    margin: 10px 0;
    font-weight: 700;
    font-size: clamp(14px, 1vw, 16px);
    line-height: 20px;
    opacity: 0.4;
  }

  &__card-description {
    margin-top: 10px;
    font-size: clamp(12px, 1vw, 14px);
    line-height: 20px;
  }

  &__card-benefits {
    grid-area: benefits;
  }

  &__card-slider {
    grid-area: slider;

    @media (max-width: 479px) {
      margin-bottom: 20px;
    }
  }
}
</style>
