import Swiper from 'swiper';
import { Navigation, Pagination, Grid } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/grid';
// import 'swiper/scss/pagination';

function updateCustomPagination(swiper) {
  // Автоматически получаем общее число слайдов (включая клонированные)
  const totalSlides = swiper.slides.length;
  const slidesPerGroup = swiper.params.slidesPerGroup; // размер группы (сколько слайдов пролистывается за раз)
  const totalGroups = Math.ceil(totalSlides / slidesPerGroup);

  const activeGroup = Math.floor(swiper.activeIndex / slidesPerGroup) + 1;

  let displayedButtons = [];

  if (activeGroup <= 3) {
    if (totalGroups < 4) {
      displayedButtons = Array.from({ length: totalGroups }, (_, i) => i + 1);
    } else {
      displayedButtons = [1, 2, 3, 4];
    }
  } else if (activeGroup >= totalGroups) {
    if (totalGroups < 4) {
      displayedButtons = Array.from({ length: totalGroups }, (_, i) => i + 1);
    } else {
      displayedButtons = [totalGroups - 3, totalGroups - 2, totalGroups - 1, totalGroups];
    }
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
    html += `<span class="swiper-pagination-bullet ${activeClass}">${groupNumber}</span>`;
  });
  paginationContainer.innerHTML = html;
}

function attachPaginationClickHandler(swiper) {
  const paginationContainer = document.querySelector('.news__swiper-pagination.swiper-pagination');
  // Убедимся, что обработчик навешивается один раз:
  if (!paginationContainer.dataset.listenerAttached) {
    paginationContainer.addEventListener('click', (e) => {
      const bullet = e.target.closest('.swiper-pagination-bullet');
      if (!bullet) {
        return;
      }
      const groupNumber = parseInt(bullet.textContent, 10);
      if (isNaN(groupNumber)) {
        return;
      }
      // Вычисляем индекс первого слайда для выбранной группы:
      const slideIndex = (groupNumber - 1) * swiper.params.slidesPerGroup;
      swiper.slideTo(slideIndex);
    });
    paginationContainer.dataset.listenerAttached = 'true';
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

    const slides = swiperWrapper.querySelectorAll('.news__swiper-slide.swiper-slide');
    if (slides.length > 0) {
      const targetCount = 24; // Общее количество слайдов
      const currentCount = slides.length; // Текущее количество слайдов
      const clonesNeeded = targetCount - currentCount; // Сколько слайдов нужно клонировать

      for (let i = 0; i < clonesNeeded; i++) {
        const clone = slides[i % currentCount].cloneNode(true); // Цикл по оригинальным слайдам
        clone.classList.add('news__swiper-slide--cloned');
        swiperWrapper.appendChild(clone);
      }
    }

  }

  cloneSlides();


  const newsSwiper = new Swiper('.news__swiper', {
    modules: [Navigation, Pagination, Grid],
    direction: 'horizontal',
    pagination: {
      el: '.news__swiper-pagination.swiper-pagination',
      clickable: true,
      // dynamicBullets: true,
      // dynamicMainBullets: 4,
      // renderBullet: function (index, className) {
      //   return `<span class="${className}">${index + 1}</span>`;
      // },
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
      },
      slideChange(swiper) {
        updateCustomPagination(swiper);
      },
      beforeBreakpoint(swiper, breakpointParams) {
        if (
          swiper.params.grid &&
          breakpointParams.grid &&
          swiper.params.grid.fill !== breakpointParams.grid.fill
        ) {
          swiper.destroy(true, false);
          Object.assign(swiper.params, breakpointParams);
          swiper.init();
          swiper.update();
        }
      },
    },
  });

  window.addEventListener('resize', () => {
    newsSwiper.update();
  });

  return newsSwiper;

  // let resizeTimeout;
  // window.addEventListener('resize', () => {
  //   clearTimeout(resizeTimeout);
  //   resizeTimeout = setTimeout(() => {
  //     window.location.reload();
  //   }, 50);
  // }); //костыль


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

// import Swiper from 'swiper';
// import { Navigation, Pagination, Grid } from 'swiper/modules';
// import 'swiper/scss';
// import 'swiper/scss/grid';

// /**
//  * Инициализация свайпера для мобильных устройств
//  * Конфигурация: 1 слайд (1 колонка) с grid: 2 ряда, fill: 'column'
//  */
// export function initializeNewsSwiperMobile() {
//   const mobileSwiper = new Swiper('.news__swiper', {
//     modules: [Navigation, Pagination, Grid],
//     direction: 'horizontal',
//     spaceBetween: 20,
//     slidesPerView: 1,
//     slidesPerGroup: 1,
//     grid: {
//       rows: 2,
//       fill: 'column',
//     },
//     pagination: {
//       el: '.news__swiper-pagination.swiper-pagination',
//       clickable: true,
//     },
//     navigation: {
//       nextEl: '.news__swiper-button.swiper-button-next',
//       prevEl: '.news__swiper-button.swiper-button-prev',
//     },
//   });

//   // Обновление свайпера при изменении размеров окна
//   window.addEventListener('resize', () => {
//     mobileSwiper.update();
//   });
// }

// /**
//  * Инициализация свайпера для планшета и десктопа
//  * Конфигурация через breakpoints:
//  * - От 768px: 2 слайда в ряд, grid: 2 ряда, fill: 'row'
//  * - От 1440px: 3 слайда в ряд, grid: 1 ряд, fill: 'row'
//  */
// export function initializeNewsSwiperTabletDesktop() {
//   const tabletDesktopSwiper = new Swiper('.news__swiper', {
//     modules: [Navigation, Pagination, Grid],
//     direction: 'horizontal',
//     spaceBetween: 20,
//     breakpoints: {
//       768: {
//         slidesPerView: 2,
//         slidesPerGroup: 2,
//         grid: {
//           rows: 2,
//           fill: 'row',
//         },
//       },
//       1440: {
//         slidesPerView: 3,
//         slidesPerGroup: 3,
//         grid: {
//           rows: 1,
//           fill: 'row',
//         },
//       },
//     },
//     pagination: {
//       el: '.news__swiper-pagination.swiper-pagination',
//       clickable: true,
//     },
//     navigation: {
//       nextEl: '.news__swiper-button.swiper-button-next',
//       prevEl: '.news__swiper-button.swiper-button-prev',
//     },
//   });

//   // Обновление свайпера при изменении размеров окна
//   window.addEventListener('resize', () => {
//     tabletDesktopSwiper.update();
//   });
// }


