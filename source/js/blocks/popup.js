export function popupValidator() {
  const form = document.querySelector('.popup__form');
  if (!form) {
    throw new Error('Форма не найдена на странице.');
  }
  const nameField = document.querySelector('input[name="name"]');
  const phoneField = document.querySelector('input[name="phone"]');

  nameField.addEventListener('input', () => {
    const nameValue = nameField.value.trim();
    const validCharacters = /^[A-Za-zА-ЯЁа-яё\s]+$/.test(nameValue);
    const hasEnoughLetters = nameValue.replace(/\s/g, '').length >= 2;

    if (validCharacters && hasEnoughLetters) {
      nameField.setCustomValidity('');
    } else {
      nameField.setCustomValidity('Имя должно содержать не менее 2 букв и только буквы и пробелы');
    }
  });

  // Обработчик ввода для поля "Телефон"
  phoneField.addEventListener('input', () => {
    let value = phoneField.value;
    // Удаляем буквы (латиница и кириллица)
    value = value.replace(/[A-Za-zА-Яа-яЁё]/g, '');
    // Если значение не начинается с "+7", принудительно добавляем его
    if (!value.startsWith('+7')) {
      value = `+7${value.replace(/^\+/, '')}`;
    }
    phoneField.value = value;

    const digits = value.replace(/\D/g, '');
    if (value.startsWith('+7') && digits.length === 11) {
      phoneField.setCustomValidity('');
    } else {
      phoneField.setCustomValidity('Введите корректный номер телефона в формате +7XXXXXXXXXX');
    }
  });

  form.addEventListener('submit', (event) => {
    let isValid = true;

    nameField.setCustomValidity('');
    phoneField.setCustomValidity('');

    const nameValue = nameField.value.trim();
    const phoneValue = phoneField.value.trim();

    if (!/^[A-Za-zА-ЯЁа-яё\s]+$/.test(nameValue)) {
      nameField.setCustomValidity('Имя может содержать только буквы и пробелы');
      isValid = false;
    }
    if (nameValue.replace(/\s/g, '').length < 2) {
      nameField.setCustomValidity('Имя должно содержать не менее 2 букв');
      isValid = false;
    }

    const digits = phoneValue.replace(/\D/g, '');
    if (!phoneValue.startsWith('+7') || digits.length !== 11) {
      phoneField.setCustomValidity('Введите корректный номер телефона в формате +7XXXXXXXXXX');
      isValid = false;
    }

    // Если есть ошибки, предотвращаем отправку
    if (!isValid) {
      // Вызываем reportValidity(), чтобы отобразить сообщение об ошибке
      nameField.reportValidity();
      phoneField.reportValidity();
      event.preventDefault();
    }
  });
}
//сброс полей?

export const togglePopup = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const popupOpener = document.querySelector('.about__link');
    const popup = document.querySelector('.popup');
    const popupCloser = document.querySelector('.popup__close');
    const body = document.querySelector('.page-body');
    const form = popup.querySelector('.popup__form');

    popupOpener.addEventListener('click', (event) => {
      event.stopPropagation();
      popup.classList.toggle('popup--opened');
      body.classList.toggle('overlay-active');

    });

    popupCloser.addEventListener('click', (event) => {
      event.stopPropagation();
      popup.classList.remove('popup--opened');
      body.classList.remove('overlay-active');
      form.reset();

    });

    document.addEventListener('click', (event) => {
      if (!popup.contains(event.target)) {
        popup.classList.remove('popup--opened');
        body.classList.remove('overlay-active');
        form.reset();
      }
    });
  });
};

export const toggleDropdown = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.popup__form');
    const dropdown = document.querySelector('.dropdown');
    const button = dropdown.querySelector('.dropdown__button');
    const items = dropdown.querySelectorAll('.dropdown__item');
    const label = form.querySelector('.popup__label-dropdown');

    // Получаем скрытый input по id
    const hiddenCityInput = document.getElementById('city-input');

    button.innerHTML = '<span class="visually-hidden">Выберите город</span>';

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      dropdown.classList.toggle('open');
      button.classList.toggle('open');
      label.classList.toggle('open');
      button.setAttribute('aria-expanded', dropdown.classList.contains('open'));
    });

    items.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.stopPropagation();
        const value = item.getAttribute('data-value');
        if (!value) {
          // Если выбрана первая опция или значение отсутствует, отображаем placeholder и очищаем скрытое поле
          button.innerHTML = '<span class="visually-hidden">Выберите город</span>';
          hiddenCityInput.value = '';
        } else {
          // Отображаем текст выбранного города и сохраняем значение в скрытом поле
          button.textContent = item.textContent;
          hiddenCityInput.value = value;
        }
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

