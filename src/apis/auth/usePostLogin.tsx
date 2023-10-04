// src/apis/auth/usePostLogin.tsx

import axios, { AxiosError } from "axios";
import { API_URL } from "@/constants/API_URL";
import { useMutation } from "@tanstack/react-query";

interface LoginReqDTO {
  email: string;
  password: string;
}
const postLogin = async (requestData: LoginReqDTO) => {
  const { data } = await axios.post(API_URL.AUTH.LOGIN, requestData);
  return data;
};

export const usePostLogin = () =>
  useMutation<
    {
      success: boolean;
    },
    AxiosError<{
      code: string;
      msg: string;
    }>,
    LoginReqDTO
  >(postLogin);
