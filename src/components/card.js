export const cardForm = document.forms["card-form"];
import { openPopup, closePopup } from './modal';
import { fillPhotoPopup, photoContainer, popupAddCard } from '../index';
const cardList = document.querySelector('.photo-grid__elements');
const cardTemplate = document.querySelector('.cardtemplate').content;
const photoTitle = cardForm.querySelector('.popup__main-text');
const photoLink = cardForm.querySelector('input[name="photolink"]');
const popupAddCardButton = cardForm.querySelector('.popup__button');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (element) {
  const cardElement = createCard(element)
  cardList.append(cardElement);

});

function createCard(item) {
  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.photo-grid__image');
  const cardName = cardElement.querySelector('.photo-grid__name');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardName.textContent = item.name;
  cardElement.querySelector('.photo-grid__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__like_active');
  });
  cardElement.querySelector('.photo-grid__delete').addEventListener('click', function (evt) {
    cardElement.remove();
  });
  cardImage.addEventListener('click', function (evt) {
    openPopup(photoContainer);
    const eventTarget = evt.target;
    fillPhotoPopup(eventTarget);
  });
  return cardElement
}

export function addCard(evt) {
  evt.preventDefault();
  const photoTitleValue = photoTitle.value;
  const photoLinkValue = photoLink.value;
  const item = {
    name: photoTitleValue,
    link: photoLinkValue
  }
  const cardElement = createCard(item);
  cardList.prepend(cardElement);
  closePopup(popupAddCard);
  popupAddCardButton.classList.add('popup__button_inactive');
  evt.target.reset();
};

cardForm.addEventListener('submit', addCard);
