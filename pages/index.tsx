import type { GetServerSideProps } from "next";
import coins from "../mock-data/coins.json";
import { ICoin } from "../mock-data/coin-type";
import { fetcher, isObjEmpty } from "../utilities/helper";
import { Container } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

const coinData: ICoin[] = coins.data.map((coin: ICoin) => {
  const {
    id,
    name,
    symbol,
    slug,
    circulating_supply,
    total_supply,
    cmc_rank,
    quote,
  } = coin;
  return {
    id,
    name,
    symbol,
    slug,
    circulating_supply,
    total_supply,
    cmc_rank,
    quote,
  };
});
const tableHeader = [
  "Name",
  "Symbol",
  "Market Cap",
  "Price",
  "Circulating Supply",
  "Volume (24h)",
  "Vol/ Marketcap",
];
const cmcBaseUrl = "https://coinmarketcap.com/currencies";
const Home = ({ data }: { data: any }) => {
  return (
    <Container maxW="container.lg" centerContent>
      <Table variant="simple">
        <Thead>
          <Tr>
            {tableHeader.map((x) => (
              <Th>{x}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {coinData.map((coin) => {
            const {
              id,
              name,
              symbol,
              slug,
              circulating_supply,
              total_supply,
              cmc_rank,
              quote,
            } = coin;
            const { price, volume_24h, market_cap } = quote.USD;

            return (
              <Tr key={id}>
                <Td>{name}</Td>
                <Td>
                  <a href={`${cmcBaseUrl}/${slug}`} target="_blank">
                    {symbol}
                  </a>
                </Td>
                <Td>{market_cap}</Td>
                <Td>{price}</Td>
                <Td>{circulating_supply}</Td>
                <Td>{volume_24h}</Td>
                <Td>{total_supply}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Container>
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
    props: { data },
  };
};
export default Home;
