import { Accordion } from 'react-bootstrap';

import './Accordian.css';

const Accordian = ({ header = 'Accordian Header', children }) => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{header}</Accordion.Header>
        <Accordion.Body>{children}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Accordian;
