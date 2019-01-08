export function authToken() {
  return localStorage.getItem("authToken") || "";
}

export function setAuthToken(token) {
  if (!token) {
    localStorage.removeItem("authToken");
  } else {
    localStorage.setItem("authToken", token);
  }
}

export function purgatoryToken() {
  return localStorage.getItem("purgatoryToken") || "";
}

export function setPurgatoryToken(token) {
  if (!token) {
    localStorage.removeItem("purgatoryToken");
  } else {
    localStorage.setItem("purgatoryToken", token);
  }
}

export function baseUrl() {
  return localStorage.getItem("baseUrl") || "";
}

export function setBaseUrl(token) {
  if (!token) {
    localStorage.removeItem("baseUrl");
  } else {
    localStorage.setItem("baseUrl", token);
  }
}
