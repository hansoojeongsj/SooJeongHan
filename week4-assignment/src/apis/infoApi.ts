import axios, { AxiosResponse } from 'axios';
import { UpdateRequestData, InfoResponse } from '../types/types'; 


export const updateUserInfo = async (token: string, data: UpdateRequestData): Promise<AxiosResponse<InfoResponse>> => {
  const response: AxiosResponse<InfoResponse> = await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/user`, 
    data,
    { headers: { token }}
  );

  return response;
};
