import React from "react";
import { Card, CardBody, CardText, Container, Row, Col } from "reactstrap";
import { useAuth } from "../Auth/AuthContext";

const Address = () => {
  const { user } = useAuth();

  if (!user.address || user.address.length === 0) {
    return (
      <Container fluid className="bg-dark text-white min-vh-100 py-5">
        <h3 className="text-center border-bottom pb-3 mb-4">Your Addresses</h3>
        <p className="text-center text-muted">No address found for the user.</p>
      </Container>
    );
  }

  return (
    <Container fluid className="bg-dark text-white min-vh-1000  py-5" style={{height:'800px'}} >
      <h3 className="text-center border-bottom pb-3 mb-4">Your Addresses</h3>
      <Row className="g-4 justify-content-center px-3">
        {user.address.map((address) => (
          <Col key={address.id} xs="12" sm="6" md="4" lg="3">
            <Card className=" text-white h-100  shadow-sm" style={{width:'250px',backgroundColor:'#191919'}}>
              <CardBody>
                <CardText>
                  <strong>Street Address:</strong> {address.streetAddress}
                </CardText>
                <CardText>
                  <strong>City:</strong> {address.city}
                </CardText>
                <CardText>
                  <strong>State:</strong> {address.state}
                </CardText>
                <CardText>
                  <strong>Postal Code:</strong> {address.postalCode}
                </CardText>
                <CardText>
                  <strong>Country:</strong> {address.country}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Address;
