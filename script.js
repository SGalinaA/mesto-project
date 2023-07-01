const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const popupOpened = content.querySelector('.popup_opened');
const closingEditButton = content.querySelector('.popup__close');
const formElement = content.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__main-text');
const jobInput = formElement.querySelector('input[name="aboutuser"]');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');

function editProfile() {
  popupOpened.classList.remove('close-animation');
  popupOpened.setAttribute('style', 'display:flex');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

editButton.addEventListener('click', editProfile);

function closeEditProfile() {
  popupOpened.classList.add('close-animation');
}

closingEditButton.addEventListener('click', closeEditProfile);

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  profileName.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  popupOpened.setAttribute('style', 'display:none');
}

formElement.addEventListener('submit', handleFormSubmit);

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
const cardList = content.querySelector('.photo-grid__elements');
const cardTemplate = document.querySelector('.cardtemplate').content;

initialCards.forEach(function (element) {
  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  cardElement.querySelector('.photo-grid__image').src = element.link;
  cardElement.querySelector('.photo-grid__name').textContent = element.name;
  cardElement.querySelector('.photo-grid__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__like_active');
  });
  cardList.append(cardElement);
});

const addButton = content.querySelector('.profile__add-button');
const popupAddOpened = content.querySelector('.popup-add_opened');

function addPhoto() {
  popupAddOpened.classList.remove('close-animation');
  popupAddOpened.setAttribute('style', 'display:flex');
}

addButton.addEventListener('click', addPhoto);

const closeAddButton = content.querySelector('.popup__add-close');

function closeAddPhoto() {
  popupAddOpened.classList.add('close-animation');
}

closeAddButton.addEventListener('click', closeAddPhoto);


const formElementAdd = content.querySelector('form[name="photo-add"]');
const photoTitle = formElementAdd.querySelector('.popup__main-text');
const photoLink = formElementAdd.querySelector('input[name="photolink"]');

function handleForSubmit(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const photoTitleValue = photoTitle.value;
  const photoLinkValue = photoLink.value;
  cardElement.querySelector('.photo-grid__image').src = photoLinkValue;
  cardElement.querySelector('.photo-grid__name').textContent = photoTitleValue;
  cardElement.querySelector('.photo-grid__like').addEventListener('click', function (evt) {
  evt.target.classList.toggle('photo-grid__like_active');
  });
  cardList.prepend(cardElement);
  popupAddOpened.setAttribute('style', 'display:none');
}

formElementAdd.addEventListener('submit', handleForSubmit);

const deleteButton = document.querySelectorAll('.photo-grid__delete');

for (let a=0; a<deleteButton.length; a++) {
  deleteButton[a].addEventListener('click', function () {
    const listItem = deleteButton[a].closest('.photo-grid__item');
    listItem.remove();
  });
}

const body = document.querySelector('.body');
const photoGridImage = document.querySelectorAll('.photo-grid__image');
const photoGridNamee = document.querySelectorAll('.photo-grid__name');
const photoContainer = content.querySelector('.popup-photo');
const popupPhotoClose = content.querySelector('.popup-photo__close');

for (let b=0; b<photoGridImage.length; b++) {
  photoGridImage[b].addEventListener('click', function() {
    body.setAttribute('style', 'overflow:hidden');
    photoContainer.classList.remove('close-animation');
    photoContainer.setAttribute('style', 'display:flex');
    const photoElement = content.querySelector('.popup-photo__img');
    const photoGridImageValue = photoGridImage[b].src;
    photoElement.src = photoGridImageValue;
    const popupPhotoCaption = content.querySelector('.popup-photo__caption');
    const photoGridNameValue = photoGridNamee[b].textContent;
    popupPhotoCaption.textContent = photoGridNameValue;
  });
}

function closePhotoContainer (){
  photoContainer.classList.add('close-animation');
  body.setAttribute('style', 'overflow:visible');

}

popupPhotoClose.addEventListener('click', closePhotoContainer)

