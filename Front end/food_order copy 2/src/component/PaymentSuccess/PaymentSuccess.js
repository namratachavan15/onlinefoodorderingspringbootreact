import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'reactstrap';
import { FaCheckCircle } from 'react-icons/fa'; // React Icons Check Circle Icon

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="min-vh-100 d-flex justify-content-center align-items-center px-5" >
      <Row className="w-100 justify-content-center" >
        <Col xs="12" lg="4" className="d-flex flex-column align-items-center">
          <Card className="p-5 w-100 rounded" style={{backgroundColor:'#191919',border:'0.5rem solid',color:'white'}}>
            <FaCheckCircle size={80} color="green" style={{marginLeft:'150px'}}/>
            <h1 className="py-3 text-center font-weight-bold">Order Success</h1>
            <p className="text-center text-gray-600">Thank you for choosing our restaurant</p>
            <p className="text-center text-secondary" style={{ fontSize: '18px' }}>Have A Great Day!</p>
            <Button
              onClick={() => navigate("/")}
              
              className="w-100 py-3"
              style={{ marginTop: '1rem',backgroundColor:'#E91E63' }}
            >
              Go To Home
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentSuccess;
