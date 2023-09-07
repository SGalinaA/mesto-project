import './index.css';
import { createCard, cardList, } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation } from './components/validate.js';
import { changeMainInformation, postCard, patchUpdateAvatar } from './components/api';

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
export const popupAvatar = document.querySelector('.popup-avatar');
const avatarLink = avatarForm.querySelector('input[name="photolink"]');
const avatar = document.querySelector('.profile__avatar');

function checkCard(info, item, cardElement) {
  if (!(item.owner._id === info._id)) {
    cardElement.querySelector('.photo-grid__delete').classList.remove('photo-grid__delete');
  }
  if (item.likes.length > 0) {
    cardElement.querySelector('.photo-grid__like').classList.add("photo-grid__like_active");
  }
}

export function displayUserInformation(info) {
  profileName.textContent = info.name;
  profileDescription.textContent = info.about;
  avatar.src = info.avatar;
};

export function displayCards(info, initialCards) {
  initialCards.forEach(function (item) {
    const cardElement = createCard(item);
    checkCard(info, item, cardElement);
    cardList.append(cardElement);
  })
}

editButton.addEventListener('click', function () {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

export function editProfile(evt) {
  evt.preventDefault();
  savingChanges(profilePopup);
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  changeMainInformation(nameInputValue, jobInputValue);
}

addButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

export function addCard(evt) {
  evt.preventDefault();
  const photoTitleValue = photoTitle.value;
  const photoLinkValue = photoLink.value;
  savingChanges(popupAddCard);
  postCard(photoTitleValue, photoLinkValue);
  popupAddCardButton.classList.add('popup__button_inactive');
}

export function addNewCard(res) {
  const item = {
    name: res.name,
    link: res.link,
    likes: []
  }
  const cardElement = createCard(item);
  cardList.prepend(cardElement);
  cardForm.reset();
  closePopup(popupAddCard);
  document.location.reload();
}

editAvatarButton.addEventListener('click', function () {
  openPopup(popupAvatar);
});

cardForm.addEventListener('submit', addCard);

function updateAvatar(evt) {
  evt.preventDefault();
  savingChanges(popupAvatar);
  patchUpdateAvatar(avatarLink);
}

export function changeAvatar(res) {
  const profileAvatar = document.querySelector('.profile__avatar');
  profileAvatar.src = res.avatar;
  avatarForm.reset();
  popupAvatar.querySelector('.popup__button').classList.add('popup__button_inactive');
  closePopup(popupAvatar);
}
export function changeAboutUser(res) {
  profileName.textContent = res.name;
  profileDescription.textContent = res.about;
  profilePopup.querySelector('.popup__button').classList.add('popup__button_inactive');
  closePopup(profilePopup);
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
  console.log(popupButton);
  popupButton.textContent = 'Сохранение...';
  console.log(popupButton.textContent);
}
export function resetSavingPostCard() {
  const popupButton = popupAddCard.querySelector('.popup__button');
  popupButton.textContent = 'Создать';
}
export function resetSaving(popup) {
  const popupButton = popup.querySelector('.popup__button');
  popupButton.textContent = 'Сохранить';
}
