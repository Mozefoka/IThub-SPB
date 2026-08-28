<script setup lang="ts">
// computed — производные значения, пересчитываются сами при смене зависимостей.
// onMounted/onBeforeUnmount — подписка и отписка от событий окна.
// ref — реактивная ячейка: меняем .value, Vue перерисовывает шаблон.
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

// Форма одной истории. Тип объявлен локально — в проекте так во всех секциях.
interface SuccessStory {
  id: number
  title: string // крупный заголовок над карточкой, живёт отдельным слоем
  photo: string
  studentName: string
  studentCourse: string
  badgeIcon?: string // необязательный: у третьей истории иконки нет
  badgeText: string
  description: string[] // массив, каждый элемент — отдельный абзац
}

// Контента из API нет, весь текст лежит здесь. Добавить историю = дописать объект:
// вся раскадровка ниже считается от stories.length и подстроится сама.
const stories: SuccessStory[] = [
  {
    id: 1,
    title: 'Трудоустроился на 2 курсе',
    photo: '/src/assets/images/roman.webp',
    studentName: 'Никита Барановский',
    studentCourse: 'Студент ITHub СПБ, 2 курс',
    badgeIcon: '/src/assets/icons/success-stories-icon.svg',
    badgeText: 'Траектория быстрого роста в ITHub',
    description: [
      'Уже на втором курсе Никита стал ведущим маркетологом в Union. Возглавил команду из четырех специалистов!',
      'Во время учебы он решал реальные задачи, участвовал в коммерческих проектах и прокачивался на бизнес-играх в ITHUB',
    ],
  },

  {
    id: 2,
    title: 'Стала призёром международного конкурса',
    photo: '/src/assets/images/roman.webp',
    studentName: 'Анастасия Акчурина',
    studentCourse: 'Студентка ITHub СПБ, 2 курс',
    badgeIcon: '/src/assets/icons/success-stories-icon.svg',
    badgeText: 'В ITHub теория мгновенно переходит в практику',
    description: [
      'Настя заняла 3-е место на международном конкурсе рекламы «Золотой колос». С проектом, который родился на бизнес-игре в IThub — там она вместе с командой прошла путь от идеи продукта до готовой стратегии продвижения',
    ],
  },

  {
    id: 3,
    title: 'Трудоустроился на 2 курсе',
    photo: '/src/assets/images/roman.webp',
    studentName: 'Никита Барановский',
    studentCourse: 'Студент ITHub СПБ, 2 курс',
    badgeText: 'Преподаватели ITHub дают студентам возможность работать с реальными бюджетами',
    description: [
      'Уже на втором курсе Никита стал ведущим маркетологом в Union. Возглавил команду из четырех специалистов!',
      'Во время учебы он решал реальные задачи, участвовал в коммерческих проектах и прокачивался на бизнес-играх в ITHUB',
    ],
  },
]

/**
 * КАК ЭТО РАБОТАЕТ ЦЕЛИКОМ
 *
 * Это не библиотечный слайдер — механика повторяет секцию «Истории успеха»
 * на spb.ithub.ru/cases_marketing.
 *
 * 1. Секция сделана НАМЕРЕННО высокой: экран + pinLength. Внутри неё лежит
 *    «сцена» высотой ровно в экран с `position: sticky`. Пока страница проезжает
 *    лишние pinLength пикселей, сцена стоит на месте — это и есть «закрепление».
 *
 * 2. Все карточки лежат на одном большом круге («колесе») радиусом WHEEL_RADIUS.
 *    Каждая сидит на верхней кромке круга, но её «спица» заранее повёрнута на
 *    свой угол: 0°, 55°, 110°. Видна только та, чья спица сейчас смотрит вверх.
 *
 * 3. Скролл внутри закрепления крутит колесо против часовой: −55° приводит наверх
 *    вторую карточку, −110° третью. Между поворотами колесо стоит — это пауза,
 *    чтобы карточку успели прочитать.
 *
 * 4. Заголовки на колесе НЕ лежат — иначе они крутились бы вместе с ним. Это
 *    отдельный неподвижный слой, где заголовки кросс-фейдятся.
 *
 * Ниже все длины — в пикселях СКРОЛЛА (сколько нужно прокрутить), углы — в градусах.
 * Числа не выдуманы: сняты с референса из его data-атрибутов анимации.
 */

