const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const profilePopup = content.querySelector('.profile-popup');
const profileCloseButton = content.querySelector('.popup__close');
const profileForm = document.forms["profile-form"];
const nameInput = profileForm.querySelector('.popup__main-text');
const jobInput = profileForm.querySelector('input[name="aboutuser"]');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');
const closeButtons = document.querySelectorAll('.popup__close');
const cardList = content.querySelector('.photo-grid__elements');
const cardTemplate = document.querySelector('.cardtemplate').content;
const deleteButton = document.querySelectorAll('.photo-grid__delete');
const photoContainer = content.querySelector('.popup-photo');
const photoImage = document.querySelector('.popup-photo__img');
const popupPhotoCaption = content.querySelector('.popup-photo__caption');
const addButton = content.querySelector('.profile__add-button');
const popupAddCard = content.querySelector('.popup-add');
const cardForm = document.forms["card-form"];
const photoTitle = cardForm.querySelector('.popup__main-text');
const photoLink = cardForm.querySelector('input[name="photolink"]');
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', function(){
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function editProfile(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  profileName.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  closePopup(profilePopup);
}

profileForm.addEventListener('submit',editProfile);

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
  cardElement.querySelector('.photo-grid__image').addEventListener('click', function (evt) {
    openPopup(photoContainer);
    const eventTarget = evt.target;
    fillPhotoPopup(eventTarget);
  });
return cardElement
}

function fillPhotoPopup(a){
  const photoLink = a.src;
  photoImage.src = photoLink;
  const photoCaption = a.alt;
  popupPhotoCaption.textContent = photoCaption;
  photoImage.alt = photoCaption;

}

initialCards.forEach(function (element) {
  const cardElement = createCard(element)
  cardList.append(cardElement);

});

addButton.addEventListener('click', function(){
  openPopup(popupAddCard);
});

function addCard(evt) {
  evt.preventDefault();
  const photoTitleValue = photoTitle.value;
  const photoLinkValue = photoLink.value;
  initialCards.unshift({
    name: '',
    link: ''
  });
  initialCards[0].name = photoTitleValue;
  initialCards[0].link = photoLinkValue;
  const cardElement = createCard(initialCards[0]);
    cardList.prepend(cardElement);
    closePopup(popupAddCard);
  };

cardForm.addEventListener('submit', addCard);




