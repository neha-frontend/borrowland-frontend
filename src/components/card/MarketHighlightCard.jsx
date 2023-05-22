import {
  GRAPH_DOWN_SVG,
  GRAPH_UP_SVG,
  POLYGON_DOWN_SVG,
  POLYGON_UP_SVG,
} from "../../assets/images";

const MarketHighlightCard = ({
  cryptoIcon = "",
  cryptoName = "",
  cryptoValue = "1200",
  time = "",
  changeInPrice = "2",
  bgblue = "",
}) => {
  const price = changeInPrice.toString();
  const newPrice = price.replace("-", "");

  return (
    <div className="market_container_box">
      <div className={`market_box ${bgblue}`}>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img src={cryptoIcon} alt="logo" className=" crypto_logo" />
            <p className="btc_title">{cryptoName}</p>
          </div>
          <div>
            <img
              src={changeInPrice > 0 ? GRAPH_UP_SVG : GRAPH_DOWN_SVG}
              alt="graph"
              className="pr-3 graph_img"
            />
          </div>
        </div>
        <div className="d-flex mt-3 justify-content-between align-items-center">
          <div>
            <p className="btc_value">${cryptoValue}</p>
          </div>
          <div className="d-flex value_btc_box">
            <div>
              <p className={changeInPrice > 0 ? "green_font" : "red_font"}>
                {time}
              </p>
            </div>
            <div className="d-flex align-items-center">
              <img
                src={changeInPrice > 0 ? POLYGON_UP_SVG : POLYGON_DOWN_SVG}
                alt="up"
                className="mr-2 "
              />
              <p className={changeInPrice > 0 ? "green_font" : "red_font"}>
                {changeInPrice > 0 ? changeInPrice : newPrice}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketHighlightCard;
