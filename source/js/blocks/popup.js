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

    popupOpener.addEventListener('click', (event) => {
      event.stopPropagation();
      popup.classList.toggle('popup--opened');
    });

    popupCloser.addEventListener('click', (event) => {
      event.stopPropagation();
      popup.classList.remove('popup--opened');
    });

    document.addEventListener('click', (event) => {
      if (!popup.contains(event.target)) {
        popup.classList.remove('popup--opened');
      }
    });

  });

};
