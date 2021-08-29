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
import { Link, Text, Stack } from "@chakra-ui/react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
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
  "Rank",
  "Name",
  "Symbol",
  "Market Cap",
  "Price",
  "Circulating Supply",
  "Volume (24h)",
  "Vol/ Marketcap",
];
const cmcBaseUrl = "https://coinmarketcap.com/currencies";
// Second filter is volume
// 10% <24 hr Volume <50%
// the 24 hr volume should be between 10 to 50% of the market cap
const mfker = (coin:ICoin) => {
    const {symbol} = coin
    const { market_cap, volume_24h } = coin.quote.USD;
    const tenPercentOfMarketCap = market_cap * 0.1;
    const fiftyPercentOfMarketCap = market_cap * 0.5;
    if (
      volume_24h > tenPercentOfMarketCap &&
      volume_24h < fiftyPercentOfMarketCap
    ) {
      return coin;
    }

  }
const Home = ({ data }: { data: any }) => {
  const newCoinData = coinData.filter(mfker);
  return (
    <Container maxW="container.lg" centerContent>
      <Stack>
        <Text>
          The list of coins is based off coinbearu video on how to find 100x
          altcoins
        </Text>
        <OrderedList>
          <ListItem>5,000,000 to 10,000,000 in Market Cap</ListItem>
        </OrderedList>
      </Stack>
      <Table variant="simple">
        <Thead>
          <Tr>
            {tableHeader.map((x, index) => (
              <Th key={index}>{x}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {newCoinData.map((coin) => {
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
                <Td>{cmc_rank}</Td>
                <Td>{name}</Td>
                <Td>
                  <Link
                    href={`${cmcBaseUrl}/${slug}`}
                    isExternal
                    color="gray"
                    fontWeight="bold"
                  >
                    {symbol}
                  </Link>
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
