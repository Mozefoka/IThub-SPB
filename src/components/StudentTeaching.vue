<script setup lang="ts">
interface Teaching {
  id: number
  text: string
}

interface Props {
  title: string
  leftTitle: string
  rightTitle: string
  img?: string
}

const props = defineProps<Props>()

const teachingBlocks: Teaching[] = [
  {
    id: 1,
    text: 'Разработчик работает в команде: код-ревью, планирование, общие дедлайны',
  },

  {
    id: 2,
    text: 'На хакатонах с индустриальными заказчиками студенты собирают рабочий продукт за считанные дни — под давлением дедлайнов и меняющихся требований',
  },

  {
    id: 3,
    text: 'Код пишется под задачу бизнеса',
  },

  {
    id: 4,
    text: 'Студент с первого курса сидит в реальной продуктовой команде: пишет микросервисы и API, проходит код-ревью наравне со штатными разработчиками',
  },

  {
    id: 5,
    text: 'Сроки жёсткие, ТЗ меняется на ходу',
  },

  {
    id: 6,
    text: 'Студент с первого курса сидит в реальной продуктовой команде: пишет микросервисы и API, проходит код-ревью наравне со штатными разработчиками',
  },

  {
    id: 7,
    text: 'Готовое решение защищают перед заказчиком',
  },

  {
    id: 8,
    text: 'На хакатонах с индустриальными заказчиками студенты собирают рабочий продукт за считанные дни — под давлением дедлайнов и меняющихся требований',
  },

  {
    id: 9,
    text: 'Ценится не диплом, а продукт и портфолио',
  },

  {
    id: 10,
    text: 'Студент с первого курса сидит в реальной продуктовой команде: пишет микросервисы и API, проходит код-ревью наравне со штатными разработчиками',
  },
]
</script>

<template>
  <section class="student-teaching">
    <div class="container">
      <div class="student-teaching__inner">
        <h2 class="student-teaching__title title-md">{{ props.title }}</h2>

        <div class="student-teaching__content">
          <div class="student-teaching__header">
            <h3 class="student-teaching__header-title">{{ props.leftTitle }}</h3>

            <div class="student-teaching__header-img">
              <img src="@/assets/icons/vs.webp" alt="VS" />
            </div>

            <h3 class="student-teaching__header-title">{{ props.rightTitle }}</h3>
          </div>

          <div class="student-teaching__content-grid">
            <div
              v-for="block in teachingBlocks"
              class="student-teaching__block"
              :class="
                block.id % 2 === 0
                  ? 'student-teaching__block--purple'
                  : 'student-teaching__block--dark'
              "
              :key="block.id"
            >
              <p class="student-teaching__block-description">{{ block.text }}</p>
            </div>
          </div>

          <div class="student-teaching__text">
            <p class="student-teaching__text-description">
              Пока где-то учат абстрактному айти, здесь студент с первого курса
              <span>делает то же, что делают штатные разработчики в компаниях.</span> К выпуску уже
              на руках реальные <span>проекты</span>, живой <span>опыт</span> работы с заказчиком и
              <span>портфолио</span> проектов, которые помогут при устройстве на работу
            </p>
            <div class="student-teaching__text-img">
              <img :src="props.img" alt="Linux" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.student-teaching {
  margin-bottom: $margin-bottom;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }

  &__title {
    max-width: 460px;
    text-align: center;
  }

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-bottom: 40px;
  }

  &__header-title {
    max-width: 225px;
    font-weight: 700;
    font-size: 24px;
    line-height: 22px;
    text-align: center;

    @media (max-width: 529px) {
      font-size: 18px;
    }

    @media (max-width: 389px) {
      font-size: 14px;
    }
  }

  &__header-img {
    max-width: 100px;

    img {
      object-fit: cover;
    }
  }

  &__content-grid {
    display: grid;
    grid-template-columns: minmax(0, 355px) minmax(0, 430px);
    justify-items: center;
    gap: 20px;
    margin-bottom: 100px;

      @media (max-width: 959px) {
        margin-bottom: 30px;
      }

    @media (max-width: 479px) {
      grid-template-columns: 1fr;
    }
  }

  &__block {
    width: fit-content;
    padding: 20px;
    border-radius: 20px;
    margin-bottom: auto;

    @media (max-width: 479px) {
      width: 100%;
    }

    &--dark {
      justify-self: start;
      opacity: 0.8;
      background-color: $color-dark;
    }

    &--purple {
      background-color: $color-purple;
    }
  }

  &__block-description {
    font-size: clamp(14px, 1vw, 16px);
    line-height: 22px;
  }

  &__text {
    max-width: 680px;
    margin: 0 auto;
    position: relative;
  }

  &__text-description {
    font-size: clamp(16px, 1.5vw, 24px);
    line-height: 30px;
    text-align: center;

    span {
      font-weight: 700;
    }
  }

  &__text-img {
    max-width: 270px;
    position: absolute;
    top: -90%;
    right: -35%;

    @media (max-width: 1427px) {
      top: -110%;
    }

    @media (max-width: 1179px) {
      max-width: 200px;
      top: -95%;
      right: -10%;
    }

    @media (max-width: 1163px) {
      top: -120%;
    }

      @media (max-width: 959px) {
        max-width: 300px;
        margin: 0 auto;
        position: static;
      }
  }
}
</style>
