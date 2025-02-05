export const toggleAccordion = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const listElements = document.querySelectorAll('.faq__list-item');
    listElements.forEach((listElement) => {
      const question = listElement.querySelector('.faq__header'); // Select the header of each item
      const questionButton = listElement.querySelector('.faq__button'); // Select the button of each item

      question.addEventListener('click', (event) => {
        event.stopPropagation();
        listElement.classList.toggle('faq__list-item--active');
        questionButton.classList.toggle('faq__button--active');
      });

      questionButton.addEventListener('click', (event) => {
        event.stopPropagation();
        listElement.classList.toggle('faq__list-item--active');
        questionButton.classList.toggle('faq__button--active');
      });
    });
  });
};
