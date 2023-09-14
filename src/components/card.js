import { openPopup } from './modal.js';
import { deleteLike, addLike, deletePost} from './api.js';
import { fillPhotoPopup, photoContainer } from '../index.js';
export const cardList = document.querySelector('.photo-grid__elements');
const cardTemplate = document.querySelector('.cardtemplate').content;

export function createCard(item, info) {
  const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.photo-grid__image');
  const cardName = cardElement.querySelector('.photo-grid__name');
  const likeNumber = cardElement.querySelector('.photo-grid__like-number');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardName.textContent = item.name;
  likeNumber.textContent = item.likes.length;
  for (let i=0; i<item.likes.length; i++) {
    if (item.likes[i]._id === info._id) {
      cardElement.querySelector('.photo-grid__like').classList.add('photo-grid__like_active')
    }
  }
  cardElement.querySelector('.photo-grid__like').addEventListener('click', function (evt) {
    if ((evt.target.classList.contains("photo-grid__like_active"))) {
      deleteLike(item)
      .then((res) => {
        likeNumber.textContent = res.likes.length;
        evt.target.classList.remove("photo-grid__like_active");
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      addLike(item)
      .then((res) => {
        likeNumber.textContent = res.likes.length;
        evt.target.classList.add("photo-grid__like_active");
      })
      .catch((err) => {
        console.log(err);
      });
    }
  });
  if (!(item.owner._id === info._id)) {
    cardElement.querySelector('.photo-grid__delete').classList.remove('photo-grid__delete');
  } else {
  cardElement.querySelector('.photo-grid__delete').addEventListener('click', function () {
    deletePost(item)
    .then((res) => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
  });
  cardImage.addEventListener('click', function (evt) {
    openPopup(photoContainer);
    const eventTarget = evt.target;
    fillPhotoPopup(eventTarget);
  });
}
  return cardElement
}
