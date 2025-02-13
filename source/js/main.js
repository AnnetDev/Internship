// https://swiperjs.com/get-started#installation
// import Swiper from "swiper";
// import {Navigation, Pagination} from "swiper/modules";
// import 'swiper/css';

import { toggleMenu } from './blocks/burger-menu';
import { initializeHeroSwiper } from './blocks/swiper-hero';
import { togglePopup, popupValidator, toggleDropdown } from './blocks/popup';
import { initializeProgramsSwiper } from './blocks/swiper-programs';
import { toggleAccordion } from './blocks/faq';
import { initializeReviewsSwiper } from './blocks/swiper-reviews';
import { formValidator } from './blocks/form';
import { toggleFormDropdown } from './blocks/form';
import { initializeNewsSwiper } from './blocks/swiper-news';


toggleMenu();
initializeHeroSwiper();
togglePopup();
popupValidator();
toggleDropdown();
initializeProgramsSwiper();
toggleAccordion();
initializeReviewsSwiper();
formValidator();
toggleFormDropdown();
initializeNewsSwiper();
