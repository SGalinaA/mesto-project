import './index.css';
import { openPopup, closePopup } from './components/modal.js';
import { createCard, cardList, initialCards } from './components/card.js';
import { enableValidation } from './components/validate.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
export const profilePopup = document.querySelector('.profile-popup');
export const profileForm = document.forms["profile-form"];
export const nameInput = profileForm.querySelector('.popup__main-text');
const jobInput = profileForm.querySelector('input[name="aboutuser"]');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
export const popupAddCard = document.querySelector('.popup-add');
export const photoContainer = document.querySelector('.popup-photo');
const photoImage = document.querySelector('.popup-photo__img');
const popupPhotoCaption = document.querySelector('.popup-photo__caption');
const cardForm = document.forms["card-form"];
const photoTitle = cardForm.querySelector('.popup__main-text');
const photoLink = cardForm.querySelector('input[name="photolink"]');
const popupAddCardButton = cardForm.querySelector('.popup__button');

editButton.addEventListener('click', function () {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

export function editProfile(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  profileName.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  closePopup(profilePopup);
  evt.target.reset();
}

addButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

initialCards.forEach(function (element) {
  const cardElement = createCard(element)
  cardList.append(cardElement);

});

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

export function fillPhotoPopup(image) {
  const photoLink = image.src;
  photoImage.src = photoLink;
  const photoCaption = image.alt;
  popupPhotoCaption.textContent = photoCaption;
  photoImage.alt = photoCaption;
}

profileForm.addEventListener('submit', editProfile);

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__main-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__main-text_error',
  errorClass: 'popup__error-description',
});

