// export const toggleMenu = () => {
//   document.addEventListener('DOMContentLoaded', () => {
//     const menuToggle = document.querySelector('.hero__header-toggle');
//     const navigation = document.querySelector('.hero__header-nav');
//     const toggleIcon = document.querySelector('.hero__header-toggle-icon');
//     // const menuLinks = document.querySelectorAll('.hero__header-link');
//     const menuLinkPrograms = document.querySelector('.hero__header-link-programs');
//     const menuLinkNews = document.querySelector('.hero__header-link-news');
//     const header = document.querySelector('.hero__header');
//     const menu = document.querySelector('.hero__menu-wrapper');
//     const heading = document.querySelector('.hero__header-heading');
//     const sublistPrograms = menuLinkPrograms.nextElementSibling;
//     const sublistNews = menuLinkNews.nextElementSibling;
//     const body = document.querySelector('.page-body');
//     const logo = header.querySelector('.hero__header-logo');


//     // Открытие/закрытие главного меню
//     menu.addEventListener('click', (event) => {
//       event.stopPropagation();
//       navigation.classList.toggle('hero__header-nav--opened');
//       menuToggle.classList.toggle('hero__header-toggle--opened');
//       toggleIcon.classList.toggle('hero__header-toggle-icon--opened');
//       menu.classList.toggle('hero__menu-wrapper--opened');
//       heading.classList.toggle('hero__header-heading--opened');
//       body.classList.toggle('overlay-active');
//       logo.classList.toggle('hero__header-logo--opened');
//     });

//     menuToggle.addEventListener('click', (event) => {
//       event.stopPropagation();
//       navigation.classList.toggle('hero__header-nav--opened');
//       menuToggle.classList.toggle('hero__header-toggle--opened');
//       toggleIcon.classList.toggle('hero__header-toggle-icon--opened');
//       menu.classList.toggle('hero__menu-wrapper--opened');
//       heading.classList.toggle('hero__header-heading--opened');
//       body.classList.toggle('overlay-active');
//       logo.classList.toggle('hero__header-logo--opened');

//     });

//     // Закрытие меню при клике вне него
//     document.addEventListener('click', (event) => {
//       if (!header.contains(event.target)) {
//         navigation.classList.remove('hero__header-nav--opened');
//         menuToggle.classList.remove('hero__header-toggle--opened');
//         toggleIcon.classList.remove('hero__header-toggle-icon--opened');
//         menu.classList.remove('hero__menu-wrapper--opened');
//         heading.classList.remove('hero__header-heading--opened');
//         body.classList.remove('overlay-active');
//         logo.classList.remove('hero__header-logo--opened');
//       }
//     });

//     // Открытие подменю 'Программы'
//     menuLinkPrograms.addEventListener('click', (event) => {
//       event.stopPropagation();
//       sublistPrograms.classList.toggle('hero__header-sublist--opened');
//       menuLinkPrograms.classList.toggle('hero__header-link-programs--opened');
//     });

//     // Открытие подменю 'Новости'
//     menuLinkNews.addEventListener('click', (event) => {
//       event.stopPropagation();
//       sublistNews.classList.toggle('hero__header-sublist--opened');
//       menuLinkNews.classList.toggle('hero__header-link-news--opened');
//     });

//     // Закрытие меню при клике на обычные ссылки, но не на ссылки с подменю??
//     // menuLinks.forEach((link) => {
//     //   link.addEventListener('click', () => {
//     //     if (!link.classList.contains('hero__header-link-programs') &&
//     //       !link.classList.contains('hero__header-link-news')) {
//     //       navigation.classList.remove('hero__header-nav--opened');
//     //       menuToggle.classList.remove('hero__header-toggle--opened');
//     //       toggleIcon.classList.remove('hero__header-toggle-icon--opened');
//     //       menu.classList.remove('hero__menu-wrapper--opened');
//     //       heading.classList.remove('hero__header-heading--opened');
//     //       body.classList.remove('overlay-active');

//     //     }
//     //   });
//     // });
//   });
// };

export const toggleMenu = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.hero__header-toggle');
    const navigation = document.querySelector('.hero__header-nav');
    const toggleIcon = document.querySelector('.hero__header-toggle-icon');
    // const menuLinks = document.querySelectorAll('.hero__header-link');
    const menuLinkPrograms = document.querySelector('.hero__header-link-programs');
    const menuLinkNews = document.querySelector('.hero__header-link-news');
    const header = document.querySelector('.hero__header');
    const menu = document.querySelector('.hero__menu-wrapper');
    const heading = document.querySelector('.hero__header-heading');
    const sublistPrograms = menuLinkPrograms.nextElementSibling;
    const sublistNews = menuLinkNews.nextElementSibling;
    const body = document.querySelector('.page-body');
    const logo = header.querySelector('.hero__header-logo');

    // Функция обновления tabindex для элементов меню и подменю
    function updateMenuTabIndices() {
      const isMenuOpen = navigation.classList.contains('hero__header-nav--opened');

      // Для всех ссылок внутри главного меню
      const mainLinks = navigation.querySelectorAll('a');
      mainLinks.forEach((link) => {
        if (!isMenuOpen) {
          link.setAttribute('tabindex', '-1');
        } else {
          link.removeAttribute('tabindex');
        }
      });

      // Для ссылок подменю
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

    // Изначально — меню закрыто, скрываем фокус для внутренних элементов
    updateMenuTabIndices();

    // Функция переключения меню
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

    // Открытие/закрытие меню по клику на область меню или на кнопку
    menu.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMenuState();
    });

    menuToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMenuState();
    });

    // Закрытие меню при клике вне его
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

    // Открытие/закрытие подменю "Программы"
    menuLinkPrograms.addEventListener('click', (event) => {
      event.stopPropagation();
      sublistPrograms.classList.toggle('hero__header-sublist--opened');
      menuLinkPrograms.classList.toggle('hero__header-link-programs--opened');
      updateMenuTabIndices();
    });

    // Открытие/закрытие подменю "Новости"
    menuLinkNews.addEventListener('click', (event) => {
      event.stopPropagation();
      sublistNews.classList.toggle('hero__header-sublist--opened');
      menuLinkNews.classList.toggle('hero__header-link-news--opened');
      updateMenuTabIndices();
    });

    // При нажатии клавиши Enter на кнопке меню (button уже реагирует на Enter по умолчанию)
    // поэтому отдельный обработчик не обязателен.
  });
};
