import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/scss';

export function initializeProgramsSwiper() {
  const swiperContainer = document.querySelector('.programs__swiper');
  const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');

  function removeClonedSlides() {
    swiperWrapper.querySelectorAll('.swiper-slide--cloned').forEach(clone => clone.remove());
  }

  function cloneSlides() {
    removeClonedSlides();

    if (window.innerWidth >= 1440) {
      const slides = swiperWrapper.querySelectorAll('.swiper-slide');
      if (slides.length >= 3) {
        for (let i = 0; i < 3; i++) {
          const clone = slides[i].cloneNode(true);
          clone.classList.add('swiper-slide--cloned');
          swiperWrapper.appendChild(clone);
        }
      }
    }
  }

  cloneSlides();

  const swiperInstance = new Swiper('.programs__swiper', {
    modules: [Navigation, Pagination, Scrollbar],
    loop: false,
    normalizeSliderIndex: true,
    navigation: {
      nextEl: '.programs__swiper-button.swiper-button-next',
      prevEl: '.programs__swiper-button.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
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
        slidesPerView: 2.15,
        spaceBetween: 30,
        grabCursor: true,
        allowTouchMove: true,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 32,
        allowTouchMove: false,
        grabCursor: false,
      },
    },
  });

  function handleResize() {
    cloneSlides();
    swiperInstance.update(); // Обновляем Swiper после изменения DOM
  }

  window.addEventListener('resize', handleResize);

  const prevButton = document.querySelector('.programs__swiper-button.swiper-button-prev');
  const nextButton = document.querySelector('.programs__swiper-button.swiper-button-next');
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
