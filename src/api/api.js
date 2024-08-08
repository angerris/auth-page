import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json"
  }
});

export const setToken = (token, refreshToken) => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("refreshToken", refreshToken);
};

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const removeToken = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
};

export const login = async (username, password) => {
  const response = await api.post("/auth/login", {
    username,
    password
  });
  const { token, refreshToken } = response.data;
  setToken(token, refreshToken);
  return { data: response.data };
};

export const getUser = async () => {
  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return { data: response.data };
};

export const refreshToken = async () => {
  const response = await api.post("/auth/refresh", {
    refreshToken: getRefreshToken()
  });
  const { token } = response.data;
  setToken(token, getRefreshToken());
  return { data: response.data };
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { data } = await refreshToken();
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