/** Угол между соседними карточками на окружности — и он же шаг одного поворота. */
const STEP_DEG = 55

/** Сколько пикселей скролла уходит на один поворот колеса. */
const TRAVEL = 575

/** Пауза: столько пикселей колесо стоит с карточкой в верхней точке. */
const HOLD = 250

/** Хвост после последней карточки, чтобы закрепление не отпускало резко. */
const TAIL = 100

/** За сколько пикселей до своей остановки заголовок успевает проявиться. */
const TITLE_IN = 150

/** Сколько заголовок держится непрозрачным после остановки. */
const TITLE_HOLD = 200

/** За сколько пикселей заголовок гаснет, пока колесо едет к следующей карточке. */
const TITLE_OUT = 300

/** На столько пикселей заголовок опущен, пока ещё не проявился (всплывает снизу). */
const TITLE_SHIFT = 75

/** На столько пикселей заголовок уплывает вверх, когда гаснет. */
const TITLE_DRIFT = 80

/** Радиус колеса в дизайн-единицах. Он же — расстояние от центра круга до верха карточки. */
const WHEEL_RADIUS = 1000

/** Индекс последней истории. Пригодится и для формул, и для проверки «эта карточка последняя?». */
const lastIndex = stories.length - 1

/**
 * Сколько скролла секция держится закреплённой.
 *
 * Поворотов на один меньше, чем карточек (первая уже наверху при старте),
 * а пауз на один меньше, чем поворотов (после последнего поворота идёт TAIL).
 * Для трёх историй: 2*575 + 1*250 + 100 = 1500 — ровно как на референсе.
 */
const pinLength = lastIndex * TRAVEL + Math.max(lastIndex - 1, 0) * HOLD + TAIL

/**
 * На какой позиции скролла карточка `index` стоит ровно в верхней точке колеса.
 *
 * До неё прошло `index` поворотов и `index - 1` пауз. Math.max нужен для нулевой
 * карточки: без него получилось бы -250, и первый заголовок повёл бы себя неверно.
 */
const uprightAt = (index: number) => index * TRAVEL + Math.max(index - 1, 0) * HOLD

/** Ссылка на корневой <section>. Через неё узнаём, где секция относительно экрана. */
const root = ref<HTMLElement | null>(null)

/** Сколько пикселей уже проехали ВНУТРИ закрепления: от 0 до pinLength. Двигатель всей анимации. */
const scrolled = ref(0)

/** id запрошенного кадра. 0 = кадр не запрошен. Нужен, чтобы не считать по сто раз за кадр. */
let frame = 0

/** Измеряет позицию скролла. Вызывается только внутри requestAnimationFrame. */
const measure = () => {
  // Кадр отработал — снимаем флаг, чтобы следующий scroll снова смог запросить кадр.
  frame = 0

  const element = root.value
  if (!element) return // компонент мог размонтироваться между запросом кадра и его выполнением

  // getBoundingClientRect().top — расстояние от верха экрана до верха секции.
  // Пока секция ниже — оно положительное, значит -top отрицательный, обрезаем нулём.
  // Когда секция уехала вверх — -top растёт, это и есть прогресс закрепления.
  // Сверху обрезаем pinLength, дальше колесо уже не крутится.
  scrolled.value = Math.min(Math.max(-element.getBoundingClientRect().top, 0), pinLength)
}

/**
 * Обработчик скролла. Сам ничего не считает — только просит кадр.
 * Событий scroll прилетают сотни в секунду, а перерисовка всё равно раз в кадр,
 * поэтому лишние вычисления бессмысленны. Это классический rAF-троттлинг.
 */
const onScroll = () => {
  if (frame) return // кадр уже запрошен, второй раз не надо
  frame = requestAnimationFrame(measure)
}

onMounted(() => {
  // Считаем сразу: страницу могли открыть по якорю или перезагрузить в середине секции.
  measure()
  // passive: true — обещаем не звать preventDefault, браузер не тормозит прокрутку.
  window.addEventListener('scroll', onScroll, { passive: true })
  // resize важен: от высоты экрана зависит и высота секции, и момент закрепления.
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  // Отменяем незавершённый кадр, иначе measure дёрнется у мёртвого компонента.
  if (frame) cancelAnimationFrame(frame)
  // Без снятия слушателей они останутся висеть на window — утечка памяти.
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})

