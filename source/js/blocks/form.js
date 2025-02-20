export function formValidator() {
  const form = document.querySelector('.form__page-form');
  if (!form) {
    throw new Error('Форма не найдена на странице.');
  }
  const name = document.querySelector('.form__page-input-name');
  const phone = document.querySelector('.form__page-input-phone');

  // Добавление и удаление класса ошибки
  const setError = (element, message) => {
    element.setCustomValidity(message);
    element.classList.add('form__page-input--error');
  };

  const clearError = (element) => {
    element.setCustomValidity('');
    element.classList.remove('form__page-input--error');
  };

  // Валидация имени
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

  // Валидация телефона
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

  // Валидация при отправке формы
  form.addEventListener('submit', (event) => {
    let isValid = true;

    // Проверяем поля вручную
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

    // Если невалидно, предотвращаем отправку
    if (!isValid) {
      event.preventDefault();
    }

    // Для стандартной браузерной проверки, чтобы синхронизироваться
    if (!form.checkValidity()) {
      event.preventDefault();
      const invalidFields = form.querySelectorAll(':invalid');
      invalidFields.forEach((field) => field.classList.add('form__page-input--error'));
    }
  });
}

export const toggleFormDropdown = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form__page-form');
    const dropdown = document.querySelector('.form__page-dropdown');
    const button = dropdown.querySelector('.form__page-dropdown-button');
    const items = dropdown.querySelectorAll('.form__page-dropdown-item');
    const label = form.querySelector('.form__page-label-dropdown');
    const hiddenCityInput = document.getElementById('form-city-input');

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
          button.innerHTML = '<span class="visually-hidden">Выберите город</span>';
          hiddenCityInput.value = '';
          hiddenCityInput.classList.add('form__page-input--error');
        } else {
          button.textContent = item.textContent;
          hiddenCityInput.value = value;
          hiddenCityInput.classList.remove('form__page-input--error');
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
