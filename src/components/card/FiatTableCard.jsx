import { Table } from "react-bootstrap";

import { NoDataFound } from "components";

import "./index.css";

const FiatTableCard = () => {
  return (
    <>
      <div className="plr_30" id="my_table">
        <div className="scroll_table">
          <Table>
            <thead>
              {/* <tr>
                <th className="sr_num">#</th>
                <th>Name</th>
                <th>Balance</th>
                <th>Market Place</th>
                <th>Credit Line</th>
                <th>Earn interset</th>
                <th />
              </tr> */}
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="px-0">
                  <NoDataFound text="Coming Soon !" />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default FiatTableCard;
