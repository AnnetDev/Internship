import Swiper from 'swiper';
import { Navigation, Pagination, Grid } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/grid';

export function initializeNewsSwiper() {
  const newsSwiper = new Swiper('.news__swiper', {
    modules: [Navigation, Pagination, Grid],
    direction: 'horizontal',
    pagination: {
      el: '.news__swiper-pagination.swiper-pagination',
      clickable: true,
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
      beforeBreakpoint(swiper, breakpointParams) {
        if (swiper.params.grid && breakpointParams.grid &&
          swiper.params.grid.fill !== breakpointParams.grid.fill) {
          swiper.destroy(true, false);
          Object.assign(swiper.params, breakpointParams);
          swiper.init();
          swiper.update();
        }
      }
    }
  });

  window.addEventListener('resize', () => {
    newsSwiper.update();
  });

  // let resizeTimeout;
  // window.addEventListener('resize', () => {
  //   clearTimeout(resizeTimeout);
  //   resizeTimeout = setTimeout(() => {
  //     window.location.reload();
  //   }, 50);
  // }); //костыль


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
