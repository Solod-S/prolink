import axios from "axios";

const { REACT_APP_BAKEND_BASE_URL, REACT_APP_CLOUDINARY_BASE_URL } = process.env;

let navigate;

export const setNavigate = (nav) => {
  navigate = nav;
};

export const socialNetworkAxiosInstance = axios.create({
  baseURL: REACT_APP_BAKEND_BASE_URL,
});

export const socialNetworkToken = {
  set(token) {
    socialNetworkAxiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    socialNetworkAxiosInstance.defaults.headers.common.Authorization = "";
  },
};

socialNetworkAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      //  ловим 401 ошибку тут
      const refreshToken = localStorage.getItem("refreshToken");
      const sessionId = localStorage.getItem("sessionId");
      //   аксес токен не валидный и мы подготавливаем из локал стораджа рефреш + сешен айди токен для запроса на рефреш
      try {
        const { data } = await socialNetworkAxiosInstance.post("/auth/refresh", { refreshToken, sessionId });
        socialNetworkToken.set(data.data.accessToken);
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("sessionId", data.data.sessionId);
        error.config.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return socialNetworkAxiosInstance(error.config);
        //   делаем повторный запрос (ерор конфиг это настройки этого не удавшегося запроса, урл, боди и т д)
      } catch (error) {
        if (navigate) {
          const authPersistState = JSON.parse(localStorage.getItem("persist:auth"));
          authPersistState.isRefreshing = false;
          authPersistState.isLoggedIn = false;
          authPersistState.user = {};
          localStorage.setItem("persist:auth", JSON.stringify(authPersistState));
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("sessionId");
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
        return Promise.reject(error);

        //   ловим 403 ошибку (рефреш токен просрочен)
      }
    }
    return Promise.reject(error);
    // ловим все остальные ошибки (400 бед риквес и т д)
  }
);
// принимает две функции (первая удачная операция), во второй ловим ошибки и делаем свои делишки

export const cloudinaryAxiosInstance = axios.create({
  baseURL: REACT_APP_CLOUDINARY_BASE_URL,
});
