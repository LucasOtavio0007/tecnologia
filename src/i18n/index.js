import { createI18n } from 'vue-i18n'

// Normaliza para os dois únicos locales válidos: 'pt-BR' e 'en'
function normalizeLocale(locale) {
  if (!locale) return 'pt-BR'
  if (locale.startsWith('pt')) return 'pt-BR'
  if (locale.startsWith('en')) return 'en'
  return 'pt-BR'
}

// Carrega apenas pt-BR e en
const locales = import.meta.glob('../locales/*.json', { eager: true })
const messages = {}

for (const path in locales) {
  const fileName = path.match(/\/([^/]+)\.json$/)[1]
  if (fileName === 'pt-BR' || fileName === 'en') {
    messages[fileName] = locales[path]
  }
}

const savedLocale = normalizeLocale(localStorage.getItem('noir_locale'))

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'pt-BR',
  messages,
  missingWarn: false,
  fallbackWarn: false,
})

export default i18n