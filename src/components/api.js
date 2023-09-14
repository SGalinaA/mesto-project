const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-28',
  headers: {
    authorization: '7ee2f37b-c345-4765-8a16-5dff52a03a30',
    'Content-Type': 'application/json'
  }
}

export function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export function promiseAll() {
  return Promise.all([
  getUserInformation(),
  getInitialCards(),
])
}

export const getUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me `, {
    headers: config.headers
  })
  .then(res => getResponseData(res))
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => getResponseData(res))
}

export const changeMainInformation = (nameInputValue, jobInputValue) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInputValue,
      about: jobInputValue
    })
  })
  .then(res => getResponseData(res))
}

export const postCard = (photoTitleValue, photoLinkValue) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: photoTitleValue,
      link: photoLinkValue,
    })
  })
  .then(res => getResponseData(res))
}

export const deleteLike = (item) => {
  return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => getResponseData(res))
}

export const addLike = (item) => {
  return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => getResponseData(res))
}

export const deletePost = (item) => {
  return fetch(`${config.baseUrl}/cards/${item._id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => getResponseData(res))
  .then(res => console.log(res))
}

export const patchUpdateAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink.value
    })
  })
  .then(res => getResponseData(res))
}
