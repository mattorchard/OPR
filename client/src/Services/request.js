import auth from "./auth";

function request (url, options={}) {
  if (typeof options.body === "object") {
    options.body = JSON.stringify(options.body);
  }
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      "x-access-token": auth.getToken()
    }
  });
}

export {request};