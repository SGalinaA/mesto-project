import './index.css';
import { createCard, cardList, } from './components/card.js';
import { openPopup } from './components/modal.js';
import { enableValidation } from './components/validate.js';
import {getUserInformation, changeMainInformation, postCard, patchUpdateAvatar} from './components/api';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
export const profilePopup = document.querySelector('.profile-popup');
export const profileForm = document.forms["profile-form"];
export const nameInput = profileForm.querySelector('.popup__main-text');
export const jobInput = profileForm.querySelector('input[name="aboutuser"]');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const popupAddCard = document.querySelector('.popup-add');
export const photoContainer = document.querySelector('.popup-photo');
const photoImage = document.querySelector('.popup-photo__img');
const popupPhotoCaption = document.querySelector('.popup-photo__caption');
export const cardForm = document.forms["card-form"];
export const photoTitle = cardForm.querySelector('.popup__main-text');
export const photoLink = cardForm.querySelector('input[name="photolink"]');
export const popupAddCardButton = cardForm.querySelector('.popup__button');
const editAvatarButton = document.querySelector('.profile__edit-avatar');
const avatarForm = document.forms["avatar-form"]
const popupAvatar = document.querySelector('.popup-avatar');
const avatarLink = avatarForm.querySelector('input[name="photolink"]');

getUserInformation();

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
  changeMainInformation(nameInputValue, jobInputValue);
}

addButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

export function addCard(evt) {
  evt.preventDefault();
  const photoTitleValue = photoTitle.value;
  const photoLinkValue = photoLink.value;
  const item = {
    name: photoTitleValue,
    link: photoLinkValue,
    likes: []
  }
  postCard(photoTitleValue, photoLinkValue);
  const cardElement = createCard(item);
  cardList.prepend(cardElement);
  popupAddCardButton.classList.add('popup__button_inactive');
  console.log(cardElement);
  evt.target.reset();
}

editAvatarButton.addEventListener('click', function () {
  openPopup(popupAvatar);
});

cardForm.addEventListener('submit', addCard);

function updateAvatar(evt){
  const profileAvatar = document.querySelector('.profile__avatar');
  evt.preventDefault();
  console.log(avatarLink.value);
  patchUpdateAvatar(avatarLink, profileAvatar, popupAvatar),
  evt.target.reset();
}

avatarForm.addEventListener('submit', updateAvatar);

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

export function savingChanges(popup) {
  const popupButton = popup.querySelector('.popup__button');
  popupButton.textContent = 'Сохранение...';
}
