import { openPopup } from './modal.js';
import { deleteLike, addLike, deletePost, getInitialCards } from './api.js';
import { fillPhotoPopup, photoContainer } from '../index.js';
export const cardList = document.querySelector('.photo-grid__elements');
const cardTemplate = document.querySelector('.cardtemplate').content;

getInitialCards();

export function createCard(item) {
  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.photo-grid__image');
  const cardName = cardElement.querySelector('.photo-grid__name');
  const likeNumber = cardElement.querySelector('.photo-grid__like-number');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardName.textContent = item.name;
  likeNumber.textContent = item.likes.length;
  cardElement.querySelector('.photo-grid__like').addEventListener('click', function (evt) {
    if ((evt.target.classList.contains("photo-grid__like_active"))) {
      deleteLike(item, likeNumber);
      evt.target.classList.remove("photo-grid__like_active");
    } else {
      addLike(item, likeNumber);
      evt.target.classList.add("photo-grid__like_active");
    }
  });
  cardElement.querySelector('.photo-grid__delete').addEventListener('click', function () {
    deletePost(item);
    cardElement.remove();
  });
  cardImage.addEventListener('click', function (evt) {
    openPopup(photoContainer);
    const eventTarget = evt.target;
    fillPhotoPopup(eventTarget);
  });
  return cardElement
}


