import { openPopup, closePopup } from "./utils";
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

export function fillPhotoPopup(image) {
  const photoLink = image.src;
  photoImage.src = photoLink;
  const photoCaption = image.alt;
  popupPhotoCaption.textContent = photoCaption;
  photoImage.alt = photoCaption;
  photoContainer.addEventListener('keydown', function (evt) {

    if ((evt.key === 'Escape')) {
      console.log(evt.key, "f");
    }
  });
}

document.addEventListener('click', function (evt) {
  console.log(evt.target);
  if ((evt.target.classList.contains('profile-popup') || (evt.target.classList.contains('popup-add')))) {
    closePopup(profilePopup);
    closePopup(popupAddCard);
  } else if ((evt.target.classList.contains(('popup-photo')))) {
    closePopup(photoContainer);
  }
}
)
