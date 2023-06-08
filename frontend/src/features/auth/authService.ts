import axiosClient from '../../utils/axiosClient';

const API_URL = '/api/auth';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

const register = async (registerData: RegisterData) => {
  const res = await axiosClient.post(`${API_URL}/register`, registerData);

  if (res.data) {
    localStorage.setItem('mygoals_user', JSON.stringify(res.data));
  }

  return res.data;
};

const login = async (loginData: LoginData) => {
  const res = await axiosClient.post(`${API_URL}/login`, loginData);

  if (res.data) {
    localStorage.setItem('mygoals_user', JSON.stringify(res.data));
  }

  return res.data;
};

const logout = async () => {
  localStorage.removeItem('mygoals_user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
