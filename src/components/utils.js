import { openPopup, closePopup } from './modal';
const closeButtons = document.querySelectorAll('.popup__close');



closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