/**
 * Угол колеса по текущей позиции скролла.
 *
 * Идём по «отрезкам» раскадровки и тратим на них пройденный скролл:
 * поворот на STEP_DEG за TRAVEL пикселей, затем пауза HOLD пикселей, и так далее.
 * Внутри поворота угол интерполируется линейно — за счёт этого движение плавное,
 * а не скачками по карточкам.
 */
const rotation = computed(() => {
  let left = scrolled.value // сколько скролла ещё не распределено
  let degrees = 0 // накопленный угол

  for (let index = 1; index <= lastIndex; index++) {
    // На этот поворот уходит либо весь TRAVEL, либо остаток скролла, если он меньше.
    const travelled = Math.min(left, TRAVEL)
    // Доля пройденного поворота × шаг. Минус — потому что крутим против часовой.
    degrees -= (travelled / TRAVEL) * STEP_DEG
    left -= travelled

    if (left <= 0) break // скролл кончился посреди поворота
    left -= Math.min(left, HOLD) // пауза: угол не меняется, скролл тратится
    if (left <= 0) break // скролл кончился на паузе
  }

  return degrees
})

/** Инлайновый стиль колеса. Один поворот — и все карточки на нём едут вместе. */
const wheelStyle = computed(() => ({ transform: `rotate(${rotation.value}deg)` }))

/**
 * Стиль спицы: карточка `index` заранее повёрнута на index * 55°.
 * Значение постоянное, от скролла не зависит, поэтому обычная функция, а не computed.
 * Когда колесо повернётся на −index*55°, эта спица окажется ровно вертикально.
 */
const spokeStyle = (index: number) => ({ transform: `rotate(${index * STEP_DEG}deg)` })

/**
 * Прозрачность и сдвиг заголовка — четыре фазы вдоль позиции скролла:
 *
 *   ... at-150 ──проявление──> at ──держится──> at+200 ──гаснет──> at+500 ...
 *
 * где at — момент, когда карточка встаёт наверх (uprightAt).
 */
const headlineStyle = (index: number) => {
  const progress = scrolled.value
  const at = uprightAt(index)

  let opacity = 0
  let shift = TITLE_SHIFT

  if (progress < at - TITLE_IN) {
    // Ещё рано: заголовок скрыт и опущен вниз на TITLE_SHIFT.
    opacity = 0
  } else if (progress < at) {
    // Проявление. t идёт от 0 до 1 на отрезке длиной TITLE_IN.
    const t = (progress - (at - TITLE_IN)) / TITLE_IN
    opacity = t
    shift = TITLE_SHIFT * (1 - t) // всплывает снизу к нулю
  } else if (progress < at + TITLE_HOLD || index === lastIndex) {
    // Карточка наверху — заголовок на месте и непрозрачный.
    // Второе условие страхует последний заголовок, чтобы он не начал гаснуть в конце секции.
    opacity = 1
    shift = 0
  } else {
    // Гаснет и уплывает вверх, пока колесо едет к следующей карточке.
    const t = Math.min((progress - at - TITLE_HOLD) / TITLE_OUT, 1)
    opacity = 1 - t
    shift = -TITLE_DRIFT * t
  }

  return { opacity, transform: `translateY(${shift}px)` }
}
</script>

