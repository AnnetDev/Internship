import { updatePaginationPosition } from './swiper-hero';

function loadTranslations(lang) {
  fetch('translations.json')
    .then((response) => response.json())
    .then((translations) => {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', translations[lang]['metaDescription']);
      }

      document.querySelectorAll('[data-translate]').forEach((element) => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[lang][key];
        const hiddenText = element.querySelector('.visually-hidden');
        if (hiddenText) {
          hiddenText.textContent = translations[lang][key];
        }
      });

      document.querySelectorAll('[data-translate-alt]').forEach((element) => {
        const key = element.getAttribute('data-translate-alt');
        element.setAttribute('alt', translations[lang][key]);
      });

      document.querySelectorAll('[aria-label]').forEach((element) => {
        const key = element.getAttribute('aria-label');
        if (translations[lang][key]) {
          element.setAttribute('aria-label', translations[lang][key]);
        }
      });

      // Даем браузеру время на перерасчет стилей после обновления DOM
      setTimeout(() => {
        if (window.heroSwiper) {
          updatePaginationPosition(window.heroSwiper);
          // Если требуется, можно вызвать и обновление Swiper
          window.heroSwiper.update();
        }
      }, 50);
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
