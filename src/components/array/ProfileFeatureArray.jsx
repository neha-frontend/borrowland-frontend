import {
  BORROW_PROFILE_FEATURE,
  EARN_INTEREST_ICON,
  TRANSFER_ASSETS_ICON,
} from "../../assets/images";

const PROFILE_FEATURE_ARRAY = [
  {
    id: 1,
    title: "Transfer Assets",
    text: "Tops ups and withdrawals",
    image: TRANSFER_ASSETS_ICON,
    // to: "/",
  },
  {
    id: 2,
    title: "Earn Interest",
    text: "Interest on your idle assets",
    image: EARN_INTEREST_ICON,
    // to: "/",
  },
  {
    id: 3,
    title: "Borrow",
    text: "Cash or stablecoins",
    image: BORROW_PROFILE_FEATURE,
    // to: "/",
  },
];
export default PROFILE_FEATURE_ARRAY;