<template>
  <!--
    Корневая секция. Её высота = экран + pinLength, поэтому под ней есть «запас»
    скролла, во время которого сцена внутри стоит закреплённой.
    ref="root" связывает элемент с одноимённым ref в script.
    Через :style пробрасываем в CSS числа, посчитанные в JS.
  -->
  <section
    ref="root"
    class="success-stories"
    :style="{ '--pin-length': `${pinLength}px`, '--wheel-radius': `${WHEEL_RADIUS}px` }"
  >
    <!-- Сцена: ровно один экран, sticky. Всё видимое лежит внутри неё. -->
    <div class="success-stories__stage">
      <!-- Надзаголовок секции, не меняется от скролла. -->
      <h2 class="success-stories__title title-s">Истории успеха</h2>

      <!--
        Слой заголовков. Все три отрисованы всегда, видимость решает opacity —
        так их можно плавно перекрещивать между собой.
        aria-hidden: для скринридеров это дубль, настоящий <h3> лежит в карточке.
      -->
      <div class="success-stories__headlines" aria-hidden="true">
        <p
          v-for="(story, index) in stories"
          :key="story.id"
          class="success-stories__headline title-md"
          :style="headlineStyle(index)"
        >
          {{ story.title }}
        </p>
      </div>

      <!-- Звезда неподвижна и лежит под колесом: она фон для той карточки, что наверху. -->
      <img class="success-stories__star" src="@/assets/icons/long-star.svg" alt="" />

      <!-- Колесо. Единственный вращаемый элемент — крутится оно, карточки едут пассажирами. -->
      <div class="success-stories__wheel" :style="wheelStyle">
        <!-- Спица: квадрат размером с колесо, повёрнутый на свой угол вокруг центра. -->
        <div
          v-for="(story, index) in stories"
          :key="story.id"
          class="success-stories__spoke"
          :style="spokeStyle(index)"
        >
          <!-- Карточка приклеена к ВЕРХНЕЙ кромке спицы — то есть к ободу колеса. -->
          <article class="success-stories__card">
            <!-- Настоящий заголовок для доступности: визуально скрыт, виден только в reduced-motion. -->
            <h3 class="success-stories__card-title title-md">{{ story.title }}</h3>

            <div class="success-stories__card-photo">
              <img :src="story.photo" alt="Студент" />
            </div>

            <!-- Тёмная панель. Она заезжает на фото снизу — отсюда отрицательный top в стилях. -->
            <div class="success-stories__card-panel">
              <p class="success-stories__card-panel-name">
                {{ story.studentName }}
              </p>

              <p class="success-stories__card-panel-course">
                {{ story.studentCourse }}
              </p>

              <div class="success-stories__card-panel-badge">
                <BaseBadge :img="story.badgeIcon" :border="'secondary'">
                  {{ story.badgeText }}
                </BaseBadge>
              </div>

              <div class="success-stories__card-panel-description">
                <p v-for="(paragraph, i) in story.description" :key="i">
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!--
        Шторки идут ПОСЛЕ колеса в разметке и имеют z-index выше — значит рисуются
        поверх него и гасят карточки, уезжающие вбок. Без них соседние карточки
        торчали бы по краям экрана в полную яркость.
      -->
      <div class="success-stories__fade success-stories__fade--left"></div>
      <div class="success-stories__fade success-stories__fade--right"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

/**
 * Секция живёт в том же зуме, что и соседние (миксин adaptive-zoom), — на референсе
 * карусель тоже не крупнее остальной страницы. Готовый миксин здесь не подходит:
 * `zoom` умножает всё внутри, включая `100vh`, и сцена стала бы выше экрана.
 * Поэтому зум навешен на саму сцену, а её высота поделена на него —
 * в отрисовке снова получается ровно экран.
 *
 * Всё внутри сцены — в дизайн-единицах, как в остальных секциях проекта.
 */
