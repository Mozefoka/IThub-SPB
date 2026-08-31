<script setup lang="ts">
import { computed, ref } from 'vue'
import { images } from '@/data/images.ts'

defineOptions({
  name: 'TeacherCases',
})

interface TabImage {
  src: string
  alt: string
}

interface BaseTab {
  id: string
  navLabel: string
  heading: string
  description: string
  images: TabImage[]
}

interface CaseStudyTab extends BaseTab {
  layout: 'case-study'
  teacherLabel: string
  teacherName: string
}

interface BenefitsTab extends BaseTab {
  layout: 'benefits'
  benefitsHeading: string
  benefits: string[]
}

type TeacherCaseTab = CaseStudyTab | BenefitsTab

const tabs: TeacherCaseTab[] = [
  {
    id: 'design-studio',
    layout: 'case-study',
    navLabel: 'Проектная работа с дизайн-студией',
    heading: 'Проектная работа с дизайн-студией',
    teacherLabel: 'Преподаватель:',
    teacherName: 'Дарья Савина',
    description:
      'Преподаватель подключила студентов прямо к рабочим процессам дизайн-студии sueta.team. Ребята сделали реальный коммерческий проект для мебельной студии incastro. Ксения Телейчук собрала веб-дизайн и сгенерировала интерьеры, а Андрей Труфанов заанимировал готовый кейс для публикации на Dprofile',
    images: [
      {
        src: images.work,
        alt: 'Вывеска мебельной студии incastro',
      },
      {
        src: images.work2,
        alt: 'Материалы и логотип incastro',
      },
      {
        src: images.work3,
        alt: 'Фирменный стиль incastro на упаковке',
      },
    ],
  },
  {
    id: 'hackathon',
    layout: 'case-study',
    navLabel: 'Хакатон на «Колледж Фест»',
    heading: 'Хакатон на «Колледж Фест»',
    teacherLabel: 'Преподаватель:',
    teacherName: 'Дарья Савина',
    description:
      'Три дня дедлайнов и полного погружения в геймдев. На хакатоне «Колледж Фест» студентки-дизайнеры с нуля собрали концепцию игры. Дарья Бакушина, Вероника Змовик и Евгения Плецер прописали сценарий, продумали игровые механики, отрисовали визуал и забрали сразу 1-е и 2-е места',
    images: [
      {
        src: images.dynasty,
        alt: 'Концепт-арт сюжета игры',
      },
      {
        src: images.dynasty,
        alt: 'Персонажи игры',
      },
      {
        src: images.dynasty,
        alt: 'Локация штаба династии',
      },
    ],
  },
  {
    id: 'excursion',
    layout: 'case-study',
    navLabel: 'Экскурсия на производство',
    heading: 'Экскурсия на производство «Быстрый цвет»',
    teacherLabel: 'Преподаватель:',
    teacherName: 'Ева Янковская',
    description:
      'Одно дело — нарисовать красивую упаковку на экране, другое — понять, как она будет выглядеть в жизни. Чтобы показать студентам реальное производство, преподаватель организовала выезд в типографию «Быстрый цвет». Ребята своими глазами увидели работу печатников, процесс ламинации и вырубки, а главное — разобрали десятки образцов готовой упаковки',
    images: [
      {
        src: images.work2,
        alt: 'Цех типографии «Быстрый цвет»',
      },
      {
        src: images.work,
        alt: 'Студенты у печатного станка',
      },
      {
        src: images.work3,
        alt: 'Образцы готовой упаковки',
      },
    ],
  },
  {
    id: 'creaton',
    layout: 'benefits',
    navLabel: 'Креатон с сообществом «Розетка»',
    heading: 'Креатон с сообществом «Розетка»',
    description:
      'Целая неделя работы в режиме настоящего креативного агентства. На креатоне студенты получили реальный бриф от сообщества «Розетка» и разработали для них фирменный стиль. Команды подбирали шрифты, собирали палитры, верстали носители, а в финале защищали свои концепции перед экспертным жюри и самим заказчиком',
    benefitsHeading: 'В чём польза для студентов?',
    benefits: [
      'Опыт работы по правилам дизайн-агентства: реальный заказчик, сжатые сроки и защита презентации',
      'Шанс выпустить реальный продукт: дизайн команды победителей пошел в производство фирменного мерча',
    ],
    images: [
      {
        src: images.outlet,
        alt: 'Работа команды над макетами для «Розетки»',
      },
    ],
  },
]

const firstTab = tabs[0]

if (!firstTab) {
  throw new Error('TeacherCases: tabs must not be empty')
}

const activeTabId = ref(firstTab.id)

const activeTab = computed<TeacherCaseTab>(() => {
  return tabs.find((tab) => tab.id === activeTabId.value) ?? firstTab
})

const isCaseStudyTab = (tab: TeacherCaseTab): tab is CaseStudyTab => tab.layout === 'case-study'

const isBenefitsTab = (tab: TeacherCaseTab): tab is BenefitsTab => tab.layout === 'benefits'

const selectTab = (id: string): void => {
  activeTabId.value = id
}
</script>

