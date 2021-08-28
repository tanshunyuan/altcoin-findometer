import type { GetServerSideProps } from "next";
import axios, { AxiosResponse } from "axios";
import coins from '../mock-data/coins.json';
import {ICoin} from '../mock-data/coin-type';
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

const Home = ({ data }:{data:any}) => {
  const coinData:ICoin[] = coins.data.map((coin:ICoin) => {
      const {id,name,symbol,slug, circulating_supply, total_supply, cmc_rank, quote} = coin
      return {id,name,symbol,slug,circulating_supply,total_supply,cmc_rank,quote}
    })
  return (
    <div>
      <pre>{JSON.stringify(coinData, null, 2)}</pre>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const url =
  //   "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?market_cap_min=5000000&market_cap_max=10000000";
  const url = "http://fakeapi.jsonparseronline.com/posts/1";
  const config = { headers: { "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY } };
  const data = await fetcher(url, config);
  if (isObjEmpty(data)) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data }, // will be passed to the page component as props
  };
};
export default Home;
