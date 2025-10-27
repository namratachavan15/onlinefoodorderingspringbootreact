import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Label, Input } from 'reactstrap';
import OrderTable from './OrderTable';


const orderStatus = [
  { "label": "Pending", value: "PENDING" },
  { "label": "Completed", value: "COMPLETED" },
  { "label": "All", value: "ALL" },
];

const Order = () => {
  const [filterValue, setFilterValue] = useState("ALL"); // Default to 'ALL' to show all orders initially

  const handleFilter = (e) => {
    setFilterValue(e.target.value); // Update the filter value when the radio button is selected
  };

  return (
    <div className="px-2">
      <Card className="p-5 w-100" style={{ backgroundColor: '#191919', color: 'white' }}>
        <CardHeader>
          <h5>Order Status</h5>
        </CardHeader>
        <CardBody>
          <FormGroup row>
            {orderStatus.map((item) => (
              <Col sm="4" key={item.value}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="category"
                      value={item.value}
                      onChange={handleFilter}
                      checked={filterValue === item.value} // Check if the value matches the filterValue
                    />
                    {item.label}
                  </Label>
                </FormGroup>
              </Col>
            ))}
          </FormGroup>
        </CardBody>
      </Card>
      <OrderTable filterValue={filterValue} /> {/* Pass filterValue to OrderTable */}
    </div>
  );
};

export default Order;
