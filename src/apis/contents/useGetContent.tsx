import axios, { AxiosError } from "axios";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { API_URL } from "@/constants/API_URL";
import { contentKeyFactory } from "@/query_keys/contentKeFactory";

interface ResDTO {}
interface GeContentDef {
  ({
    queryKey,
  }: QueryFunctionContext<
    ReturnType<typeof contentKeyFactory.allInfo>
  >): Promise<ResDTO>;
}

const getProductInfo: GeContentDef = async () => {
  const { data } = await axios.get(`${API_URL.CONTENT.COMMON}`);
  return data;
};

export const useGetProductInfo = () =>
  useQuery<
    ResDTO,
    AxiosError<{
      code: string;
      msg: string;
    }>,
    ResDTO,
    ReturnType<typeof contentKeyFactory.allInfo>
  >({
    queryKey: contentKeyFactory.allInfo(),
    queryFn: getProductInfo,
  });
