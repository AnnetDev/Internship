export const toggleAccordion = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const listElements = document.querySelectorAll('.faq__list-item');
    const buttons = document.querySelectorAll('.faq__button');
    buttons.forEach((button) => {
      button.setAttribute('tabindex', '-1');
    });


    listElements.forEach((listElement) => {
      const question = listElement.querySelector('.faq__header');
      const questionButton = listElement.querySelector('.faq__button');

      const toggleItem = () => {
        listElement.classList.toggle('faq__list-item--active');
        questionButton.classList.toggle('faq__button--active');
        const isExpanded = questionButton.classList.contains('faq__button--active');
        questionButton.setAttribute('aria-expanded', isExpanded);
      };

      question.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleItem();
      });

      questionButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleItem();
      });

      question.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          toggleItem();
        }
      });
    });
  });
};
