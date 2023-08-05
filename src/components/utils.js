const closeButtons = document.querySelectorAll('.popup__close');

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  console.log(popup);
  document.addEventListener('keydown', function (evt) {
    if ((evt.key === 'Escape')) {
      closePopup(popup);
    }
  });
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
