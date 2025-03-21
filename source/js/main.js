import { toggleMenu } from './blocks/burger-menu';
import { initializeHeroSwiper, updatePaginationPosition } from './blocks/swiper-hero';
import { togglePopup, popupValidator, toggleDropdown, toggleCheckbox } from './blocks/popup';
import { initializeProgramsSwiper } from './blocks/swiper-programs';
import { toggleAccordion } from './blocks/faq';
import { initializeReviewsSwiper } from './blocks/swiper-reviews';
import { formValidator } from './blocks/form';
import { toggleFormDropdown } from './blocks/form';
import { initializeNewsSwiper, toggleTabs } from './blocks/swiper-news';
import { toggleLanguage, setInitialLanguage } from './blocks/translate-page';

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

document.querySelector('.language-switcher').addEventListener('click', () => {
  toggleLanguage();
  initializeHeroSwiper();
});

window.addEventListener('load', () => {
  setInitialLanguage();
  initializeHeroSwiper();
});
