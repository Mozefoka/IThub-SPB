# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Команды

```bash
npm run dev          # dev-сервер Vite
npm run build        # type-check + сборка параллельно (run-p)
npm run build-only   # только vite build, без проверки типов
npm run type-check   # vue-tsc --build (инкрементально, .tsbuildinfo в node_modules/.tmp)
npm run lint         # последовательно: oxlint --fix, затем eslint --fix --cache
npm run format       # prettier --write src/
npm run preview      # предпросмотр собранного dist
```

Порядок в `lint` важен: `eslint-plugin-oxlint` отключает в ESLint правила,
которые уже покрыты oxlint. Запуск только ESLint даст дубли диагностик.

Тестов в проекте нет — ни раннера, ни конфига. Если задача требует тестов,
сначала обсуди выбор раннера (Vitest — очевидный дефолт для этого стека).

Node: `^22.18.0 || >=24.12.0` (см. `engines` в package.json).

## Что это за проект

Маркетинговый лендинг колледжа ITHub СПБ: SPA на Vue 3 + Vite, без бэкенда
и без стора. Один маршрут — одна посадочная страница под специальность.
Весь контент на русском и захардкожен в компонентах.

## Архитектура

### Маршрутизация

`src/router/index.ts` — 4 маршрута: `/marketing`, `/gamedev`, `/it`, `/design`.

Маршрута `/` нет — корень отдаёт пустую страницу. `App.vue` содержит
`<RouterView />` плюс временную навигацию из четырёх `RouterLink` — это
строительные леса для разработки, не финальный хедер.

Готовность страниц сильно разная: `MarketingPage` собрана полностью,
`GamedevPage` — только `BaseHero`, `ItPage` и `DesignPage` — заглушки.

### Слои компонентов

- `src/pages/` — страница как композиция секций в фиксированном порядке.
  Своей логики и стилей у страницы нет.
- `src/components/` — секции экрана (`SuccessStories`, `TeachingApproach`,
  `StudentProjects`, `StudyProgram`, `LeadForm`, `BaseFaq`). Каждая секция
  самодостаточна: свои типы, свои данные, свои scoped-стили.
- `src/components/ui/` — переиспользуемые примитивы (`ButtonCta`, `BaseBadge`,
  `BaseSlider`, `BenefitsBlock`). Варианты задаются пропсами и раскрываются
  в модификаторы БЭМ (`button-cta--small`, `base-badge__inner--secondary`).
- `src/components/hero/` — `BaseHero` конфигурируется пропсами (title/subtitle/
  mainImage/leftImage/rightImage) и предназначен для новых специальностей;
  `HeroMarketing` — отдельная нестандартная вёрстка под маркетинг.

Все SFC — `<script setup lang="ts">`, пропсы через `defineProps<Props>()` /
`withDefaults`, интерфейсы объявляются локально в том же файле.

### Контент

Данных из API нет. Каждая секция держит контент в типизированном `const`-массиве
(или `ref`) прямо в `<script setup>`: `stories`, `projects`, `cards`,
`teachingBlocks`, `faqItems`. Добавить кейс/программу/вопрос = отредактировать
этот массив, не создавать новый компонент.

`LeadForm` только эмитит `submit` с payload — отправки никуда нет, и страницы
на этот эмит не подписаны. Интеграция с бэкендом ещё не сделана.

## Стили

SCSS, БЭМ через вложенный `&`, `<style scoped lang="scss">` в каждом SFC.

Глобальный слой — `src/styles/`, подключается один раз в `main.ts` через
`main.scss` (агрегатор `@use` для reset/global/fonts/variables/mixins/animations).

**Переменные и миксины не глобальные.** В каждом компоненте, которому они нужны,
подключай явно:

```scss
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;
```

Keyframes из `_animations.scss` (`rotate-star`, `base`, `head`) — глобальные,
их достаточно указать в `animation:`.

Утилитарные классы из `_global.scss` (`.container`, `.title-lg`, `.title-md`,
`.title-s`) применяются в шаблонах рядом с БЭМ-классами:
`class="marketing-hero__title title-lg"`.

### Адаптив

Проект масштабируется через `zoom`, а не через типографику: миксины
`adaptive-zoom` (обычные секции) и `hero-zoom` (герои) меняют зум по
брейкпоинтам. Внутренние размеры заданы в px из расчёта на этот зум — правя
размеры, держи это в голове.

Брейкпоинты (1150 / 959 / 639 / 500 и мельче) захардкожены в каждом файле,
переменных под них нет. Набор в разных компонентах отличается — сверяйся
с соседним кодом, а не изобретай свой.

## Ассеты — известная ловушка

Два несовместимых способа ссылаться на файлы:

1. `<img src="@/assets/images/face.webp">` прямо в шаблоне — Vite резолвит
   и хеширует при сборке. **Так правильно.**
2. Строковые пути в данных: `photo: '/src/assets/images/roman.webp'` —
   Vite их не обрабатывает. Работает только в dev через файловый сервер,
   в `npm run build` даст 404. Так сделано во всех data-driven секциях
   (`SuccessStories`, `StudentProjects`, `TeachingApproach`, `LeadForm`).
   `GamedevPage` передаёт пути даже без ведущего слеша (`src/assets/...`) —
   ломается и в dev.

Правя эти секции, переводи пути на `import` или
`new URL('../assets/...', import.meta.url).href`, либо переноси файлы в
`public/`. Новые строковые `/src/assets/...` не добавляй.

## Прочие особенности

- `TestBlock.vue` — почти полная копия `LeadForm.vue` (отличия: имена файлов
  флагов и пара правил CSS). Это черновик, отрисованный в `DesignPage`.
  Не правь оба файла синхронно — предложи консолидацию.
- Алиас `@` → `src` задан в двух местах: `vite.config.ts` и `tsconfig.app.json`.
  Менять нужно оба.
- `noUncheckedIndexedAccess: true` — доступ по индексу возвращает `T | undefined`.
- Prettier: без точек с запятой, одинарные кавычки, ширина 100.
