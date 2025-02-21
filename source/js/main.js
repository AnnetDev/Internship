import { toggleMenu } from './blocks/burger-menu';
import { initializeHeroSwiper } from './blocks/swiper-hero';
import { togglePopup, popupValidator, toggleDropdown, toggleCheckbox } from './blocks/popup';
import { initializeProgramsSwiper } from './blocks/swiper-programs';
import { toggleAccordion } from './blocks/faq';
import { initializeReviewsSwiper } from './blocks/swiper-reviews';
import { formValidator } from './blocks/form';
import { toggleFormDropdown } from './blocks/form';
import { initializeNewsSwiper, toggleTabs } from './blocks/swiper-news';

toggleMenu();
initializeHeroSwiper();
togglePopup();
toggleCheckbox();
popupValidator();
toggleDropdown();
initializeProgramsSwiper();
toggleAccordion();
initializeReviewsSwiper();
formValidator();
toggleFormDropdown();
initializeNewsSwiper();
toggleTabs();


let newsSwiper = initializeNewsSwiper();
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (newsSwiper && typeof newsSwiper.destroy === 'function') {
      newsSwiper.destroy(true, true);
    }
    newsSwiper = initializeNewsSwiper();
  }, 1);
});
