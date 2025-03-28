import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/scss';

export function initializeReviewsSwiper() {
  const swiperContainer = document.querySelector('.reviews__swiper.swiper');
  const swiperWrapper = swiperContainer.querySelector('.reviews__swiper-wrapper.swiper-wrapper');

  function removeClonedSlides() {
    swiperWrapper.querySelectorAll('.reviews__swiper-slide--cloned').forEach((clone) => clone.remove());
  }

  function cloneSlides() {
    removeClonedSlides();

    if (window.innerWidth >= 1440) {
      const slides = swiperWrapper.querySelectorAll('.reviews__swiper-slide.swiper-slide');
      const originalSlidesCount = slides.length;

      if (originalSlidesCount > 0 && originalSlidesCount < 5) {
        const clonesNeeded = 5 - originalSlidesCount;

        for (let i = 0; i < clonesNeeded; i++) {
          const clone = slides[i % originalSlidesCount].cloneNode(true);
          clone.classList.add('reviews__swiper-slide--cloned');
          swiperWrapper.appendChild(clone);
        }
      }
    }
  }

  cloneSlides();

  const swiperInstance = new Swiper('.reviews__swiper.swiper', {
    modules: [Navigation, Pagination, Scrollbar],
    loop: false,
    normalizeSliderIndex: true,
    navigation: {
      nextEl: '.reviews__swiper-button.swiper-button-next',
      prevEl: '.reviews__swiper-button.swiper-button-prev',
    },
    scrollbar: {
      el: '.reviews__swiper-scrollbar.swiper-scrollbar',
      hide: false,
      draggable: true,
      grabCursor: true,
    },
    slidesPerGroup: 1,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,
        allowTouchMove: true,
      },
      768: {
        slidesPerView: 1.3,
        spaceBetween: 30,
        grabCursor: true,
        allowTouchMove: true,
      },
      1440: {
        slidesPerView: 2,
        spaceBetween: 32,
        allowTouchMove: false,
        grabCursor: false,
      },
    },
  });

  function handleResize() {
    cloneSlides();
    swiperInstance.update();
  }

  window.addEventListener('resize', handleResize);

  const prevButton = document.querySelector('.reviews__swiper-button.swiper-button-prev');
  const nextButton = document.querySelector('.reviews__swiper-button.swiper-button-next');
  const linkButton = document.querySelector('.reviews__slide-link');

  if (prevButton && nextButton && linkButton) {
    prevButton.setAttribute('tabindex', '0');
    nextButton.setAttribute('tabindex', '0');
    linkButton.setAttribute('tabindex', '0');

    prevButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        swiperInstance.slidePrev();
      }
    });

    nextButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        swiperInstance.slideNext();
      }
    });

    nextButton.addEventListener('blur', () => {
      if (document.activeElement === nextButton) {
        linkButton.focus();
      }
    });
  }
}
