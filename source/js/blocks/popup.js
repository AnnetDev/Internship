export function popupValidator() {
  const form = document.querySelector('.popup__form');
  if (!form) {
    throw new Error('Форма не найдена на странице.');
  }
  const name = document.querySelector('input[name="name"]');
  const phone = document.querySelector('input[name="phone"]');

  form.addEventListener('submit', (event) => {
    let isValid = true;

    // Сбрасываем предыдущие ошибки
    name.setCustomValidity('');
    phone.setCustomValidity('');

    // const nameFormat = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    // if (!nameFormat.test(name.value.trim())) {
    //   name.setCustomValidity('Допускаются только буквы и пробелы');
    //   isValid = false;
    // }

    const phoneValue = phone.value.trim();
    if (!/^\+?\d{1,3}[\s-]?(\(\d{3}\)[\s-]?|\d{3}[\s-]?)?\d{3}[\s-]?\d{2,4}[\s-]?\d{0,4}$/.test(phoneValue) || phoneValue.match(/\D/)) {
      phone.setCustomValidity('Введите корректный номер телефона');
      isValid = false;
    }

    // Отображаем сообщение об ошибке
    name.reportValidity();
    phone.reportValidity();

    if (!isValid) {
      event.preventDefault();
    }
  });
}


export const togglePopup = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const popupOpener = document.querySelector('.about__link');
    const popup = document.querySelector('.popup');
    const popupCloser = document.querySelector('.popup__close');
    const body = document.querySelector('.page-body');

    popupOpener.addEventListener('click', (event) => {
      event.stopPropagation();
      popup.classList.toggle('popup--opened');
      body.classList.toggle('overlay-active');

    });

    popupCloser.addEventListener('click', (event) => {
      event.stopPropagation();
      popup.classList.remove('popup--opened');
      body.classList.remove('overlay-active');

    });

    document.addEventListener('click', (event) => {
      if (!popup.contains(event.target)) {
        popup.classList.remove('popup--opened');
        body.classList.remove('overlay-active');
      }
    });
  });
};

export const toggleDropdown = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown');
    const button = dropdown.querySelector('.dropdown__button');
    // const list = dropdown.querySelector('.dropdown__list');
    const items = dropdown.querySelectorAll('.dropdown__item');

    button.addEventListener('click', () => {
      dropdown.classList.toggle('open');
      button.setAttribute('aria-expanded', dropdown.classList.contains('open'));
    });

    items.forEach((item) => {
      item.addEventListener('click', () => {
        button.textContent = item.textContent;
        dropdown.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      }
    });
  });

};
