import Swiper from 'swiper';
import { Navigation, Pagination, Grid } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/grid';

export function initializeNewsSwiper() {
  const newsSwiper = new Swiper('.news__swiper', {
    modules: [Navigation, Pagination, Grid],
    direction: 'horizontal',
    spaceBetween: 20,
    slidesPerView: 1,
    slidesPerGroup: 1,
    grid: {
      rows: 2,
      fill: 'column',
    },
    pagination: {
      el: '.news__swiper-pagination.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.news__swiper-button.swiper-button-next',
      prevEl: '.news__swiper-button.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: {
          rows: 2,
          fill: 'row',
        },
      },
      1440: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          rows: 1,
          fill: 'row',
        },
      },
    },
  });

  window.addEventListener('resize', newsSwiper);

}
