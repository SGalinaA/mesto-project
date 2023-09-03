import { profileName, profileDescription, profilePopup, popupAddCard, savingChanges } from "../index.js";
import { createCard, cardList, } from './card.js';
import { closePopup } from "./modal.js";
const avatar = document.querySelector('.profile__avatar');

export const getUserInformation = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-28/users/me ', {
    headers: {
      authorization: '7ee2f37b-c345-4765-8a16-5dff52a03a30'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      profileName.textContent = result.name;
      profileDescription.textContent = result.about;
      avatar.src = result.avatar;
    })
    .catch((err) => {
      console.log(err);
    });
}

export const getInitialCards = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-28/cards', {
    headers: {
      authorization: '7ee2f37b-c345-4765-8a16-5dff52a03a30'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      result.forEach(function (element) {
        const cardElement = createCard(element);
        cardList.append(cardElement);
        if (!(element.owner._id === "eff8e57b11ce4b483cd39a99")) {
          cardElement.querySelector('.photo-grid__delete').classList.remove('photo-grid__delete');
        }
        if (element.likes.length > 0) {
          cardElement.querySelector('.photo-grid__like').classList.add("photo-grid__like_active");
        }
      })
    })
    .catch((err) => {
      console.log(err);
    });
}

export const changeMainInformation = (nameInputValue, jobInputValue) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-28/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '7ee2f37b-c345-4765-8a16-5dff52a03a30',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInputValue,
      about: jobInputValue
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      console.log(res);
      savingChanges(profilePopup);
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const postCard = (photoTitleValue, photoLinkValue) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-28/cards', {
    method: 'POST',
    headers: {
      authorization: '7ee2f37b-c345-4765-8a16-5dff52a03a30',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: photoTitleValue,
      link: photoLinkValue
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      console.log(res);
      savingChanges(popupAddCard);
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const deleteLike = (item, likeNumber) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-28/cards/likes/${item._id}`, {
    method: 'DELETE',
    headers: {
      authorization: '7ee2f37b-c345-4765-8a16-5dff52a03a30',
      'Content-Type': 'application/json'
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      console.log(res);
      likeNumber.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

export const addLike = (item, likeNumber) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-28/cards/likes/${item._id}`, {
    method: 'PUT',
    headers: {
      authorization: '7ee2f37b-c345-4765-8a16-5dff52a03a30',
      'Content-Type': 'application/json'
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      console.log(res);
      likeNumber.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

export const deletePost = (item) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-28/cards/${item._id}`, {
    method: 'DELETE',
    headers: {
      authorization: '7ee2f37b-c345-4765-8a16-5dff52a03a30',
      'Content-Type': 'application/json'
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const patchUpdateAvatar = (avatarLink, profileAvatar, popupAvatar) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-28/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '7ee2f37b-c345-4765-8a16-5dff52a03a30',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarLink.value
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      console.log(res);
      savingChanges(popupAvatar);
      profileAvatar.src = res.avatar;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    });
}
