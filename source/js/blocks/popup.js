export function popupValidator() {
  const form = document.querySelector('.popup__form');
  if (!form) {
    throw new Error('Форма не найдена на странице.');
  }
  const nameField = form.querySelector('.popup__input-name');
  const phoneField = form.querySelector('.popup__input-phone');
  const cityInput = form.querySelector('.popup__dropdown-button');
  const checkbox = form.querySelector('.popup__checkbox-input');

  const setError = (element, message) => {
    element.setCustomValidity(message);
    element.classList.add('popup__error');
  };

  const clearError = (element) => {
    element.setCustomValidity('');
    element.classList.remove('popup__error');
  };

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

  nameField.addEventListener('invalid', () => {
    nameField.classList.add('popup__error');
  });

  phoneField.addEventListener('invalid', () => {
    phoneField.classList.add('popup__error');
  });

  cityInput.addEventListener('invalid', () => {
    cityInput.classList.add('popup__error');
  });

  cityInput.addEventListener('input', () => {
    if (cityInput.dataset.cityValue) {
      clearError(cityInput);
    } else {
      setError(cityInput, 'Выберите город');
    }
  });


  checkbox.addEventListener('invalid', () => {
    checkbox.classList.add('checkbox-input--error');
  });

  checkbox.addEventListener('input', () => {
    if (checkbox.checked) {
      checkbox.setCustomValidity('');
      checkbox.classList.remove('checkbox-input--error');
    } else {
      checkbox.setCustomValidity('Необходимо ваше согласие');
      checkbox.classList.add('checkbox-input--error');
    }
  });


  form.addEventListener('submit', (event) => {
    let isValid = true;

    nameField.setCustomValidity('');
    phoneField.setCustomValidity('');
    cityInput.setCustomValidity('');

    const nameValue = nameField.value.trim();
    const phoneValue = phoneField.value.trim();

    if (!cityInput.dataset.cityValue) {
      cityInput.classList.add('popup__error');
      setError(cityInput, 'Выберите город');
      isValid = false;
    } else {
      clearError(cityInput);
    }

    if (!/^[A-Za-zА-ЯЁа-яё\s]+$/.test(nameValue)) {
      setError(nameField, 'Имя может содержать только буквы и пробелы');
      isValid = false;
    }
    if (nameValue.replace(/\s/g, '').length < 2) {
      setError(nameField, 'Имя должно содержать не менее 2 букв');
      isValid = false;
    }

    const digits = phoneValue.replace(/\D/g, '');
    if (!phoneValue.startsWith('+7') || digits.length !== 11) {
      setError(phoneField, 'Введите корректный номер телефона в формате +7XXXXXXXXXX');
      isValid = false;
    }

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

      form.reset();
      if (dropdownButton && hiddenCityInput) {
        dropdownButton.innerHTML = '<span class="visually-hidden">Выберите город</span>';
        hiddenCityInput.value = '';
      }
    });

    const cityInput = document.querySelector('.popup__dropdown-button');

    cityInput.addEventListener('keydown', (event) => {
      event.preventDefault();
    });

    document.addEventListener('click', (event) => {
      if (!popup.contains(event.target)) {
        popup.classList.remove('popup--opened');
        body.classList.remove('overlay-active-popup');

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
    const button = dropdown.querySelector('.dropdown__button');
    const items = dropdown.querySelectorAll('.dropdown__item');
    const form = document.querySelector('.popup__form');

    const toggle = (event) => {
      event.stopPropagation();
      dropdown.classList.toggle('open');
      button.classList.toggle('open');
      button.setAttribute('aria-expanded', dropdown.classList.contains('open'));
      if (dropdown.classList.contains('open')) {
        const firstItem = items[0];
        firstItem?.focus();
      }
    };

    button.addEventListener('click', toggle);

    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        toggle(event);
      }
    });

    items.forEach((item) => {
      item.setAttribute('tabindex', '0');

      const setError = (element, message) => {
        element.setCustomValidity(message);
        element.classList.add('popup__error');
      };

      const clearError = (element) => {
        element.setCustomValidity('');
        element.classList.remove('popup__error');
      };
      const selectItem = (event) => {
        event.stopPropagation();
        const value = item.getAttribute('data-value');

        if (!value) {
          button.value = '';
          button.dataset.cityValue = '';
          setError(button, 'Выберите город');
        } else {
          button.value = item.textContent.trim();
          button.dataset.cityValue = value;
          clearError(button);
        }

        dropdown.classList.remove('open');
        button.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      };


      item.addEventListener('click', selectItem);

      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          selectItem(event);
          button.focus();
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        button.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      }
    });

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
          checkbox.checked = !checkbox.checked;
        }
      });
    });
  });
};
