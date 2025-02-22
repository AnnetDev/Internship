export function formValidator() {
  const form = document.querySelector('.form__page-form');
  if (!form) {
    throw new Error('Форма не найдена на странице.');
  }
  const name = document.querySelector('.form__page-input-name');
  const phone = document.querySelector('.form__page-input-phone');
  const cityInput = document.querySelector('.form__page-dropdown-button');
  const text = document.querySelector('.form__page-input-textarea');
  const checkbox = document.querySelector('.form__page-checkbox-input');

  const setError = (element, message) => {
    element.setCustomValidity(message);
    element.classList.add('form__page-input--error');
  };

  const clearError = (element) => {
    element.setCustomValidity('');
    element.classList.remove('form__page-input--error');
  };

  name.addEventListener('input', () => {
    const nameValue = name.value.trim();
    const validCharacters = /^[A-Za-zА-ЯЁа-яё\s]+$/.test(nameValue);
    const hasEnoughLetters = nameValue.replace(/\s/g, '').length >= 2;

    if (validCharacters && hasEnoughLetters) {
      clearError(name);
    } else {
      setError(name, 'Имя должно содержать не менее 2 букв и только буквы и пробелы');
    }
  });

  phone.addEventListener('input', () => {
    let value = phone.value;
    value = value.replace(/[A-Za-zА-Яа-яЁё]/g, '');
    if (!value.startsWith('+7')) {
      value = `+7${value.replace(/^\+/, '')}`;
    }
    phone.value = value;

    const digits = value.replace(/\D/g, '');
    if (value.startsWith('+7') && digits.length === 11) {
      clearError(phone);
    } else {
      setError(phone, 'Введите корректный номер телефона в формате +7XXXXXXXXXX');
    }
  });

  name.addEventListener('invalid', () => {
    name.classList.add('form__page-input--error');
  });

  phone.addEventListener('invalid', () => {
    phone.classList.add('form__page-input--error');
  });

  cityInput.addEventListener('invalid', () => {
    cityInput.classList.add('form__page-input--error');
  });

  text.addEventListener('invalid', () => {
    text.classList.add('form__page-input--error');
  });
  text.addEventListener('input', () => {
    const textValue = text.value.trim();
    if (textValue) {
      clearError(text);
    } else {
      setError(text, 'Сообщение не должно быть пустым');
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

    const nameValue = name.value.trim();
    if (!nameValue || nameValue.replace(/\s/g, '').length < 2) {
      name.classList.add('form__page-input--error');
      isValid = false;
    } else {
      name.classList.remove('form__page-input--error');
    }

    const phoneValue = phone.value.trim();
    const digits = phoneValue.replace(/\D/g, '');
    if (!phoneValue.startsWith('+7') || digits.length !== 11) {
      phone.classList.add('form__page-input--error');
      isValid = false;
    } else {
      phone.classList.remove('form__page-input--error');
    }

    if (!cityInput.dataset.cityValue) {
      cityInput.classList.add('form__page-input--error');
      setError(cityInput, 'Выберите город');
      isValid = false;
    } else {
      clearError(cityInput);
    }

    if (!isValid) {
      event.preventDefault();
    }

    if (!form.checkValidity()) {
      event.preventDefault();
      const invalidFields = form.querySelectorAll(':invalid');
      invalidFields.forEach((field) => field.classList.add('form__page-input--error'));
    }
  });
}


export const toggleFormDropdown = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.form__page-dropdown');
    const input = dropdown.querySelector('.form__page-dropdown-button');
    const items = dropdown.querySelectorAll('.form__page-dropdown-item');
    const label = document.querySelector('.form__page-label-dropdown');

    let focusedIndex = -1;

    const toggleDropdown = (isOpen) => {
      if (isOpen) {
        dropdown.classList.add('open');
        input.classList.add('open');
        label.classList.add('open');
        input.setAttribute('aria-expanded', 'true');
      } else {
        dropdown.classList.remove('open');
        input.classList.remove('open');
        label.classList.remove('open');
        input.setAttribute('aria-expanded', 'false');
        focusedIndex = -1;
      }
    };

    const selectItem = (item) => {
      const value = item.getAttribute('data-value');
      if (!value) {
        input.value = '';
        input.dataset.cityValue = '';
        input.classList.add('form__page-input--error');
      } else {
        input.value = item.textContent.trim();
        input.dataset.cityValue = value;
        input.classList.remove('form__page-input--error');
      }
      toggleDropdown(false);
    };

    input.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      toggleDropdown(!isOpen);
    });

    const cityInput = document.querySelector('.form__page-dropdown-button');

    cityInput.addEventListener('keydown', (event) => {
      event.preventDefault();
    });


    input.addEventListener('keydown', (event) => {
      const isOpen = dropdown.classList.contains('open');
      switch (event.key) {
        case 'Enter':
          if (!isOpen) {
            toggleDropdown(true);
          } else if (focusedIndex >= 0 && focusedIndex < items.length) {
            selectItem(items[focusedIndex]);
          }
          event.preventDefault();
          break;
        case 'ArrowDown':
          if (!isOpen) {
            toggleDropdown(true);
          } else {
            focusedIndex = (focusedIndex + 1) % items.length;
            items[focusedIndex].focus();
          }
          event.preventDefault();
          break;
        case 'ArrowUp':
          if (isOpen) {
            focusedIndex = (focusedIndex - 1 + items.length) % items.length;
            items[focusedIndex].focus();
          }
          event.preventDefault();
          break;
        case 'Escape':
          if (isOpen) {
            toggleDropdown(false);
            event.preventDefault();
          }
          break;
        default:
          break;
      }
    });

    items.forEach((item, index) => {
      item.setAttribute('tabindex', '0');
      item.addEventListener('click', (event) => {
        event.stopPropagation();
        selectItem(item);
      });
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          selectItem(item);
          event.preventDefault();
        }
      });
      item.addEventListener('focus', () => {
        focusedIndex = index;
      });
    });

    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) {
        toggleDropdown(false);
      }
    });
  });
};
