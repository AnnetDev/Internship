import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/scss';

export function initializeProgramsSwiper() {
  const swiperInstance = new Swiper('.programs__swiper', {
    modules: [Navigation, Pagination, Scrollbar],
    loop: false,
    normalizeSliderIndex: true,
    navigation: {
      nextEl: '.swiper-button.swiper-button-next',
      prevEl: '.swiper-button.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,
      },
      768: {
        slidesPerView: 2.15,
        spaceBetween: 30,
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: true,
        },
        grabCursor: true,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 32,
        allowTouchMove: false,
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: true,
        },
        grabCursor: false,
      },
    },
  });

  const prevButton = document.querySelector('.swiper-button.swiper-button-prev');
  const nextButton = document.querySelector('.swiper-button.swiper-button-next');
  const linkButton = document.querySelector('.programs__slide-link');

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
