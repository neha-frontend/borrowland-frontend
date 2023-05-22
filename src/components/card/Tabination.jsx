import { Tab, Tabs } from "react-bootstrap";
import TableCard from "./TableCard";

import "./index.css";
import StableTableCard from "./StableTableCard";
import FiatTableCard from "./FiatTableCard";

const Tabination = () => {
  return (
    <>
      <Tabs
        defaultActiveKey="assets"
        id="uncontrolled-tab-example"
        className="mb-4 mt-4 plr_30"
      >
        <Tab eventKey="assets" title="All assets">
          <TableCard />
        </Tab>
        <Tab eventKey="crypto" title="Crypto">
          <TableCard />
        </Tab>
        <Tab eventKey="stablecoin" title="Stable coin">
          <StableTableCard />
        </Tab>
        <Tab eventKey="fiat" title="Fiat">
          <FiatTableCard />
        </Tab>
      </Tabs>
    </>
  );
};

export default Tabination;
