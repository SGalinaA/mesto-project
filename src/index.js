import './index.css';
import { createCard, cardList, } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation } from './components/validate.js';
import {promiseAll, changeMainInformation, postCard, patchUpdateAvatar} from './components/api';

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
const avatar = document.querySelector('.profile__avatar');

export const userDataPromise = promiseAll()
.then(([info, initialCards])=>{
  profileName.textContent = info.name;
  profileDescription.textContent = info.about;
  avatar.src = info.avatar;
  initialCards.forEach(function (element) {
    const cardElement = createCard(element);
    if (!(element.owner._id === info._id)) {
      cardElement.querySelector('.photo-grid__delete').classList.remove('photo-grid__delete');
    }
    cardList.append(cardElement);
  });
})
.catch((err)=>{
console.log(err);
})

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
  savingChanges(profilePopup);
  changeMainInformation(nameInputValue, jobInputValue)
  .then((res) => {
    closePopup(profilePopup);
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function(){
    resetSavingChanges(profilePopup);
  })
}

addButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

export function addCard(evt) {
  evt.preventDefault();
  const photoTitleValue = photoTitle.value;
  const photoLinkValue = photoLink.value;
  savingChanges(popupAddCard);
  postCard(photoTitleValue, photoLinkValue)
  .then((result) => {
    const cardElement = createCard(result);
    cardList.prepend(cardElement);
    popupAddCardButton.classList.add('popup__button_inactive');
    closePopup(popupAddCard);
    evt.target.reset();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function(){
    const popupButton = popupAddCard.querySelector('.popup__button');
    popupButton.textContent = 'Создать';
  })
}

editAvatarButton.addEventListener('click', function () {
  openPopup(popupAvatar);
});

cardForm.addEventListener('submit', addCard);

function updateAvatar(evt){
  const profileAvatar = document.querySelector('.profile__avatar');
  evt.preventDefault();
  savingChanges(popupAvatar);
  patchUpdateAvatar(avatarLink)
  .then((res) => {
    profileAvatar.src = res.avatar;
    closePopup(popupAvatar);
    evt.target.reset();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function(){
    resetSavingChanges(popupAvatar);
  })
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

export function resetSavingChanges(popup) {
  const popupButton = popup.querySelector('.popup__button');
  popupButton.textContent = 'Сохранить';
}
