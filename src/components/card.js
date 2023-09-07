import { openPopup } from './modal.js';
import { deleteLike, addLike, deletePost} from './api.js';
import { fillPhotoPopup, photoContainer} from '../index.js';
export const cardList = document.querySelector('.photo-grid__elements');
const cardTemplate = document.querySelector('.cardtemplate').content;

export function createCard(item) {
  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.photo-grid__image');
  const cardName = cardElement.querySelector('.photo-grid__name');
  const likeNumber = cardElement.querySelector('.photo-grid__like-number');
  const likeIcon = cardElement.querySelector('.photo-grid__like');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardName.textContent = item.name;
  likeNumber.textContent = item.likes.length;
  likeIcon.addEventListener('click', function (evt) {
    if ((evt.target.classList.contains("photo-grid__like_active"))) {
      deleteLike(item, cardElement);
    } else {
      addLike(item, cardElement);
    }
  });
  cardElement.querySelector('.photo-grid__delete').addEventListener('click', function () {
    deletePost(item, cardElement);
  });
  cardImage.addEventListener('click', function (evt) {
    openPopup(photoContainer);
    const eventTarget = evt.target;
    fillPhotoPopup(eventTarget);
  });
  return cardElement
}

export function removeCard(cardElement) {
  cardElement.remove();
}

export function changeLikesDelete (res, cardElement) {
  const likeNumber = cardElement.querySelector('.photo-grid__like-number');
  likeNumber.textContent = res.likes.length;
  cardElement.querySelector('.photo-grid__like').classList.remove("photo-grid__like_active");
}

export function changeLikesAdd (res, cardElement) {
  const likeNumber = cardElement.querySelector('.photo-grid__like-number');
  likeNumber.textContent = res.likes.length;
  cardElement.querySelector('.photo-grid__like').classList.add("photo-grid__like_active");
}
