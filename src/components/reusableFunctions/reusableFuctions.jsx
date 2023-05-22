import {
  USDC_ICON_DROPDOWN,
  TETHER_ICON_DROPDOWN,
  ETH_ICON_DROPDOWN,
  BTC_ICON_DROPDOWN,
  BITCOIN_SVG,
  TETHER_NEW_SVG,
  DOWN_ARROW_SVG,
  DANGER_ICON_SVG,
  SWAP,
  BORROW,
  LOAN_ICON_SVG,
  GIFT_ICON_SVG,
  ARROW_UP_SVG,
  USDC_SVG,
  ETHEREUM_SVG,
} from "assets/images";

export const setUTCtimestamp = (val) => {
  var d = new Date(val);
  var newDate = d.toUTCString();
  return newDate;
};

export const setLocalTimestamp = (val, hourFormat = "h12") => {
  var d = new Date(val);
  var newDate = d.toLocaleString("en-GB", {
    timeStyle: "medium",
    hourCycle: hourFormat,
    dateStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  return newDate;
};

export const handleSetDropDown = (value) => {
  const asset_icon =
    value === "BTC"
      ? BTC_ICON_DROPDOWN
      : value === "ETH"
      ? ETH_ICON_DROPDOWN
      : value === "USDC"
      ? USDC_ICON_DROPDOWN
      : TETHER_ICON_DROPDOWN;
  return asset_icon;
};

export const dropDownCurrency = [
  {
    id: 1,
    icon: BTC_ICON_DROPDOWN,
    name: "BTC",
  },
  {
    id: 2,
    icon: ETH_ICON_DROPDOWN,
    name: "ETH",
  },
  {
    id: 3,
    icon: USDC_ICON_DROPDOWN,
    name: "USDC",
  },
  {
    id: 4,
    icon: TETHER_ICON_DROPDOWN,
    name: "USDT",
  },
];

export const assetIcon = (value) => {
  const asset_icon =
    value === "BTC"
      ? BITCOIN_SVG
      : value === "ETH"
      ? ETHEREUM_SVG
      : value === "USDC"
      ? USDC_SVG
      : TETHER_NEW_SVG;
  return asset_icon;
};
export const setTokenIcon = (token) => {
  /* ETH BTC USDC USDT SWAP */
  const tokenIcon =
    token === "ETH"
      ? ETHEREUM_SVG
      : token === "BTC"
      ? BITCOIN_SVG
      : token === "USDC"
      ? USDC_SVG
      : token === "USDT"
      ? TETHER_NEW_SVG
      : "SWAP";
  return tokenIcon;
};

// transactions
export const setActionIcon = (action) => {
  /* Deposit Withdraw Gift Penalty Loan Swap */
  const actionIcon =
    action === "Deposit"
      ? ARROW_UP_SVG
      : action === "Withdraw"
      ? DOWN_ARROW_SVG
      : action === "Gift"
      ? GIFT_ICON_SVG
      : action === "Penalty"
      ? DANGER_ICON_SVG
      : action === "Loan"
      ? LOAN_ICON_SVG
      : action === "Swap"
      ? SWAP
      : BORROW;
  return actionIcon;
};

export const formatDate = (date, type = "", sep = "-") => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (type === "YYYY-MM-DD") {
    return [year, month, day].join(sep);
  }
  if (type === "DD-MM-YYYY") {
    return [day, month, year].join(sep);
  }
};

export const formatTime = (date, isSecond = true) => {
  let d = new Date(date);
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  if (hours < 9) hours = "0" + hours;
  if (minutes < 9) minutes = "0" + minutes;
  if (seconds < 9) seconds = "0" + seconds;

  if (isSecond) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${hours}:${minutes}`;
  }
};

export const FixedTermsStatus = (due) => {
  var dueDate = new Date(due);
  var today = new Date();

  if (dueDate > today) {
    return "Cancelled";
  } else {
    return "Completed";
  }
};

// borrow page
export const platformFeesValue = (loanAmount, platformFees) => {
  const v = (loanAmount * platformFees) / 100;
  return v;
};

export const interestPayoutValue = (loanAmount, interest, tenure) => {
  const v = loanAmount * ((interest / (12 * 100)) * tenure);
  return v;
};

export const collateralUSD = (loanAmount, collateral) => {
  const v = (loanAmount * collateral) / 100;
  if (v < 0.00000001) {
    return parseFloat(v);
  } else {
    return parseFloat(v).toFixed(8);
  }
};

export const collateralCrypto = (collateralUSD, marketPrice) => {
  return collateralUSD / marketPrice;
};

export const payableAmountValue = (
  loanAmount,
  interest,
  platformFees,
  tenure
) => {
  var pay =
    loanAmount +
    interestPayoutValue(loanAmount, interest, tenure) +
    platformFeesValue(loanAmount, platformFees);
  if (pay < 0.00000001) {
    return parseFloat(pay);
  } else {
    return parseFloat(pay).toFixed(8);
  }
};

export const tenureValue = (tenure) => {
  var t = tenure.split(" ");
  return parseFloat(t[0]);
};

export const LTVvalue = (ltvType) => {
  var t = ltvType.split(" ");
  return parseInt(t[0]);
};

export const CountLoanAmount = (collateral, LTV) => {
  var loanVal = (collateral * LTV) / 100;
  return loanVal;
};

export const loanDueDate = (val) => {
  var t = new Date();
  if (val) {
    t.setMonth(t.getMonth() + val);
  }
  return formatDate(t, "DD-MM-YYYY", "/");
};

// wallet page
export const walletTotalBalance = (val) => {
  var bal = val + (val * 2.5) / 100;
  return bal;
};

// borrow - new formula
export const collateralAsPerLTVinUSD = (collateralAmountInUSD, LTVvalue) => {
  const a = (collateralAmountInUSD * LTVvalue) / 100;
  return a;
};

export const collateralAmountInToken = (collateralAmountInUSD, marketPrice) => {
  const v = collateralAmountInUSD / marketPrice;
  return v;
};

export const countLoanAmountInUSD = (collateralAmountInUSD, ltvValue) => {
  const v = (collateralAmountInUSD * ltvValue) / 100;
  return v;
};

export const countCollateralAmount = (loanAmountInUSD, ltvValue) => {
  const v = (loanAmountInUSD * ltvValue) / 100;
  return v;
};

export const countLoanAmountInToken = (
  collateralAmountInUSD,
  ltvValue,
  marketPrice
) => {
  const loan = countLoanAmountInUSD(collateralAmountInUSD, ltvValue);
  const v = loan / marketPrice;
  return v;
};

export const countLoanAmountInTokenCopy = (
  collateralAmountInUSD,
  ltvValue,
  marketPrice
) => {
  // const loan = countLoanAmountInUSD(collateralAmountInUSD, ltvValue)
  // const v = loan / marketPrice
  const value = collateralAmountInUSD / marketPrice;
  return value;
};

export const shortenWalletAddress = (addr) => {
  const address =
    addr && addr.length > 10 ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : addr;
  return address;
};
