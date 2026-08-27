<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import ButtonCta from '@/components/ui/ButtonCta.vue'

interface Manager {
  name: string
  role: string
  avatar: string
}

interface ContactMethod {
  value: string
  label: string
}

interface Country {
  code: string
  name: string
  dialCode: string
  flag: string
  mask: string
}

interface FormData {
  name: string
  grade: string
  phone: string
  email: string
  contactMethod: string
  consent: boolean
}

interface SubmitPayload extends FormData {
  phone: string
  countryCode: string
}

interface PhoneInputEvent extends Event {
  target: EventTarget | null
}

const emit = defineEmits<{
  (event: 'submit', payload: SubmitPayload): void
}>()

const manager: Manager = {
  name: 'Анастасия Кучерова',
  role: 'Руководитель приёмной комиссии ITHub СПБ',
  avatar: '/src/assets/images/alexandra.webp',
}

const grades = [8, 9, 10, 11]

const contactMethods: ContactMethod[] = [
  {
    value: 'whatsapp',
    label: 'WhatsApp',
  },
  {
    value: 'max',
    label: 'Max',
  },
  {
    value: 'vk',
    label: 'Вконтакте',
  },
  {
    value: 'telegram',
    label: 'Telegram',
  },
]

const countries: Country[] = [
  {
    code: 'PS',
    name: 'Палестина',
    dialCode: '+970',
    flag: '/src/assets/icons/ps.svg',
    mask: '(###) ###-##-##',
  },
  {
    code: 'RU',
    name: 'Россия',
    dialCode: '+7',
    flag: '/src/assets/icons/ru.svg',
    mask: '(###) ###-##-##',
  },
  {
    code: 'KZ',
    name: 'Казахстан',
    dialCode: '+7',
    flag: '🇰🇿',
    mask: '(###) ###-##-##',
  },
  {
    code: 'BY',
    name: 'Беларусь',
    dialCode: '+375',
    flag: '🇧🇾',
    mask: '(##) ###-##-##',
  },
  {
    code: 'UA',
    name: 'Украина',
    dialCode: '+380',
    flag: '🇺🇦',
    mask: '(##) ###-##-##',
  },
  {
    code: 'UZ',
    name: 'Узбекистан',
    dialCode: '+998',
    flag: '🇺🇿',
    mask: '(##) ###-##-##',
  },
  {
    code: 'AM',
    name: 'Армения',
    dialCode: '+374',
    flag: '🇦🇲',
    mask: '(##) ###-###',
  },
  {
    code: 'KG',
    name: 'Киргизия',
    dialCode: '+996',
    flag: '🇰🇬',
    mask: '(###) ###-###',
  },
  {
    code: 'US',
    name: 'США',
    dialCode: '+1',
    flag: '🇺🇸',
    mask: '(###) ###-####',
  },
]

const form = reactive<FormData>({
  name: '',
  grade: '',
  phone: '',
  email: '',
  contactMethod: 'whatsapp',
  consent: false,
})

const country = reactive<Country>({
  ...countries[0]!,
})

const countryDropdownOpen = ref(false)
const submitting = ref(false)

const countrySelectRef = ref<HTMLElement | null>(null)

const phonePlaceholder = computed(() => {
  return `${country.dialCode} ${country.mask.replace(/#/g, '0')}`
})

function toggleCountry(): void {
  countryDropdownOpen.value = !countryDropdownOpen.value
}

function closeCountryDropdown(): void {
  countryDropdownOpen.value = false
}

function selectCountry(selectedCountry: Country): void {
  Object.assign(country, selectedCountry)

  countryDropdownOpen.value = false
  form.phone = ''
}

function handleClickOutside(event: MouseEvent): void {
  const target = event.target

  if (
    countrySelectRef.value &&
    target instanceof Node &&
    !countrySelectRef.value.contains(target)
  ) {
    closeCountryDropdown()
  }
}

function applyMask(digits: string, maskPattern: string): string {
  let result = ''
  let digitIndex = 0

  for (const char of maskPattern) {
    if (digitIndex >= digits.length) {
      break
    }

    if (char === '#') {
      result += digits[digitIndex]
      digitIndex++
    } else {
      result += char
    }
  }

  return result
}

