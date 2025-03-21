export function loadTranslations(lang) {
  fetch('translations.json')// Загружаем JSON файл с переводами
    .then((response) => response.json())
    .then((translations) => {
      document.querySelectorAll('[data-translate]').forEach((element) => {
        const key = element.getAttribute('data-translate');
        // Обновляем видимый текст
        element.textContent = translations[lang][key];

        // Обновляем скрытый текст для скринридеров
        const hiddenText = element.querySelector('.visually-hidden');
        if (hiddenText) {
          hiddenText.textContent = translations[lang][key];
        }
      });

      document.querySelectorAll('[data-translate-alt]').forEach((element) => {
        const key = element.getAttribute('data-translate-alt');
        element.setAttribute('alt', translations[lang][key]);
      });
    });
}

export function toggleLanguage() {
  const newLang = document.documentElement.lang === 'ru' ? 'en' : 'ru';
  document.documentElement.lang = newLang;
  localStorage.setItem('language', newLang);
  loadTranslations(newLang);
}

export function setInitialLanguage() {
  const savedLang = localStorage.getItem('language') || 'en';
  document.documentElement.lang = savedLang;
  loadTranslations(savedLang);
}
