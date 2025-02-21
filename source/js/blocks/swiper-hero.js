import Swiper from 'swiper';
import { Pagination, Keyboard, A11y, EffectFade } from 'swiper/modules';
import 'swiper/scss';


function updatePaginationPosition(swiper) {
  const activeSlide = swiper.slides[swiper.activeIndex];
  if (!activeSlide) {
    return;
  }

  const titleWrapper = activeSlide.querySelector('.hero__slide-title-wrapper');
  const innerWrapper = activeSlide.querySelector('.hero__slider-inner-wrapper');
  const container = activeSlide.querySelector('.container');
  const pagination = document.querySelector('.hero__swiper-pagination');

  if (titleWrapper && innerWrapper && container && pagination) {
    const computedStyle = window.getComputedStyle(container);
    const containerPaddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0;

    const totalHeight = titleWrapper.offsetHeight + innerWrapper.offsetHeight + containerPaddingBottom;
    pagination.style.bottom = `${totalHeight}px`;
  }
}


export function initializeHeroSwiper() {
  const heroSwiperContainer = document.querySelector('.hero__swiper.swiper');
  if (!heroSwiperContainer) {
    return;
  }

  const swiper = new Swiper(heroSwiperContainer, {
    modules: [Pagination, Keyboard, A11y, EffectFade],
    loop: true,
    speed: 800,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    slidesPerView: 1,
    virtualTranslate: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    a11y: {
      enabled: true,
      focusableElements: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    },
    pagination: {
      el: '.hero__swiper-pagination.swiper-pagination',
      clickable: true,
      renderBullet: (index, className) =>
        `<div class="${className}" tabindex="0" role="button" aria-label="Перейти к слайду ${index + 1}"></div>`,
    },
    breakpoints: {
      1440: {
        allowTouchMove: false,
      }
    },
    on: {
      slideChange: function () {
        updatePaginationPosition(this);

        const paginationButtons = document.querySelectorAll('.hero__swiper-pagination .swiper-pagination-bullet');
        paginationButtons.forEach((button) => button.setAttribute('tabindex', '-1'));
        const activePagination = document.querySelector('.hero__swiper-pagination .swiper-pagination-bullet-active');
        if (activePagination) {
          activePagination.setAttribute('tabindex', '0');
        }


      },
    },

  });

  window.addEventListener('resize', () => swiper);
}
