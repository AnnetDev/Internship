export const toggleMenu = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.hero__header-toggle');
    const navigation = document.querySelector('.hero__header-nav');
    const toggleIcon = document.querySelector('.hero__header-toggle-icon');
    const menuLinks = document.querySelectorAll('.hero__header-link');
    const header = document.querySelector('.hero__header');
    const menu = document.querySelector('.hero__menu-wrapper');
    const heading = document.querySelector('.hero__header-heading');

    // Открытие меню по клику на иконку
    menuToggle.addEventListener('click', (event) => {
      event.stopPropagation(); // Останавливаем всплытие, чтобы не закрыть меню, если клик был по иконке
      navigation.classList.toggle('hero__header-nav--opened');
      menuToggle.classList.toggle('hero__header-toggle--opened');
      toggleIcon.classList.toggle('hero__header-toggle-icon--opened');
      menu.classList.toggle('hero__menu-wrapper--opened');
      heading.classList.toggle('hero__header-heading--opened');
    });

    menu.addEventListener('click', (event) => {
      event.stopPropagation(); // Останавливаем всплытие, чтобы не закрыть меню, если клик был по иконке
      navigation.classList.toggle('hero__header-nav--opened');
      menuToggle.classList.toggle('hero__header-toggle--opened');
      toggleIcon.classList.toggle('hero__header-toggle-icon--opened');
      menu.classList.toggle('hero__menu-wrapper--opened');
      heading.classList.toggle('hero__header-heading--opened');
    });

    // Закрытие меню при клике на ссылку в меню
    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navigation.classList.remove('hero__header-nav--opened');
        menuToggle.classList.remove('hero__header-toggle--opened');
        toggleIcon.classList.remove('hero__header-toggle-icon--opened');
        menu.classList.remove('hero__menu-wrapper--opened');
        heading.classList.remove('hero__header-heading--opened');
      });
    });

    // Закрытие меню при клике вне меню
    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) {
        navigation.classList.remove('hero__header-nav--opened');
        menuToggle.classList.remove('hero__header-toggle--opened');
        toggleIcon.classList.remove('hero__header-toggle-icon--opened');
        menu.classList.remove('hero__menu-wrapper--opened');
        heading.classList.remove('hero__header-heading--opened');
      }
    });
  });
};
