import Swiper from 'swiper';
import { Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/scss';

export function initializeHeroSwiper() {
  const heroSwiperContainer = document.querySelector('.hero__swiper');
  if (!heroSwiperContainer) {
    return;
  }

  const swiper = new Swiper(heroSwiperContainer, {
    modules: [Pagination, Keyboard, A11y],
    loop: true,
    loopedSlides: 3,
    effect: 'creative',
    centeredSlides: true,
    slidesPerView: 1,
    // spaceBetween: 50,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    a11y: {
      enabled: true,
      focusableElements: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: (index, className) =>
        `<div class="${className}" tabindex="0" role="button" aria-label="Перейти к слайду ${index + 1}"></div>`,
    },
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const focusedElement = document.activeElement;
      const swiperElement = document.querySelector('.hero__swiper');

      if (focusedElement && swiperElement) {
        const slide = focusedElement.closest('.swiper-slide');

        if (slide) {
          const slideIndex = Array.from(slide.parentElement.children).indexOf(slide);
          swiper.slideTo(slideIndex, 300, true);
        }
      }
    }
  });
}
