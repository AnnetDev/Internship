export const toggleMenu = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.hero__header-toggle');
    const navigation = document.querySelector('.hero__header-nav');
    const toggleIcon = document.querySelector('.hero__header-toggle-icon');
    const menuLinkPrograms = document.querySelector('.hero__header-link-programs');
    const menuLinkNews = document.querySelector('.hero__header-link-news');
    const header = document.querySelector('.hero__header');
    const menu = document.querySelector('.hero__menu-wrapper');
    const heading = document.querySelector('.hero__header-heading');
    const sublistPrograms = menuLinkPrograms.nextElementSibling;
    const sublistNews = menuLinkNews.nextElementSibling;
    const body = document.querySelector('.page-body');
    const logo = header.querySelector('.hero__header-logo');
    const menuLinks = navigation.querySelectorAll('a');
    const translate = header.querySelector('.hero__header-translate');
    const translateIcon = header.querySelector('.hero__header-translate-logo');


    function updateMenuTabIndices() {
      const isMenuOpen = navigation.classList.contains('hero__header-nav--opened');
      const focusableElements = navigation.querySelectorAll('a, button');

      focusableElements.forEach((element) => {
        if (!isMenuOpen) {
          element.setAttribute('tabindex', '-1');
        } else {
          element.removeAttribute('tabindex');
        }
      });

      const submenus = navigation.querySelectorAll('.hero__header-sublist');
      submenus.forEach((submenu) => {
        const isSubmenuOpen = submenu.classList.contains('hero__header-sublist--opened');
        const subFocusable = submenu.querySelectorAll('a, button');
        subFocusable.forEach((element) => {
          if (!isSubmenuOpen) {
            element.setAttribute('tabindex', '-1');
          } else {
            element.removeAttribute('tabindex');
          }
        });
      });
    }


    updateMenuTabIndices();

    const toggleMenuState = () => {
      navigation.classList.toggle('hero__header-nav--opened');
      menuToggle.classList.toggle('hero__header-toggle--opened');
      toggleIcon.classList.toggle('hero__header-toggle-icon--opened');
      menu.classList.toggle('hero__menu-wrapper--opened');
      heading.classList.toggle('hero__header-heading--opened');
      body.classList.toggle('overlay-active');
      logo.classList.toggle('hero__header-logo--opened');
      translate.classList.toggle('hero__header-translate--opened');
      translateIcon.classList.toggle('hero__header-translate-logo--opened');

      updateMenuTabIndices();
    };

    const closeMenu = () => {
      navigation.classList.remove('hero__header-nav--opened');
      menuToggle.classList.remove('hero__header-toggle--opened');
      toggleIcon.classList.remove('hero__header-toggle-icon--opened');
      menu.classList.remove('hero__menu-wrapper--opened');
      heading.classList.remove('hero__header-heading--opened');
      body.classList.remove('overlay-active');
      logo.classList.remove('hero__header-logo--opened');
      translate.classList.remove('hero__header-translate--opened');
      translateIcon.classList.remove('hero__header-translate-logo--opened');
      updateMenuTabIndices();
    };

    menu.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMenuState();
    });

    menuToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMenuState();
    });

    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) {
        closeMenu();
      }
    });

    menuLinkPrograms.addEventListener('click', (event) => {
      event.stopPropagation();
      sublistPrograms.classList.toggle('hero__header-sublist--opened');
      menuLinkPrograms.classList.toggle('hero__header-link-programs--opened');
      updateMenuTabIndices();
    });

    menuLinkNews.addEventListener('click', (event) => {
      event.stopPropagation();
      sublistNews.classList.toggle('hero__header-sublist--opened');
      menuLinkNews.classList.toggle('hero__header-link-news--opened');
      updateMenuTabIndices();
    });

    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
      link.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          closeMenu();
        }
      });
    });
  });
};
