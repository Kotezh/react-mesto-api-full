export const BASE_URL = "https://api.kotezh.mesto.nomoredomains.monster";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      if (res.status === 400) {
        throw Error("некорректно заполнено одно из полей");
      } else {
        throw Error(res);
      }
    }
  });
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      if (res.status === 400) {
        throw Error("не передано одно из полей");
      } else if (res.status === 401) {
        throw Error("пользователь с email не найден");
      } else {
        throw Error(res);
      }
    }
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      if (res.status === 400) {
        throw Error("Токен не передан или передан не в том формате");
      } else if (res.status === 401) {
        throw Error("Переданный токен некорректен");
      } else {
        throw Error(res);
      }
    }
  });
};
