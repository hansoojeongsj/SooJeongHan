import axios, { AxiosResponse } from 'axios';
import { SignupData, LoginData, LoginResponse } from '../types/types';

export const signupApi = async (signupData: SignupData) => {
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user`, {
    username: signupData.username,
    password: signupData.password,
    hobby: signupData.hobby,
  });
  return response;
};

export const loginApi = async (loginData: LoginData): Promise<AxiosResponse<LoginResponse>> => {
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
    username: loginData.username,
    password: loginData.password,
  });
  return response;
};
