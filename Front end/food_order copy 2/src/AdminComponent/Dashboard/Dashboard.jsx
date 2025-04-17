import React from 'react';
import MenuTable from './../Menu/MenuTable';
import OrderTable from '../Orders/OrderTable';
import { Row, Col } from 'reactstrap';

const Dashboard = () => {
  return (
    <div>
      <Row>
        <Col xs="12" md="6" lg="6" xl="6" className="mb-4">
          <MenuTable />
        </Col>
        <Col xs="12" md="6" lg="6" xl="6">
          <OrderTable filterValue={"ALL"} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