<template>
  <section class="teacher-cases">
    <div class="teacher-cases__inner">
      <h2 class="teacher-cases__title title-md">Подход наших преподавателей</h2>

      <div class="teacher-cases__tabs" role="tablist" aria-label="Подход наших преподавателей">
        <button
          v-for="tab in tabs"
          :id="`teacher-cases-tab-${tab.id}`"
          :key="tab.id"
          type="button"
          role="tab"
          class="teacher-cases__tab"
          :class="{ 'teacher-cases__tab--active': tab.id === activeTab.id }"
          :aria-selected="tab.id === activeTab.id"
          :aria-controls="`teacher-cases-panel-${tab.id}`"
          @click="selectTab(tab.id)"
        >
          {{ tab.navLabel }}
        </button>
      </div>

      <hr class="teacher-cases__divider" />

      <Transition name="teacher-cases-fade" mode="out-in">
        <div
          :id="`teacher-cases-panel-${activeTab.id}`"
          :key="activeTab.id"
          class="teacher-cases__panel"
          role="tabpanel"
          :aria-labelledby="`teacher-cases-tab-${activeTab.id}`"
        >
          <template v-if="isCaseStudyTab(activeTab)">
            <div class="teacher-cases__content teacher-cases__content--case-study">
              <div class="teacher-cases__info">
                <h3 class="teacher-cases__heading">
                  {{ activeTab.heading }}
                </h3>

                <div class="teacher-cases__teacher">
                  <span class="teacher-cases__teacher-label">
                    {{ activeTab.teacherLabel }}
                  </span>

                  <span class="teacher-cases__teacher-name">
                    {{ activeTab.teacherName }}
                  </span>
                </div>
              </div>

              <p class="teacher-cases__description">
                {{ activeTab.description }}
              </p>
            </div>

            <div class="teacher-cases__gallery">
              <div
                v-for="image in activeTab.images"
                :key="image.src"
                class="teacher-cases__gallery-item"
              >
                <img
                  class="teacher-cases__image"
                  :src="image.src"
                  :alt="image.alt"
                  loading="lazy"
                />
              </div>
            </div>
          </template>

          <template v-else-if="isBenefitsTab(activeTab)">
            <div class="teacher-cases__content teacher-cases__content--benefits">
              <div class="teacher-cases__info">
                <h3 class="teacher-cases__heading">
                  {{ activeTab.heading }}
                </h3>

                <p class="teacher-cases__description">
                  {{ activeTab.description }}
                </p>
              </div>

              <div class="teacher-cases__benefits">
                <h3 class="teacher-cases__heading">
                  {{ activeTab.benefitsHeading }}
                </h3>

                <ul class="teacher-cases__benefits-list">
                  <li
                    v-for="benefit in activeTab.benefits"
                    :key="benefit"
                    class="teacher-cases__benefit"
                  >
                    {{ benefit }}
                  </li>
                </ul>
              </div>

              <div class="teacher-cases__polaroids">
                <div
                  v-for="image in activeTab.images"
                  :key="image.src"
                  class="teacher-cases__polaroid"
                >
                  <img
                    class="teacher-cases__image"
                    :src="image.src"
                    :alt="image.alt"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.teacher-cases {
  @include zoom;

  margin-bottom: $margin-bottom;
  padding: 0 20px;

  &__title {
    max-width: 400px;
    margin: 0 0 30px;
  }

  &__tabs {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-between;
    column-gap: 15px;
    margin-bottom: 50px;

    @media (max-width: 959px) {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 30px;
    }

    @media (max-width: 639px) {
      grid-template-columns: 1fr;
    }

    @media (max-width: 479px) {
      justify-items: start;
    }
  }

  &__tab {
    background: transparent;
    appearance: none;
    color: $color-gray;
    text-align: center;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: rgba($color-white, 0.8);
    }

    &--active {
      color: $color-white;

      &:hover {
        color: rgba($color-white, 1);
      }
    }
  }

  &__divider {
    height: 1px;
    margin: 0 0 10px;
    background-color: $color-white;
  }

  &__content {
    display: grid;
    align-items: center;
    gap: 40px;
    margin-bottom: 30px;

    &--case-study {
      grid-template-columns: minmax(0, 280px) 1fr;
      justify-content: space-between;

      @media (max-width: 639px) {
        grid-template-columns: minmax(0, 200px) 1fr;
        gap: 10px;
      }

      @media (max-width: 479px) {
        grid-template-columns: 1fr;
      }
    }

    &--benefits {
      grid-template-columns: repeat(3, 1fr);
      align-items: flex-start;

      @media (max-width: 1199px) {
        grid-template-columns: 1fr 1fr;
      }

      @media (max-width: 479px) {
        grid-template-columns: 1fr;
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__heading {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.3;

    @media (max-width: 639px) {
      font-size: 15px;
    }
  }

  &__teacher {
    display: flex;
    flex-direction: column;
    gap: 5px;
    line-height: 1.4;
  }

  &__teacher-label {
    color: $color-gray;

    @media (max-width: 639px) {
      font-size: 13px;
    }
  }

  &__teacher-name {
    font-weight: 700;
    font-size: 18px;

    @media (max-width: 639px) {
      font-size: 15px;
    }
  }

  &__description {
    max-width: 360px;
    justify-self: center;
    line-height: 1.6;

    @media (max-width: 639px) {
      font-size: 12px;
    }

    @media (max-width: 479px) {
      max-width: 100%;
    }
  }

  &__benefits {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__benefits-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__benefit {
    font-size: 16px;
    line-height: 1.6;
  }

  &__gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    overflow-x: auto;
  }

  &__gallery-item {
    aspect-ratio: 3 / 2;
    overflow: hidden;
    background-color: rgba($color-white, 0.05);

    @media (max-width: 959px) {
      width: 300px;
    }
  }

  &__polaroids {
    @media (max-width: 1199px) {
      grid-column: 1 / 3;

      img {
        max-height: 300px;
      }
    }

    @media (max-width: 479px) {
      grid-column: auto;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.teacher-cases-fade-enter-active,
.teacher-cases-fade-leave-active {
  transition: opacity 0.2s ease;
}

.teacher-cases-fade-enter-from,
.teacher-cases-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .teacher-cases-fade-enter-active,
  .teacher-cases-fade-leave-active {
    transition: none;
  }
}
</style>
