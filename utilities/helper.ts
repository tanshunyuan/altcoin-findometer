import axios, { AxiosResponse } from "axios";

const fetcher = async (url: string, config: {}) => {
  try {
    const { data }: { data: AxiosResponse } = await axios.get(url, config);
    return data;
  } catch (err: any) {
    return err.response.data;
  }
};
const isObjEmpty = (obj: {}) => {
  return Object.values(obj).length === 0;
};

export {fetcher, isObjEmpty}
