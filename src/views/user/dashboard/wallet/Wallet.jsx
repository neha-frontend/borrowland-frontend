import { Tab, Tabs } from "react-bootstrap";

import Saving from "./Saving";
import CreditLine from "./CreditLine";
import Market from "./Market";

import "./index.css";

const Wallet = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="saving"
        id="wallet_tab"
        className="wallet_tabs_container"
      >
        <Tab eventKey="market" title="Market">
          <Market />
        </Tab>
        <Tab eventKey="saving" title="Saving Wallet">
          <Saving />
        </Tab>
        <Tab eventKey="credit" title="Credit Line Wallet">
          <CreditLine />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Wallet;