.success-stories {
  /**
   * Зум — минимум из двух ограничений:
   *   по ширине  — тот же, что adaptive-zoom даёт соседним секциям;
   *   по высоте  — сколько влезает в экран, ведь секция закреплена и карточка
   *                с заголовком обязана уместиться целиком.
   * Полный зум сайта (1.6) работает начиная примерно с 970px высоты экрана.
   */
  --zoom-width: 1.6;
  --zoom-height: 1.6;
  --zoom: min(var(--zoom-width), var(--zoom-height));

  /* Отступ от верха сцены до верхней кромки карточки. В нём живёт слой заголовков. */
  --card-top: 142px;

  /* Ширина незатемнённого окна по центру; шторки делят между собой всё остальное. */
  --fade-window: 360px;

  position: relative;
  /* Экран + запас на закрепление. Именно этот запас скролла крутит колесо. */
  height: calc(100vh + var(--pin-length));
  margin-bottom: $margin-bottom;

  /* Брейкпоинты по ширине повторяют набор из adaptive-zoom. */
  @media (max-width: 1150px) {
    --zoom-width: 1.4;
  }

  @media (max-width: 959px) {
    --zoom-width: 1.2;
  }

  @media (max-width: 639px) {
    --zoom-width: 1.2;
    --card-top: 150px; /* заголовок переносится на больше строк — нужно больше места */
  }

  @media (max-width: 500px) {
    --zoom-width: 1.15;
    --card-top: 160px;
    --fade-window: 300px; /* окно сужаем под более узкую панель карточки */
  }

  /* Ограничения по высоте. Каждая ступень подобрана так, чтобы карточка не срезалась. */
  @media (max-height: 969px) {
    --zoom-height: 1.45;
  }

  @media (max-height: 879px) {
    --zoom-height: 1.3;
  }

  @media (max-height: 789px) {
    --zoom-height: 1.15;
  }

  @media (max-height: 699px) {
    --zoom-height: 1;
  }

  @media (max-height: 614px) {
    --zoom-height: 0.9;
  }

  /**
   * Сцена — то самое закрепление.
   * sticky + top: 0 держит её у верха экрана, пока родитель проезжает мимо.
   * Важно: overflow: hidden стоит на САМОЙ sticky-сцене, а не на родителе —
   * overflow у предка сломал бы sticky, сделав его собственным контейнером прокрутки.
   */
  &__stage {
    zoom: var(--zoom);
    position: sticky;
    top: 0;
    /* Делим на зум, чтобы после умножения на него получился ровно экран. */
    height: calc(100vh / var(--zoom));
    overflow: hidden; /* обрезает колесо шириной 2000px, иначе появился бы горизонтальный скролл */
    background: radial-gradient(
      circle at 50% 35%,
      rgba($color-purple, 0.6) 0%,
      rgba($color-purple, 0.25) 40%,
      transparent 55%
    );
  }

  &__title {
    position: relative;
    z-index: 3; /* поверх шторок (2), иначе края надзаголовка притемнялись бы */
    padding-top: 20px;
    text-align: center;
  }

  /* Зона заголовков — ровно та полоса, что над карточкой. */
  &__headlines {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: var(--card-top);
    pointer-events: none; /* слой лежит поверх, но не должен перехватывать клики */
  }

  /* Прижат к низу зоны (inset: auto 0 0), поэтому многострочный заголовок растёт ВВЕРХ, а не на карточку. */
  &__headline {
    position: absolute;
    inset: auto 0 0;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 15px 10px;
    text-align: center;
    will-change: opacity, transform; /* подсказка браузеру: эти свойства меняются каждый кадр */
  }

  /**
   * Колесо: квадрат со стороной 2 * радиус.
   * left: 50% ставит его ЛЕВЫЙ край в центр экрана, отрицательный margin-left
   * сдвигает обратно на радиус — так по центру экрана оказывается центр круга.
   * То же по вертикали: top отсчитывает центр, margin-top его компенсирует.
   * Благодаря этому rotate() крутит колесо вокруг собственного центра.
   */
  &__wheel {
    position: absolute;
    top: calc(var(--card-top) + var(--wheel-radius));
    left: 50%;
    width: calc(var(--wheel-radius) * 2);
    height: calc(var(--wheel-radius) * 2);
    margin-top: calc(var(--wheel-radius) * -1);
    margin-left: calc(var(--wheel-radius) * -1);
    will-change: transform;
  }

  /**
   * Звезда с колесом НЕ крутится: как и на референсе, она приколота к сцене
   * и стоит за той карточкой, которая сейчас наверху. Размер — натуральный для svg.
   */
  &__star {
    position: absolute;
    top: calc(var(--card-top) + 210px);
    left: 50%;
    width: 632px;
    height: 215px;
    transform: translate(-50%, -50%); /* центрируем по своей же середине */
  }

  /**
   * Шторки по краям. На референсе это два png-градиента 420x696 при сетке 1200 —
   * то есть чистое окно по центру 360 единиц. Профиль альфы снят с тех картинок:
   * чёрный держится плотным до 45% ширины шторки и дальше плавно уходит в ноль.
   *
   * Ширина считается от окна, а не в процентах: на телефоне проценты съели бы
   * карточку, потому что сцена там узкая. max(0px, ...) страхует от отрицательной
   * ширины, если окно окажется шире сцены.
   */
  &__fade {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 2; /* выше колеса, ниже заголовков */
    width: max(0px, (100% - var(--fade-window)) / 2);
    pointer-events: none;
  }

  &__fade--left {
    left: 0;
    background: linear-gradient(
      to right,
      $color-black 45%,
      rgba($color-black, 0.94) 50%,
      rgba($color-black, 0.81) 60%,
      rgba($color-black, 0.61) 70%,
      rgba($color-black, 0.33) 80%,
      rgba($color-black, 0.03) 90%,
      rgba($color-black, 0) 100%
    );
  }

  /* Тот же градиент, только развёрнут: to left вместо to right. */
  &__fade--right {
    right: 0;
    background: linear-gradient(
      to left,
      $color-black 45%,
      rgba($color-black, 0.94) 50%,
      rgba($color-black, 0.81) 60%,
      rgba($color-black, 0.61) 70%,
      rgba($color-black, 0.33) 80%,
      rgba($color-black, 0.03) 90%,
      rgba($color-black, 0) 100%
    );
  }

  /**
   * Спица — тот же квадрат, что и колесо (inset: 0 растягивает его по родителю).
   * Её центр совпадает с центром колеса, поэтому rotate() крутит её вокруг
   * той же точки. Карточка сидит на верхней кромке — это и есть обод.
   */
  &__spoke {
    position: absolute;
    inset: 0;
  }

  &__card {
    position: absolute;
    z-index: 1; /* поверх звезды внутри своей спицы */
    top: 0; /* верх спицы = верхняя точка окружности */
    left: 50%;
    width: 460px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateX(-50%); /* центрируем относительно вертикальной оси колеса */
  }

  /* Видимый заголовок живёт в слое __headlines, здесь он остаётся только для скринридеров. */
  &__card-title {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  /* Высота задана жёстко, как на референсе: иначе портретное фото распирает карточку по вертикали. */
  &__card-photo {
    max-width: 300px;
    width: 100%;
    height: 300px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover; /* заполнить квадрат, лишнее обрезать */
      object-position: center top; /* обрезаем снизу, чтобы голова осталась в кадре */
    }
  }

  &__card-panel {
    max-width: 400px;
    position: relative;
    top: -80px; /* заезжает на нижнюю часть фото */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    border-radius: 15px;
    background-color: $color-dark;
    text-align: center;

    /* На телефоне панель шириной 400 не влезает в экран даже при минимальном зуме. */
    @media (max-width: 500px) {
      max-width: 290px;
    }
  }

  &__card-panel-name {
    font-weight: 700;
    font-size: clamp(14px, 1.5vw, 18px);
  }

  &__card-panel-course {
    font-size: clamp(12px, 1vw, 14px);
    color: $color-gray;
    margin-bottom: 20px;
  }

  /* Бейдж вынесен за правый край панели и наклонён — отсюда отрицательный right. */
  &__card-panel-badge {
    max-width: 180px;
    position: absolute;
    top: -40px;
    right: -65px;
    transform: rotate(15deg);
    z-index: 2;

    /* На узких экранах вынос вправо не помещается в сцену и бейдж срезало. */
    @media (max-width: 500px) {
      right: -10px;
    }
  }

  &__card-panel-description {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: clamp(12px, 1vw, 14px);
    line-height: 1.15;
  }
}

