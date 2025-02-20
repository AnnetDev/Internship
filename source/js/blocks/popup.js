export function popupValidator() {
  const form = document.querySelector('.popup__form');
  if (!form) {
    throw new Error('Форма не найдена на странице.');
  }
  const nameField = form.querySelector('.popup__input-name');
  const phoneField = form.querySelector('.popup__input-phone');
  // Кастомный инпут для выбора города
  const cityInput = form.querySelector('.popup__dropdown-button');

  // Функции для установки/снятия ошибок
  const setError = (element, message) => {
    element.setCustomValidity(message);
    element.classList.add('popup__error');
  };

  const clearError = (element) => {
    element.setCustomValidity('');
    element.classList.remove('popup__error');
  };

  // Валидация имени
  nameField.addEventListener('input', () => {
    const nameValue = nameField.value.trim();
    const validCharacters = /^[A-Za-zА-ЯЁа-яё\s]+$/.test(nameValue);
    const hasEnoughLetters = nameValue.replace(/\s/g, '').length >= 2;

    if (validCharacters && hasEnoughLetters) {
      clearError(nameField);
    } else {
      setError(nameField, 'Имя должно содержать не менее 2 букв и только буквы и пробелы');
    }
  });

  // Валидация телефона
  phoneField.addEventListener('input', () => {
    let value = phoneField.value;
    value = value.replace(/[A-Za-zА-Яа-яЁё]/g, '');
    if (!value.startsWith('+7')) {
      value = `+7${value.replace(/^\+/, '')}`;
    }
    phoneField.value = value;

    const digits = value.replace(/\D/g, '');
    if (value.startsWith('+7') && digits.length === 11) {
      clearError(phoneField);
    } else {
      setError(phoneField, 'Введите корректный номер телефона в формате +7XXXXXXXXXX');
    }
  });

  // Валидация при отправке формы
  form.addEventListener('submit', (event) => {
    let isValid = true;

    // Сбросим кастомные сообщения перед проверкой
    nameField.setCustomValidity('');
    phoneField.setCustomValidity('');
    cityInput.setCustomValidity('');

    const nameValue = nameField.value.trim();
    const phoneValue = phoneField.value.trim();
    // Проверяем выбран ли город через data-атрибут (если значение не установлено, значит, город не выбран)
    if (!cityInput.dataset.cityValue) {
      setError(cityInput, 'Выберите город');
      isValid = false;
    } else {
      clearError(cityInput);
    }

    // Проверка имени
    if (!/^[A-Za-zА-ЯЁа-яё\s]+$/.test(nameValue)) {
      setError(nameField, 'Имя может содержать только буквы и пробелы');
      isValid = false;
    }
    if (nameValue.replace(/\s/g, '').length < 2) {
      setError(nameField, 'Имя должно содержать не менее 2 букв');
      isValid = false;
    }

    // Проверка телефона
    const digits = phoneValue.replace(/\D/g, '');
    if (!phoneValue.startsWith('+7') || digits.length !== 11) {
      setError(phoneField, 'Введите корректный номер телефона в формате +7XXXXXXXXXX');
      isValid = false;
    }

    // Если форма невалидна, предотвращаем отправку и показываем сообщения об ошибках
    if (!isValid) {
      event.preventDefault();
      nameField.reportValidity();
      phoneField.reportValidity();
      cityInput.reportValidity();
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

export const toggleDropdown = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown');
    const button = dropdown.querySelector('.dropdown__button'); // input с классом popup__dropdown-button
    const items = dropdown.querySelectorAll('.dropdown__item');
    const form = document.querySelector('.popup__form');

    // Функция для переключения состояния выпадающего списка
    const toggle = (event) => {
      event.stopPropagation();
      dropdown.classList.toggle('open');
      button.classList.toggle('open');
      button.setAttribute('aria-expanded', dropdown.classList.contains('open'));
      if (dropdown.classList.contains('open')) {
        // Фокус на первый элемент списка при открытии
        const firstItem = items[0];
        firstItem?.focus();
      }
    };

    // Обработчик клика на input
    button.addEventListener('click', toggle);

    // Обработчик нажатия Enter на input
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        toggle(event);
      }
    });

    // Настройка элементов списка
    items.forEach((item) => {
      item.setAttribute('tabindex', '0'); // Делаем элемент доступным для фокуса

      // Функция выбора элемента
      const selectItem = (event) => {
        event.stopPropagation();
        const value = item.getAttribute('data-value');

        if (!value || value === '') {
          // Если выбрана пустая опция, очищаем значение и устанавливаем placeholder
          button.value = '';
          button.placeholder = 'Выберите город';
          button.dataset.cityValue = ''; // очищаем data-атрибут
        } else {
          // При выборе устанавливаем в input значение и data-атрибут, который затем проверяется валидатором
          button.value = item.textContent.trim();
          button.dataset.cityValue = value;
        }
        dropdown.classList.remove('open');
        button.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      };

      // Выбор кликом
      item.addEventListener('click', selectItem);

      // Выбор клавишей Enter
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          selectItem(event);
          // После выбора можно вернуть фокус на input
          button.focus();
        }
      });
    });

    // Закрытие выпадающего списка при клике вне его области
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        button.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      }
    });

    // Проверка формы перед отправкой:
    // Если значение input пустое, блокируем отправку
    if (form) {
      form.addEventListener('submit', (e) => {
        if (!button.value || button.value.trim() === '') {
          e.preventDefault();
          button.focus();
        }
      });
    }
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
