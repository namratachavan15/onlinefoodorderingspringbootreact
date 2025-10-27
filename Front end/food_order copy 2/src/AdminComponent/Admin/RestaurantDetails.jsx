import React, { useEffect } from 'react';
import { Button, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useRestaurantContext } from '../../component/State/Restaurant/RestaurantContext';
import './RestaurantDetails.css'
const RestaurantDetails = () => {
  const { usersRestaurant, updateRestaurantStatus } = useRestaurantContext();

  useEffect(() => {
    if (usersRestaurant) {
      console.log("Restaurant", usersRestaurant);
    }
  }, [usersRestaurant]);

  const handleRestaurantStatus = () => {
    updateRestaurantStatus({
      restaurantId: usersRestaurant.id,
      jwt: localStorage.getItem("jwt")
    });
  };

  return (
    <div className='container-lg py-3 px-2'>
      {/* Header */}
      <div className='outer d-flex flex-column flex-md-row justify-content-between align-items-center mb-4'>
        <h1 className='text-center fw-bold text-white' style={{marginLeft:'150px'}}>{usersRestaurant?.name}</h1>
        <Button
          color={!usersRestaurant?.open ? "success" : "danger"}
          onClick={handleRestaurantStatus}
          className='mt-3 mt-md-0'
          size='lg'
        >
          {usersRestaurant?.open ? "Close" : "Open"}
        </Button>
      </div>

      {/* First Row: Full-width Restaurant Card */}
      <Row className=' text-white mb-4'>
        <Col xs={12}>
          <Card className='bg-dark text-white'>
            <CardHeader tag="h5" className='bg-secondary'>Restaurant</CardHeader>
            <CardBody>
              <div className='mb-3 d-flex'>
                <p className='me-3' style={{ width: '40%' }}>Owner</p>
                <p className='text-secondary mb-0'>{usersRestaurant?.owner?.fullName}</p>
              </div>
              <div className='mb-3 d-flex'>
                <p className='me-3' style={{ width: '40%' }}>Restaurant Name</p>
                <p className='text-secondary mb-0'>{usersRestaurant?.name}</p>
              </div>
              <div className='mb-3 d-flex'>
                <p className='me-3' style={{ width: '40%' }}>Cuisine Type</p>
                <p className='text-secondary mb-0'>{usersRestaurant?.cuisineType}</p>
              </div>
              <div className='mb-3 d-flex'>
                <p className='me-3' style={{ width: '40%' }}>Opening Hours</p>
                <p className='text-secondary mb-0'>{usersRestaurant?.openingHours}</p>
              </div>
              <div className='d-flex'>
                <p className='me-3' style={{ width: '40%' }}>Status</p>
                <p className='mb-0'>
                  {usersRestaurant?.open ? (
                    <span className='badge bg-success px-3 py-2'>Open</span>
                  ) : (
                    <span className='badge bg-danger px-3 py-2'>Closed</span>
                  )}
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Second Row: Address (left), Contact (right) */}
      <Row className='inner text-white'>
        {/* Address */}
        <Col xs={12} md={6} className='mb-4' style={{width:'350px'}}>
          <Card className='bg-dark text-white' style={{width: '284px',
    height: '271px'}}>
            <CardHeader tag="h5" className='bg-secondary'>Address</CardHeader>
            <CardBody>
              <div className='mb-3 d-flex'>
                <p className='me-3' style={{ width: '50%' }}>Country</p>
                <p className='text-secondary mb-0'>-{usersRestaurant?.address?.country}</p>
              </div>
              <div className='mb-3 d-flex'>
                <p className='me-3' style={{ width: '50%' }}>City</p>
                <p className='text-secondary mb-0'>-{usersRestaurant?.address?.city}</p>
              </div>
              <div className='mb-3 d-flex'>
                <p className='me-3' style={{ width: '50%' }}>Postal Code</p>
                <p className='text-secondary mb-0'>-{usersRestaurant?.address?.postalCode}</p>
              </div>
              <div className='d-flex'>
                <p className='me-3' style={{ width: '50%' }}>Street Address</p>
                <p className='text-secondary mb-0'>-{usersRestaurant?.address?.streetAddress}</p>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Contact */}
        <Col xs={12} md={6} className='mb-4'>
          <Card className='bg-dark text-white' style={{width: '284px',
    height: '271px'}}>
            <CardHeader tag="h5" className='bg-secondary'>Contact</CardHeader>
            <CardBody>
              <div className='mb-3 d-flex'>
                <p className='me-3' style={{ width: '50%' }}>Email</p>
                <p className='text-secondary mb-0 text-break'>{usersRestaurant?.contactInformation?.email}</p>
              </div>
              <div className='mb-3 d-flex'>
                <p className='me-3' style={{ width: '50%' }}>Mobile</p>
                <p className='text-secondary mb-0'>{usersRestaurant?.contactInformation?.mobile}</p>
              </div>
              <div className='d-flex'>
                <p className='me-3' style={{ width: '50%' }}>Social</p>
                <div className='d-flex gap-3 align-items-center'>
                  <a href={usersRestaurant?.contactInformation?.instagram} className='text-white' target='_blank' rel='noreferrer'>
                    <FaInstagram size={24} />
                  </a>
                  <a href={usersRestaurant?.contactInformation?.twitter} className='text-white' target='_blank' rel='noreferrer'>
                    <FaTwitter size={24} />
                  </a>
                  <a href={usersRestaurant?.contactInformation?.facebook} className='text-white' target='_blank' rel='noreferrer'>
                    <FaFacebook size={24} />
                  </a>
                  <a href={usersRestaurant?.contactInformation?.linklined} className='text-white' target='_blank' rel='noreferrer'>
                    <FaLinkedin size={24} />
                  </a>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RestaurantDetails;