/**
 * Кручение колеса вместе с перехватом скролла — вестибулярный триггер: у части
 * людей от такого укачивает. Если в системе включено «уменьшить движение»,
 * разбираем всю конструкцию и показываем обычный столбик карточек.
 */
@media (prefers-reduced-motion: reduce) {
  .success-stories {
    height: auto; /* запас скролла больше не нужен */

    &__stage {
      position: static; /* снимаем закрепление */
      height: auto;
      padding-bottom: 60px;
      overflow: visible;
    }

    /* Декорации и дублирующий слой заголовков в статичной раскладке только мешают. */
    &__headlines,
    &__star,
    &__fade {
      display: none;
    }

    /* Колесо превращается в обычную колонку. */
    &__wheel {
      position: static;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 60px;
      width: auto;
      height: auto;
      margin: 40px 0 0;
      transform: none !important; /* перебиваем инлайновый rotate() из JS */
    }

    &__spoke {
      position: static;
      transform: none !important; /* здесь тоже инлайновый rotate() из JS */
    }

    &__card {
      position: static;
      width: 100%;
      max-width: 460px;
      transform: none;
    }

    /* Скрытый заголовок становится видимым — он единственный оставшийся. */
    &__card-title {
      position: static;
      width: auto;
      height: auto;
      overflow: visible;
      clip-path: none;
      white-space: normal;
      max-width: 340px;
      margin-bottom: 20px;
      text-align: center;
    }
  }
}
</style>
