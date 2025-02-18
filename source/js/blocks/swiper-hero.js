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
  const heroContainer = activeSlide.querySelector('.hero__swiper-slide .container');
  const pagination = document.querySelector('.hero__swiper-pagination');

  if (titleWrapper && innerWrapper && heroContainer && pagination && container) {
    const computedStyle = window.getComputedStyle(heroContainer);
    const heroContainerPaddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0;


    const totalHeight = titleWrapper.offsetHeight + innerWrapper.offsetHeight + heroContainerPaddingBottom;
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
    centeredSlides: true,
    // initialSlide: 1,
    slidesPerView: 1,
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
    // on: {
    //   slideChange: function () {
    //     updatePaginationPosition(this);
    //   },
    // }
    on: {
      slideChange: function () {
        updatePaginationPosition(this);

        // Обновляем tabindex у пагинации
        const paginationButtons = document.querySelectorAll('.hero__swiper-pagination .swiper-pagination-bullet');
        paginationButtons.forEach((button) => button.setAttribute('tabindex', '-1'));

        const activePagination = document.querySelector('.hero__swiper-pagination .swiper-pagination-bullet-active');
        if (activePagination) {
          activePagination.setAttribute('tabindex', '0');
        }

        // Обновляем классы для слайдов
        const allSlides = this.slides;
        allSlides.forEach((slide) => {
          // Удаляем класс is-active у всех ссылок
          const link = slide.querySelector('.hero__slide-link');
          if (link) {
            link.classList.remove('is-active');
            link.setAttribute('tabindex', '-1'); // Скрываем от фокуса неактивные ссылки
          }
        });

        // Используем текущий активный слайд
        const activeSlide = this.slides[this.activeIndex];
        if (activeSlide) {
          const activeLink = activeSlide.querySelector('.hero__slide-link');
          if (activeLink) {
            activeLink.classList.add('is-active');
            activeLink.setAttribute('tabindex', '0'); // Делаем активную ссылку доступной
          }
        }
      },
    },


  });

  window.addEventListener('resize', () => swiper);
}