function maskPhone(event: PhoneInputEvent): void {
  if (!(event.target instanceof HTMLInputElement)) {
    return
  }

  const maxDigits = (country.mask.match(/#/g) || []).length

  let digits = event.target.value.replace(/\D/g, '')

  digits = digits.slice(0, maxDigits)

  form.phone = applyMask(digits, country.mask)
}

async function handleSubmit(): Promise<void> {
  submitting.value = true

  try {
    const payload: SubmitPayload = {
      ...form,
      phone: `${country.dialCode} ${form.phone}`,
      countryCode: country.code,
    }

    emit('submit', payload)

    alert('Заявка отправлена! (демо — реальной отправки нет)')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <section class="lead-form">
    <div class="container">
      <div class="lead-form__grid">
        <div class="lead-form__content">
          <h2 class="lead-form__title title-md">Готов к карьере в разработке игр?</h2>

          <p class="lead-form__description">
            Узнать больше об обучении в ITHub СПб, подать заявку и задать вопросы можно как онлайн,
            так и лично — вам поможет команда приёмной комиссии
          </p>

          <div class="lead-form__manager">
            <img class="lead-form__manager-avatar" :src="manager.avatar" :alt="manager.name" />

            <div class="lead-form__manager-info">
              <p class="lead-form__manager-name">
                {{ manager.name }}
              </p>

              <p class="lead-form__manager-role">
                {{ manager.role }}
              </p>
            </div>
          </div>
        </div>

        <form class="lead-form__form" @submit.prevent="handleSubmit">
          <input
            v-model="form.name"
            class="lead-form__field"
            type="text"
            placeholder="Иван"
            required
          />

          <select v-model="form.grade" class="lead-form__field lead-form__select" required>
            <option value="" disabled>Выбери класс</option>

            <option v-for="grade in grades" :key="grade" :value="grade">{{ grade }} класс</option>
          </select>

          <div class="lead-form__phone">
            <div ref="countrySelectRef" class="lead-form__country">
              <button
                class="lead-form__country-button"
                type="button"
                :aria-expanded="countryDropdownOpen"
                @click="toggleCountry"
              >
                <img :src="country.flag" class="lead-form__flag" alt="Флаг" />

                <span
                  class="lead-form__chevron"
                  :class="{
                    'lead-form__chevron--open': countryDropdownOpen,
                  }"
                >
                  ▾
                </span>
              </button>

              <ul v-if="countryDropdownOpen" class="lead-form__dropdown">
                <li
                  v-for="item in countries"
                  :key="item.code"
                  class="lead-form__country-option"
                  :class="{
                    'lead-form__country-option--active': item.code === country.code,
                  }"
                  @click="selectCountry(item)"
                >
                  <img :src="item.flag" class="lead-form__flag" alt="Флаг" />

                  <span class="lead-form__country-name">
                    {{ item.name }}
                  </span>

                  <span class="lead-form__country-dial">
                    {{ item.dialCode }}
                  </span>
                </li>
              </ul>
            </div>

            <input
              v-model="form.phone"
              class="lead-form__phone-input"
              type="tel"
              :placeholder="phonePlaceholder"
              required
              @input="maskPhone"
              @focus="closeCountryDropdown"
            />
          </div>

          <input
            v-model="form.email"
            class="lead-form__field"
            type="email"
            placeholder="example@site.com"
            required
          />

          <p class="lead-form__contact-label">Удобный вид связи</p>

          <div class="lead-form__radio-group">
            <label
              v-for="method in contactMethods"
              :key="method.value"
              class="lead-form__radio-option"
            >
              <input
                v-model="form.contactMethod"
                type="radio"
                name="contact_method"
                :value="method.value"
              />

              <span>
                {{ method.label }}
              </span>
            </label>
          </div>

          <label class="lead-form__consent">
            <input v-model="form.consent" type="checkbox" required />

            <span class="lead-form__consent-text">
              Отправляя форму, я подтверждаю<a href="#" target="_blank" rel="noopener" @click.stop>
                согласие </a
              >на обработку персональных данных
            </span>
          </label>

          <div class="lead-form__submit">
            <ButtonCta type="submit" :disabled="submitting">
              {{ submitting ? 'Отправка...' : 'Поступить в ITHUB СПБ' }}
            </ButtonCta>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.lead-form {
  @include adaptive-zoom;

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;
    gap: 15px;

    @media (max-width: 1199px) {
      grid-template-columns: 1fr;
    }
  }

  &__content {
    max-width: 350px;

    @media (max-width: 1199px) {
      max-width: 450px;
    }
  }

  &__title {
    margin-bottom: 20px;

    @media (max-width: 1199px) {
      max-width: 300px;
    }
  }

  &__description {
    font-size: clamp(12px, 1vw, 14px);
    line-height: 20px;
    margin-bottom: clamp(20px, 3vw, 40px);
  }

  &__manager {
    display: flex;
    align-items: center;
    gap: 15px;

    @media (max-width: 1199px) {
      max-width: 335px;
      margin-bottom: 20px;
    }
  }

  &__manager-avatar {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    border-radius: 50%;
    object-fit: contain;
  }

  &__manager-name {
    font-size: clamp(16px, 1.5vw, 18px);
    font-weight: 700;
    margin-bottom: 10px;
  }

  &__manager-role {
    font-size: clamp(12px, 1vw, 14px);
    line-height: 20px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 500px;
    padding: 20px;
    border-radius: 15px;
    background-color: $color-dark;

    @media (max-width: 1199px) {
      max-width: 100%;
    }
  }

  &__field {
    padding: 15px;
    border-radius: 30px;
    color: $color-white;
    background: $color-light-dark;
    transition:
      background 0.15s ease,
      border-color 0.15s ease;

    &::placeholder {
      color: $color-gray;
    }

    &:focus {
      border-color: $color-light-dark;
    }
  }

  &__select {
    padding: 17px 15px;
    appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='9' viewBox='0 0 14 9' fill='none'><path d='M1 1L7 7L13 1' stroke='%23a8a8ac' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/></svg>");
    background-repeat: no-repeat;
    background-position: right 25px center;
  }

  &__phone {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 15px;
    border-radius: 30px;
    background: $color-light-dark;
    transition: background 0.15s ease;
  }

  &__country {
    position: relative;
    flex-shrink: 0;
  }

  &__country-button {
    display: flex;
    align-items: center;
    gap: 5px;
    color: $color-gray;
    cursor: pointer;
  }

  &__flag {
    width: 20px;
  }

  &__chevron {
    font-size: 15px;
    transition: transform 0.15s ease;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    z-index: 20;
    top: calc(100% + 10px);
    left: -20px;
    width: 250px;
    max-height: 330px;
    padding: 5px;
    border-radius: 15px;
    background-color: $color-dark;
    box-shadow: 0 10px 30px rgb(0 0 0 / 45%);
    overflow-y: auto;
    scrollbar-width: none;

    @media (max-width: 439px) {
      width: 200px;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__country-option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    font-size: clamp(12px, 1vw, 14px);
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.12s ease;

    &--active {
      background: rgb(139 63 251 / 18%);
    }
  }

  &__country-name {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__phone-input {
    width: 100%;
    color: $color-white;
    background: none;
  }

  &__contact-label {
    margin-top: 10px;
    font-size: 16px;
  }

  &__radio-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__radio-option {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    cursor: pointer;

    input {
      appearance: none;
      display: grid;
      place-content: center;
      width: 22px;
      height: 22px;
      border: 2px solid $color-purple;
      border-radius: 50%;
      cursor: pointer;
      transition: border-color 0.15s ease;
      opacity: 0.5;

      &::before {
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: $color-purple;
        transform: scale(0);
        transition: transform 0.12s ease;
      }

      &:checked {
        border-color: $color-purple;
        opacity: 1;

        &::before {
          transform: scale(1);
        }
      }
    }
  }

  &__consent {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    cursor: pointer;
    margin-bottom: 20px;

    input {
      appearance: none;
      display: grid;
      place-content: center;
      flex-shrink: 0;
      width: 22px;
      height: 22px;
      border: 2px solid $color-purple;
      opacity: 0.5;
      cursor: pointer;
      transition:
        border-color 0.15s ease,
        background 0.15s ease;

      &:checked {
        border-color: $color-purple;
        opacity: 1;

        &::before {
          content: '';
          width: 6px;
          height: 10px;
          border-right: 2px solid $color-purple;
          border-bottom: 2px solid $color-purple;
          transform: rotate(45deg) translate(-1px, -1px);
        }
      }
    }
  }

  &__consent-text {
    line-height: 1.5;

    a {
      display: inline-block;
      margin: 0 5px;
      color: $color-purple;
      text-decoration: underline;
    }
  }

  &__submit {
    max-width: 265px;

      @media (max-width: 959px) {
        max-width: 100%;
      }
  }
}
</style>
