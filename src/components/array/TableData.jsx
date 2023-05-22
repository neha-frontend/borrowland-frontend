import {
  BITCOIN_SVG,
  ETHEREUM_SVG,
  TETHER_SVG,
  USDC_SVG,
} from "../../assets/images";

const TABLE_DATA = [
  {
    id: 1,
    icon: BITCOIN_SVG,
    coin: "BTC",
    coin_title: "Bitcoin",
    coin_value: "$19,203",
  },
  {
    id: 2,
    icon: ETHEREUM_SVG,
    coin: "ETH",
    coin_title: "Etherium",
    coin_value: "$19,203",
  },
  {
    id: 3,
    icon: USDC_SVG,
    coin: "USDC",
    coin_title: "Tether",
    coin_value: "$19,203",
  },
  {
    id: 4,
    coin: "USDT",
    icon: TETHER_SVG,
    coin_title: "Tether",
    coin_value: "$19,203",
  },
];

export default TABLE_DATA;
