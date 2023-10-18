import axios from 'axios';
import jwt_decode from 'jwt-decode';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_PREDEFINED,
});

async function refreshAccessToken() {
  try {
    const refreshToken = window.localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return null;
    }

    const response = await axios.post(
      'http://localhost:5000/auth/refresh-token',
      { refreshToken },
    );
    const newAccessToken = response.data.token;

    window.localStorage.setItem('token', newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error('Ошибка при обновлении токена:', error);
    throw error;
  }
}

httpClient.interceptors.request.use(async (config) => {
  const token = window.localStorage.getItem('token');

  if (!token) return config;

  const tokenData: any = jwt_decode(token);
  const currentTime = Math.floor(Date.now() / 1000);

  if (tokenData.exp && tokenData.exp > currentTime) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }

  const newToken = await refreshAccessToken();

  newToken && (config.headers.Authorization = `Bearer ${newToken}`);
  !newToken && delete config.headers.Authorization;

  return config;
});

export default httpClient;
