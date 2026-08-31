<script setup lang="ts">
import { ref, type ComponentPublicInstance } from 'vue'

interface FaqItem {
  id: number
  question: string
  answer: string
}

const props = defineProps({
  img: {
    type: String,
    required: false,
  }
})

const faqItems = ref<FaqItem[]>([
  {
    id: 1,
    question: 'Какой документ получит выпускник?',
    answer:
      'По окончанию обучения выпускник колледжа IThub получает диплом государственного образца о среднем профессиональном образовании, а также диплом о профессиональной переподготовке по выбранной бизнес-роли',
  },

  {
    id: 2,
    question: 'Что значит «80% практики»? Как это выглядит на паре?',
    answer:
      'На паре студенты не просто слушают — они делают. Например, на дисциплине «Контекстная реклама» группы запускают настоящие рекламные кампании на реальных бюджетах под контролем преподавателя-практика. Теория даётся компактно (20%), остальное время — работа в инструментах (Яндекс Директ, Метрика, Tilda и т. д.) и защита решений перед экспертами',
  },

  {
    id: 3,
    question: 'Как устроены экзамены? Будут ли стрессовые сессии?',
    answer:
      'Никаких классических сессий, зубрёжки билетов и бессонных ночей. У нас всё устроено по стандартам индустрии: контрольные точки и защита реальных кейсов. Оценку студент получает за осязаемый результат: запущенную рекламную кампанию, разработанную стратегию продвижения или оформленный проект',
  },

  {
    id: 4,
    question: 'Какой документ получит выпускник?',
    answer:
      'По окончанию обучения выпускник колледжа IThub получает диплом государственного образца о среднем профессиональном образовании, а также диплом о профессиональной переподготовке по выбранной бизнес-роли',
  },

  {
    id: 5,
    question: 'Что значит «80% практики»? Как это выглядит на паре?',
    answer:
      'На паре студенты не просто слушают — они делают. Например, на дисциплине «Контекстная реклама» группы запускают настоящие рекламные кампании на реальных бюджетах под контролем преподавателя-практика. Теория даётся компактно (20%), остальное время — работа в инструментах (Яндекс Директ, Метрика, Tilda и т. д.) и защита решений перед экспертами',
  },

  {
    id: 6,
    question: 'Как устроены экзамены? Будут ли стрессовые сессии?',
    answer:
      'Никаких классических сессий, зубрёжки билетов и бессонных ночей. У нас всё устроено по стандартам индустрии: контрольные точки и защита реальных кейсов. Оценку студент получает за осязаемый результат: запущенную рекламную кампанию, разработанную стратегию продвижения или оформленный проект',
  },
])

const openId = ref<number | null>(null)

const answerRefs = ref<HTMLElement[]>([])

const setAnswerRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  if (el instanceof HTMLElement) {
    answerRefs.value[index] = el
  }
}

const toggleItem = (id: number) => {
  openId.value = openId.value === id ? null : id
}

const getMaxHeight = (index: number, id: number) => {
  if (openId.value !== id) return '0px'
  const el = answerRefs.value[index]
  return el ? `${el.scrollHeight}px` : '0px'
}
</script>

<template>
  <section class="faq">
    <div class="container">
      <div v-if="props.img" class="faq__image">
        <img :src="props.img" alt="Спроси">
      </div>

      <h2 class="faq__title title-lg">Часто задаваемые вопросы</h2>

      <div class="faq__list">
        <article
          v-for="(faq, index) in faqItems"
          :key="faq.id"
          class="faq__item"
          :class="{ active: openId === faq.id }"
        >
          <button
            class="faq__question"
            type="button"
            :aria-expanded="openId === faq.id"
            @click="toggleItem(faq.id)"
          >
            <span class="faq__question-text">{{ faq.question }}</span>
            <span class="faq__icon"></span>
          </button>

          <div class="faq__answer" :style="{ maxHeight: getMaxHeight(index, faq.id) }">
            <div class="faq__answer-content" :ref="(el) => setAnswerRef(el, index)">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.faq {
  margin-bottom: $margin-bottom;

  &__image {
    max-width: 320px;
    margin: 0 auto;

    img {
      width: 100%;
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 30px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__item {
    border-radius: 30px;
    background-color: $color-dark;

    &:hover {

      .faq__icon {
        border-radius: 50%;
        background-color: $color-light-dark;
        transition: background-color ease .5s;
      }
    }
  }

  &__question {
    width: 100%;
    padding: clamp(15px, 3vw, 25px) 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    color: $color-white;
    text-align: start;
  }

  &__question-text {
    font-size: clamp(16px, 1.5vw, 20px);
    font-weight: 700;
    line-height: 1.35;
  }

  &__icon {
    position: relative;
    width: 35px;
    height: 35px;
    flex-shrink: 0;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      background: $color-gray;
      transition: transform 0.35s ease;
    }

    &::before {
      width: 25px;
      height: 2px;
      transform: translate(-50%, -50%);
    }

    &::after {
      width: 2px;
      height: 25px;
      transform: translate(-50%, -50%);
    }
  }

  &__item.active &__icon {
    &::before,
    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  &__answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.45s ease;
  }

  &__answer-content {
    padding: 0 20px 40px;
    font-size: clamp(14px, 2vw, 16px);
    line-height: 1.55;
  }
}
</style>
