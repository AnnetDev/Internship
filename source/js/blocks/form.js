export function formValidator() {
  const form = document.querySelector('.form__page-form');
  if (!form) {
    throw new Error('Форма не найдена на странице.');
  }
  const name = document.querySelector('input[name="form-name"]');
  const phone = document.querySelector('input[name="form-phone"]');
  // const text = document.querySelector('input[name="form-text"]');

  name.addEventListener('input', () => {
    const nameValue = name.value.trim();
    const validCharacters = /^[A-Za-zА-ЯЁа-яё\s]+$/.test(nameValue);
    const hasEnoughLetters = nameValue.replace(/\s/g, '').length >= 2;

    if (validCharacters && hasEnoughLetters) {
      name.setCustomValidity('');
    } else {
      name.setCustomValidity('Имя должно содержать не менее 2 букв и только буквы и пробелы');
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
      phone.setCustomValidity('');
    } else {
      phone.setCustomValidity('Введите корректный номер телефона в формате +7XXXXXXXXXX');
    }
  });

  form.addEventListener('submit', (event) => {
    let isValid = true;

    name.setCustomValidity('');
    phone.setCustomValidity('');

    const nameValue = name.value.trim();
    const phoneValue = phone.value.trim();

    if (!/^[A-Za-zА-ЯЁа-яё\s]+$/.test(nameValue)) {
      name.setCustomValidity('Имя может содержать только буквы и пробелы');
      isValid = false;
    }
    if (nameValue.replace(/\s/g, '').length < 2) {
      name.setCustomValidity('Имя должно содержать не менее 2 букв');
      isValid = false;
    }

    const digits = phoneValue.replace(/\D/g, '');
    if (!phoneValue.startsWith('+7') || digits.length !== 11) {
      phone.setCustomValidity('Введите корректный номер телефона в формате +7XXXXXXXXXX');
      isValid = false;
    }

    if (!isValid) {
      name.reportValidity();
      phone.reportValidity();
      event.preventDefault();
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
    // Получаем скрытый input по id
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
