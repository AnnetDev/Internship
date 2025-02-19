export const toggleAccordion = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const listElements = document.querySelectorAll('.faq__list-item');
    const buttons = document.querySelectorAll('.faq__button');
    buttons.forEach((button) => {
      button.setAttribute('tabindex', '-1');
    });


    listElements.forEach((listElement) => {
      const question = listElement.querySelector('.faq__header'); // Select the header of each item
      const questionButton = listElement.querySelector('.faq__button'); // Select the button of each item

      const toggleItem = () => {
        listElement.classList.toggle('faq__list-item--active');
        questionButton.classList.toggle('faq__button--active');
        const isExpanded = questionButton.classList.contains('faq__button--active');
        questionButton.setAttribute('aria-expanded', isExpanded);
      };

      // Event listener for mouse click on the header
      question.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleItem();
      });

      // Event listener for mouse click on the button
      questionButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleItem();
      });

      // Event listener for keyboard interaction (Enter key)
      question.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          toggleItem();
        }
      });
    });
  });
};
