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

    function updateMenuTabIndices() {
      const isMenuOpen = navigation.classList.contains('hero__header-nav--opened');

      const mainLinks = navigation.querySelectorAll('a');
      mainLinks.forEach((link) => {
        if (!isMenuOpen) {
          link.setAttribute('tabindex', '-1');
        } else {
          link.removeAttribute('tabindex');
        }
      });

      const submenus = navigation.querySelectorAll('.hero__header-sublist');
      submenus.forEach((submenu) => {
        const isSubmenuOpen = submenu.classList.contains('hero__header-sublist--opened');
        const subLinks = submenu.querySelectorAll('a');
        subLinks.forEach((link) => {
          if (!isSubmenuOpen) {
            link.setAttribute('tabindex', '-1');
          } else {
            link.removeAttribute('tabindex');
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
        navigation.classList.remove('hero__header-nav--opened');
        menuToggle.classList.remove('hero__header-toggle--opened');
        toggleIcon.classList.remove('hero__header-toggle-icon--opened');
        menu.classList.remove('hero__menu-wrapper--opened');
        heading.classList.remove('hero__header-heading--opened');
        body.classList.remove('overlay-active');
        logo.classList.remove('hero__header-logo--opened');
        updateMenuTabIndices();
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
  });
};
