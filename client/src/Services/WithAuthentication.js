import axios from "axios";

export const withAuth = callback => {
  // It is possible for a component to mount before the x-access-token
  // in the axios headers are set, this function performs non-blocking
  // timeout calls until the auth headers are set
  if (!axios.defaults.headers.common['x-access-token']) {
    window.setTimeout(() => withAuth(callback), 1);
  } else {
    callback();
  }
};
