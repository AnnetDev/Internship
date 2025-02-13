import Swiper from 'swiper';
import { Pagination, Keyboard, A11y } from 'swiper/modules';
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
    // const containerPaddingLeft = parseInt(computedStyle.paddingLeft, 10) || 0;


    const totalHeight = titleWrapper.offsetHeight + innerWrapper.offsetHeight + heroContainerPaddingBottom;
    pagination.style.bottom = `${totalHeight}px`;
    // pagination.style.left = `${containerPaddingLeft}px`;
  }
}

function updateActivePaginationBullet(swiper) {
  const bullets = document.querySelectorAll('.hero__swiper-pagination .swiper-pagination-bullet');
  if (!bullets.length) {
    return;
  }

  bullets.forEach((bullet, index) => {
    if (index === swiper.realIndex) {
      bullet.classList.add('swiper-pagination-bullet-active');
    } else {
      bullet.classList.remove('swiper-pagination-bullet-active');
    }
  });
}

export function initializeHeroSwiper() {
  const heroSwiperContainer = document.querySelector('.hero__swiper.swiper');
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
      init: function () {
        updatePaginationPosition(this);
        updateActivePaginationBullet(this);
      },
      slideChange: function () {
        updatePaginationPosition(this);
        updateActivePaginationBullet(this);
      },
      slideChangeTransitionEnd: function () {
        updatePaginationPosition(this);
      },
      // },
      // init: function () {
      //   updatePaginationPosition(this);
      //   updateActivePaginationBullet(this);
      // },
      // slideChange: function () {
      //   updateActivePaginationBullet(this);
      // },
      // slideChangeTransitionEnd: function () {
      //   updatePaginationPosition(this);
      // }
    }
  });


  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const focusedElement = document.activeElement;
      const swiperElement = document.querySelector('.hero__swiper.swiper');

      if (focusedElement && swiperElement) {
        const slide = focusedElement.closest('.hero__swiper-slide.swiper-slide');

        if (slide) {
          const slideIndex = Array.from(slide.parentElement.children).indexOf(slide);
          swiper.slideTo(slideIndex, 300, true);
        }
      }
    }
  });

  // window.addEventListener('resize', initializeHeroSwiper);
  window.addEventListener('resize', () => updatePaginationPosition(swiper));
}
