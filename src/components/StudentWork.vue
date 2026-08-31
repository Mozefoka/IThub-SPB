<script setup lang="ts">

interface StudenWorkItem {
  id: number
  workTitle: string
  button?: boolean
  description: string
  images: string[]
  ps?: string
}

interface Props {
  title: string
}

const props = defineProps<Props>()

const works: StudenWorkItem[] = [
  {
    id: 1,
    workTitle: 'Incastro',
    description:
      'Наши студенты разработали дизайн сайта, сгенерировали стильные интерьеры и создали динамичную анимацию для Dprofile',
    images: ['src/assets/images/work.jpg', 'src/assets/images/work2.jpg'],
    ps: 'P. S. Работа получилась настолько крутой, что ребятам сразу предложили постоянное сотрудничество в дизайн-студии sueta. team',
  },

  {
    id: 2,
    workTitle: 'Oy gallery',
    button: true,
    description:
      'Брендинг для арт-галереи от нашей студентки. Она создала визуальную концепцию, логотип и анимации, а также продумала мерч',
    images: ['src/assets/images/work3.jpg', 'src/assets/images/work4.jpg'],
  },

  {
    id: 3,
    workTitle: 'Авторская модель куклы',
    description:
      'Авторская шарнирная кукла от нашей студентки. Лина Мудрова смоделировала сложный персонаж в Blender, подготовила его к 3D-печати, а затем вручную собрала, раскрасила и откастомизировала готовый физический арт-объект',
    images: ['src/assets/images/work5.jpg', 'src/assets/images/work.jpg'],
  },
]
</script>

<template>
  <section class="student-work">
    <h2 class="student-work__title title-md">
      {{ props.title }}
    </h2>

    <div class="student-work__inner">
      <article
        v-for="work in works"
        :key="work.id"
        class="student-work__content"
        :style="{ zIndex: works.length + 1 }"
      >
        <div class="student-work__info">
          <div class="student-work__heading-group">
            <h3 class="student-work__heading">
              {{ work.workTitle }}
            </h3>

            <a
              href="https://dprofile.ru/case/162365/joy-gallery-branding"
              v-if="work.button"
              class="student-work__button"
              target="_blank"
            >
              Подробнее
            </a>
          </div>

          <p class="student-work__description">
            {{ work.description }}
          </p>

          <p v-if="work.ps" class="student-work__ps student-work__ps--display">
            {{ work.ps }}
          </p>
        </div>

        <div class="student-work__gallery" :class="{ 'student-work__gallery--split': work.ps }">
          <div
            v-for="(image, index) in work.images"
            :key="index"
            class="student-work__gallery-item"
          >
            <img
              class="student-work__image"
              :src="image"
              :alt="`${work.workTitle} — изображение ${index + 1}`"
            />
          </div>

          <p v-if="work.ps" class="student-work__ps">
            {{ work.ps }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.student-work {
  @include zoom;

  padding: 0 20px;

  &__title {
    max-width: 485px;
    position: sticky;
    top: 50px;
    z-index: 4;
    margin: 0 0 30px;
  }

  &__content {
    display: grid;
    grid-template-columns: minmax(260px, 400px) 1fr;
    align-items: stretch;
    column-gap: 40px;
    row-gap: 40px;
    position: sticky;
    top: 150px;
    padding-top: 10px;
    padding-bottom: 100px;
    border-top: 1px solid;
    background-color: $color-black;

    @media (max-width: 1199px) {
      column-gap: 10px;
    }

    @media (max-width: 959px) {
      grid-template-columns: 1fr;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
  }

  &__heading-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__heading {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.3;

    @media (max-width: 639px) {
      font-size: 18px;
    }
  }

  &__button {
    max-width: 150px;
    width: 100%;
    padding: 10px;
    border-radius: 30px;
    font-weight: 700;
    text-align: center;
    color: $color-white;
    background-color: $color-purple;
  }

  &__description {
    max-width: 360px;
    line-height: 1.6;

    @media (max-width: 959px) {
      max-width: 545px;
    }

    @media (max-width: 479px) {
      max-width: 100%;
    }
  }

  &__gallery {
    height: 300px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    overflow-x: auto;

    @media (max-width: 1299px) {
      height: 200px;
    }

    @media (max-width: 1199px) {
      gap: 10px;
    }

    @media (max-width: 959px) {
      height: 300px;
    }

    &--split {
      grid-template-areas:
        'main second'
        'main ps';

      @media (max-width: 1199px) {
        height: 200px;
        grid-template-areas: 'main second';
      }

      .student-work__gallery-item {
        &:first-child {
          grid-area: main;
        }

        &:last-child {
          grid-area: second;
        }
      }

      .student-work__ps {
        grid-area: ps;
        align-self: end;
        line-height: 1.5;
        font-size: 14px;

        @media (max-width: 1299px) {
          line-height: 1.2;
          font-size: 11px;
        }
      }
    }
  }

  &__gallery-item {
    overflow: hidden;

    @media (max-width: 959px) {
      min-width: 300px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__ps {
    grid-column: 2;
    line-height: 1.5;
    font-size: 14px;

    @media (max-width: 1199px) {
      display: none;
    }

    &--display {
      display: none;

      @media (max-width: 1199px) {
        display: block;
      }

      @media (max-width: 959px) {
        max-width: 545px;
      }
    }
  }
}
</style>
