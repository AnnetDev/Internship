export function popupValidator() {
  const form = document.querySelector('.popup__form');
  if (!form) {
    throw new Error('Форма не найдена на странице.');
  }
  const nameField = document.querySelector('input[name="name"]');
  const phoneField = document.querySelector('input[name="phone"]');
  const cityInput = document.querySelector('#city-input');
  const dropdown = document.querySelector('.popup__dropdown');

  nameField.addEventListener('input', () => {
    const nameValue = nameField.value.trim();
    const validCharacters = /^[A-Za-zА-ЯЁа-яё\s]+$/.test(nameValue);
    const hasEnoughLetters = nameValue.replace(/\s/g, '').length >= 2;

    if (validCharacters && hasEnoughLetters) {
      nameField.setCustomValidity('');
      nameField.classList.remove('popup__error');
    } else {
      nameField.setCustomValidity('Имя должно содержать не менее 2 букв и только буквы и пробелы');
      nameField.classList.add('popup__error');
    }
  });

  // Обработчик ввода для поля "Телефон"
  phoneField.addEventListener('input', () => {
    let value = phoneField.value;
    value = value.replace(/[A-Za-zА-Яа-яЁё]/g, ''); // Удаляем буквы (латиница и кириллица)
    if (!value.startsWith('+7')) {
      value = `+7${value.replace(/^\+/, '')}`;
    }
    phoneField.value = value;

    const digits = value.replace(/\D/g, '');
    if (value.startsWith('+7') && digits.length === 11) {
      phoneField.setCustomValidity('');
      phoneField.classList.remove('popup__error');
    } else {
      phoneField.setCustomValidity('Введите корректный номер телефона в формате +7XXXXXXXXXX');
      phoneField.classList.add('popup__error');
    }
  });

  // Обработчик для изменения выбора города
  dropdown.addEventListener('click', () => {
    const selectedCity = cityInput.value;
    if (selectedCity !== '-') {
      dropdown.classList.remove('popup__error');
    } else {
      dropdown.classList.add('popup__error');
    }
  });

  form.addEventListener('submit', (event) => {
    let isValid = true;

    nameField.setCustomValidity('');
    phoneField.setCustomValidity('');
    cityInput.setCustomValidity('');

    const nameValue = nameField.value.trim();
    const phoneValue = phoneField.value.trim();
    const cityValue = cityInput.value;

    if (!/^[A-Za-zА-ЯЁа-яё\s]+$/.test(nameValue)) {
      nameField.setCustomValidity('Имя может содержать только буквы и пробелы');
      nameField.classList.add('popup__error');
      isValid = false;
    }
    if (nameValue.replace(/\s/g, '').length < 2) {
      nameField.setCustomValidity('Имя должно содержать не менее 2 букв');
      nameField.classList.add('popup__error');
      isValid = false;
    }

    const digits = phoneValue.replace(/\D/g, '');
    if (!phoneValue.startsWith('+7') || digits.length !== 11) {
      phoneField.setCustomValidity('Введите корректный номер телефона в формате +7XXXXXXXXXX');
      phoneField.classList.add('popup__error');
      isValid = false;
    }

    if (cityValue === '-') {
      cityInput.setCustomValidity('Пожалуйста, выберите город');
      dropdown.classList.add('popup__error'); // Добавляем класс ошибки к выбору города
      isValid = false;
    }

    // Если есть ошибки, предотвращаем отправку
    if (!isValid) {
      // Вызываем reportValidity(), чтобы отобразить сообщение об ошибке
      nameField.reportValidity();
      phoneField.reportValidity();
      cityInput.reportValidity();
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
    const form = popup.querySelector('.popup__form');
    const hiddenCityInput = document.getElementById('city-input');
    const dropdownButton = document.querySelector('.dropdown__button');

    popupOpener.addEventListener('click', (event) => {
      event.stopPropagation();
      popup.classList.toggle('popup--opened');
      body.classList.toggle('overlay-active-popup');

    });

    popupCloser.addEventListener('click', (event) => {
      event.stopPropagation();
      popup.classList.remove('popup--opened');
      body.classList.remove('overlay-active-popup');

      // Сброс формы и кастомных элементов при закрытии
      form.reset();
      if (dropdownButton && hiddenCityInput) {
        dropdownButton.innerHTML = '<span class="visually-hidden">Выберите город</span>';
        hiddenCityInput.value = '';
      }
    });

    document.addEventListener('click', (event) => {
      if (!popup.contains(event.target)) {
        popup.classList.remove('popup--opened');
        body.classList.remove('overlay-active-popup');

        // Сброс формы и кастомных элементов при закрытии
        form.reset();
        if (dropdownButton && hiddenCityInput) {
          dropdownButton.innerHTML = '<span class="visually-hidden">Выберите город</span>';
          hiddenCityInput.value = '';
        }
      }
    });
  });
};

// export const toggleDropdown = () => {
//   document.addEventListener('DOMContentLoaded', () => {
//     const form = document.querySelector('.popup__form');
//     const dropdown = document.querySelector('.dropdown');
//     const button = dropdown.querySelector('.dropdown__button');
//     const items = dropdown.querySelectorAll('.dropdown__item');
//     const label = form.querySelector('.popup__label-dropdown');

//     // Получаем скрытый input по id
//     const hiddenCityInput = document.getElementById('city-input');

//     button.innerHTML = '<span class="visually-hidden">Выберите город</span>';

//     button.addEventListener('click', (event) => {
//       event.stopPropagation();
//       dropdown.classList.toggle('open');
//       button.classList.toggle('open');
//       label.classList.toggle('open');
//       button.setAttribute('aria-expanded', dropdown.classList.contains('open'));
//     });

//     items.forEach((item) => {
//       item.addEventListener('click', (event) => {
//         event.stopPropagation();
//         const value = item.getAttribute('data-value');
//         if (!value) {
//           // Если выбрана первая опция или значение отсутствует, отображаем placeholder и очищаем скрытое поле
//           button.innerHTML = '<span class="visually-hidden">Выберите город</span>';
//           hiddenCityInput.value = '';
//         } else {
//           // Отображаем текст выбранного города и сохраняем значение в скрытом поле
//           button.textContent = item.textContent;
//           hiddenCityInput.value = value;
//         }
//         dropdown.classList.remove('open');
//         button.setAttribute('aria-expanded', 'false');
//       });
//     });

//     document.addEventListener('click', (e) => {
//       if (!dropdown.contains(e.target)) {
//         dropdown.classList.remove('open');
//         button.setAttribute('aria-expanded', 'false');
//       }
//     });
//   });
// };

export const toggleDropdown = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown');
    const button = dropdown.querySelector('.dropdown__button');
    const items = dropdown.querySelectorAll('.dropdown__item');
    const hiddenCityInput = document.getElementById('city-input');
    // const form = document.querySelector('.popup__form');

    // Устанавливаем изначальное значение кнопки
    button.innerHTML = '<span class="visually-hidden">Выберите город</span>';

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      dropdown.classList.toggle('open');
      button.classList.toggle('open');
      button.setAttribute('aria-expanded', dropdown.classList.contains('open'));

      if (dropdown.classList.contains('open')) {
        // Фокусируемся на первом элементе списка, если он открыт
        const firstItem = items[0];
        firstItem?.focus();
      }
    });

    items.forEach((item) => {
      item.setAttribute('tabindex', '0'); // Делаем элементы списка доступными для фокуса
      item.addEventListener('click', (event) => {
        event.stopPropagation();
        const value = item.getAttribute('data-value');

        if (!value) {
          // Сбрасываем выбор, если выбрана пустая опция
          button.innerHTML = '<span class="visually-hidden">Выберите город</span>';
          hiddenCityInput.value = '';
        } else {
          button.textContent = item.textContent;
          hiddenCityInput.value = value;
        }
        dropdown.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      });

      // Обрабатываем выбор через клавишу Enter
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          const value = item.getAttribute('data-value');
          button.textContent = item.textContent;
          hiddenCityInput.value = value;

          dropdown.classList.remove('open');
          button.setAttribute('aria-expanded', 'false');
        }
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

export const toggleCheckbox = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.popup__checkbox-input');

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          checkbox.checked = !checkbox.checked; // Переключаем состояние
        }
      });
    });
  });
};
