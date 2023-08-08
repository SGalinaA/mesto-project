export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

document.querySelectorAll('.popup').forEach(item => {
  item.addEventListener('click', function (evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if ((evt.target.classList.contains('profile-popup')) || (evt.target.classList.contains('popup-add')) || (evt.target.classList.contains(('popup-photo')))) {
      closePopup(openedPopup);
    }
  })
});

