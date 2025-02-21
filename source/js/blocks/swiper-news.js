import Swiper from 'swiper';
import { Navigation, Pagination, Grid } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/grid';

function updateCustomPagination(swiper) {
  const slidesPerGroup = swiper.params.slidesPerGroup;
  const totalSlides = swiper.slides.length;
  const totalGroups = Math.ceil(totalSlides / slidesPerGroup);
  const activeGroup = Math.floor(swiper.activeIndex / slidesPerGroup) + 1;
  let displayedButtons = [];
  if (activeGroup <= 3) {
    displayedButtons = totalGroups < 4
      ? Array.from({ length: totalGroups }, (_, i) => i + 1)
      : [1, 2, 3, 4];
  } else if (activeGroup >= totalGroups) {
    displayedButtons = totalGroups < 4
      ? Array.from({ length: totalGroups }, (_, i) => i + 1)
      : [totalGroups - 3, totalGroups - 2, totalGroups - 1, totalGroups];
  } else {
    displayedButtons = [activeGroup - 2, activeGroup - 1, activeGroup, activeGroup + 1];
  }
  let activeButtonIndex;
  if (activeGroup <= 3) {
    activeButtonIndex = activeGroup - 1;
  } else if (activeGroup >= totalGroups) {
    activeButtonIndex = 3;
  } else {
    activeButtonIndex = 2;
  }
  const paginationContainer = document.querySelector('.news__swiper-pagination.swiper-pagination');
  let html = '';
  displayedButtons.forEach((groupNumber, idx) => {
    const activeClass = idx === activeButtonIndex ? 'swiper-pagination-bullet-active' : '';
    // Добавляем tabindex="0" для фокусируемости каждой кнопки пагинации
    html += `<span class="swiper-pagination-bullet ${activeClass}" tabindex="0">${groupNumber}</span>`;
  });
  paginationContainer.innerHTML = html;
}

function attachPaginationClickHandler(swiper) {
  const paginationContainer = document.querySelector('.news__swiper-pagination.swiper-pagination');
  if (!paginationContainer.dataset.listenerAttached) {
    // Обработчик клика
    paginationContainer.addEventListener('click', (e) => {
      const bullet = e.target.closest('.swiper-pagination-bullet');
      if (!bullet) {
        return;
      }
      const groupNumber = parseInt(bullet.textContent, 10);
      if (isNaN(groupNumber)) {
        return;
      }
      const slideIndex = (groupNumber - 1) * swiper.params.slidesPerGroup;
      swiper.slideTo(slideIndex);
    });
    // Обработчик нажатия клавиши (Enter или Space)
    paginationContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const bullet = e.target.closest('.swiper-pagination-bullet');
        if (!bullet) {
          return;
        }
        const groupNumber = parseInt(bullet.textContent, 10);
        if (isNaN(groupNumber)) {
          return;
        }
        const slideIndex = (groupNumber - 1) * swiper.params.slidesPerGroup;
        swiper.slideTo(slideIndex);
      }
    });
    paginationContainer.dataset.listenerAttached = 'true';
  }
}


function updateTabIndices(swiper) {
  // Стрелки и контейнер пагинации делаем фокусируемыми (tabindex="0")
  const prevArrow = document.querySelector('.news__swiper-button.swiper-button-prev');
  const nextArrow = document.querySelector('.news__swiper-button.swiper-button-next');
  const pagination = document.querySelector('.news__swiper-pagination.swiper-pagination');
  if (prevArrow) {
    prevArrow.setAttribute('tabindex', '0');
  }
  if (nextArrow) {
    nextArrow.setAttribute('tabindex', '0');
  }
  if (pagination) {
    pagination.setAttribute('tabindex', '0');
  }

  // Все ссылки в слайдах делаем не фокусируемыми
  swiper.slides.forEach((slide) => {
    const link = slide.querySelector('.news__link');
    if (link) {
      link.setAttribute('tabindex', '-1');
    }
  });

  // Только ссылка в активном слайде делаем фокусируемой
  const activeSlide = swiper.slides[swiper.activeIndex];
  if (activeSlide) {
    const link = activeSlide.querySelector('.news__link');
    if (link) {
      link.setAttribute('tabindex', '0');
    }
  }
}


export function initializeNewsSwiper() {
  const swiperContainer = document.querySelector('.news__swiper.swiper');
  const swiperWrapper = swiperContainer.querySelector('.news__swiper-wrapper.swiper-wrapper');

  function removeClonedSlides() {
    swiperWrapper.querySelectorAll('.news__swiper-slide--cloned').forEach((clone) => clone.remove());
  }
  function cloneSlides() {
    removeClonedSlides();
    const slides = swiperWrapper.querySelectorAll('.news__swiper-slide.swiper-slide:not(.news__swiper-slide--cloned)');
    const targetCount = 24; // Общее количество слайдов
    const currentCount = slides.length;
    const clonesNeeded = targetCount - currentCount;
    if (clonesNeeded > 0) {
      for (let i = 0; i < clonesNeeded; i++) {
        const clone = slides[i % currentCount].cloneNode(true);
        clone.classList.add('news__swiper-slide--cloned');
        swiperWrapper.appendChild(clone);
      }
    }
  }

  cloneSlides();

  const newsSwiper = new Swiper('.news__swiper', {
    modules: [Navigation, Pagination, Grid],
    direction: 'horizontal',
    // Указываем тип custom, чтобы Swiper не создавал свои кнопки
    pagination: {
      el: '.news__swiper-pagination.swiper-pagination',
      clickable: true,
      type: 'custom',
      // Функция renderCustom может возвращать пустую строку, т.к. мы обновляем пагинацию вручную
      renderCustom: () => ''
    },
    navigation: {
      nextEl: '.news__swiper-button.swiper-button-next',
      prevEl: '.news__swiper-button.swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        grid: {
          rows: 2,
          fill: 'column',
        },
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: {
          rows: 2,
          fill: 'row',
        },
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          rows: 1,
          fill: 'row',
        },
        spaceBetween: 32,
      },
    },
    on: {
      init(swiper) {
        updateCustomPagination(swiper);
        attachPaginationClickHandler(swiper);
        updateTabIndices(swiper);
      },
      slideChange(swiper) {
        updateCustomPagination(swiper);
        updateTabIndices(swiper);
      },
    },
  });

  window.addEventListener('resize', () => {
    newsSwiper.update();
    cloneSlides();
  });

  return newsSwiper;
}

export function toggleTabs() {
  const tabs = document.querySelectorAll('.news__tab-button');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('news__tab-button--active');
      });
      tab.classList.add('news__tab-button--active');
    });
  });
}
