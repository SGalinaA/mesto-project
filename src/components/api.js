import {profilePopup, displayUserInformation, displayCards, resetSavingPostCard, resetSaving, popupAvatar,
  changeAvatar, changeAboutUser, addNewCard} from "../index.js";
import { changeLikesDelete, changeLikesAdd, removeCard } from "./card.js";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-28',
  headers: {
    authorization: '7ee2f37b-c345-4765-8a16-5dff52a03a30',
    'Content-Type': 'application/json'
  }
}

function getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

const getUserInformation = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-28/users/me ', {
    headers: config.headers
  })
    .then( res => getResponseData(res))
    .catch((err) => {
      console.log(err);
    });
}

export const getInitialCards = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-28/cards', {
    headers: config.headers
  })
    .then(res => getResponseData(res))
    .catch((err) => {
      console.log(err);
    });
}

Promise.all([
  getUserInformation(),
  getInitialCards(),
])
.then(([info, initialCards])=>{
  displayUserInformation(info);
  displayCards(info, initialCards)
})
.catch((err)=>{
console.log(err);
 })

export const changeMainInformation = (nameInputValue, jobInputValue) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-28/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInputValue,
      about: jobInputValue
    })
  })
    .then(res => getResponseData(res))
    .then((res) => {
      console.log(res);
      changeAboutUser(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(resetSaving(profilePopup));
}

export const postCard = (photoTitleValue, photoLinkValue) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-28/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: photoTitleValue,
      link: photoLinkValue
    })
  })
    .then(res => getResponseData(res))
    .then((res) => {
      console.log(res);
      addNewCard(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(resetSavingPostCard());
}

export const deleteLike = (item, cardElement) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-28/cards/likes/${item._id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => getResponseData(res))
    .then((res) => {
      console.log(res);
      changeLikesDelete(res, cardElement);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const addLike = (item, cardElement) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-28/cards/likes/${item._id}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => getResponseData(res))
    .then((res) => {
      console.log(res);
      changeLikesAdd(res, cardElement);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const deletePost = (item, cardElement) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-28/cards/${item._id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => getResponseData(res))
    .then((res) => {
      console.log(res);
      removeCard(cardElement);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const patchUpdateAvatar = (avatarLink) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-28/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink.value
    })
  })
    .then(res => getResponseData(res))
    .then((res) => {
      console.log(res);
      changeAvatar(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(resetSaving(popupAvatar));
}
