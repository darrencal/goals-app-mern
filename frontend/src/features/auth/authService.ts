import axios from 'axios';

const API_URL = '/api/auth';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000',
});

const register = async (registerData: RegisterData) => {
  const res = await axiosClient.post(`${API_URL}/register`, registerData);

  if (res.data) {
    localStorage.setItem('mygoals_user', JSON.stringify(res.data));
  }

  return res.data;
};

const authService = {
  register,
};

export default authService;
