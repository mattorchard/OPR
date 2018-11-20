
const TOKEN_KEY = 'jwtToken';
const USER_INFO = 'userInfo';

function isEmpty(value) {
  if (!value) {
    return true;
  } else if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === "object") {
    return Object.keys(value).length === 0;
  } else {
    return false
  }

}

const authStore = {
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },

  clearAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }

    if (sessionStorage) {
      sessionStorage.clear();
    }
  },

  clearToken(tokenKey = TOKEN_KEY) {
    return authStore.clear(tokenKey);
  },

  clearUserInfo(userInfo = USER_INFO) {
    return authStore.clear(userInfo);
  },
  
  get(key) {
    if (localStorage && localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key)) || null;
    }
    if (sessionStorage && sessionStorage.getItem(key)) {
      return JSON.parse(sessionStorage.getItem(key)) || null;
    }
    return null;
  },

  getToken(tokenKey = TOKEN_KEY) {
    return authStore.get(tokenKey);
  },

  getUserInfo(userInfo = USER_INFO) {
    return authStore.get(userInfo);
  },

  set(value, key, isLocalStorage) {
    if (isEmpty(value)) {
      return null;
    }

    if (isLocalStorage && localStorage) {
      return localStorage.setItem(key, JSON.stringify(value));
    }

    if (sessionStorage) {
      return sessionStorage.setItem(key, JSON.stringify(value));
    }

    return null;
  },

  setToken(value = '', isLocalStorage = false, tokenKey = TOKEN_KEY) {
    return authStore.set(value, tokenKey, isLocalStorage);
  },

  setUserInfo(value = '', isLocalStorage = false, userInfo = USER_INFO) {
    return authStore.set(value, userInfo, isLocalStorage);
  },
};

export default authStore;