// https://swiperjs.com/get-started#installation
// import Swiper from "swiper";
// import {Navigation, Pagination} from "swiper/modules";
// import 'swiper/css';

import { toggleMenu } from './blocks/burger-menu';
import { initializeHeroSwiper } from './blocks/swiper-hero';
import { togglePopup, popupValidator, toggleDropdown } from './blocks/popup';
import { initializeProgramsSwiper } from './blocks/swiper-programs';
import { toggleAccordion } from './blocks/faq';


toggleMenu();
initializeHeroSwiper();
togglePopup();
popupValidator();
toggleDropdown();
initializeProgramsSwiper();
toggleAccordion();
