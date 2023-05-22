import { BITCOIN_SVG, USDC_SVG } from "../../assets/images";

const BORROW_FUND_ARRAY = [
  {
    id: 1,
    question: "Borrowed Amount",
    ans: "250 USDC",
    img: USDC_SVG,
  },
  {
    id: 2,
    question: "Tenure",
    ans: "3 Months",
    img: "",
  },
  {
    id: 3,
    question: "Collateral Amount",
    ans: "12.245 BTC",
    img: BITCOIN_SVG,
  },
  {
    id: 4,
    question: "Interest Rate",
    ans: "10%",
    img: "",
  },
  {
    id: 5,
    question: "Payable amount",
    ans: "$ 100 USDC",
    img: "",
  },
  {
    id: 6,
    question: "LTV Margin",
    ans: "10%",
    img: "",
  },
  {
    id: 7,
    question: "Liquidation LTV",
    ans: "2556 USDC",
    img: USDC_SVG,
  },
  {
    id: 8,
    question: "Due Date",
    ans: "12/11/2022",
    img: "",
  },
];

export default BORROW_FUND_ARRAY;
