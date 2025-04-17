import React, { useEffect } from 'react';
import { Button, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useRestaurantContext } from '../../component/State/Restaurant/RestaurantContext';

const RestaurantDetails = () => {
  const { usersRestaurant, updateRestaurantStatus } = useRestaurantContext();

  // Log the restaurant data if available
  useEffect(() => {
    if (usersRestaurant) {
      console.log("Restaurant", usersRestaurant);
    }
  }, [usersRestaurant]);

  const handleRestaurantStatus = () => {
    console.log("Status update clicked");
  console.log("status",usersRestaurant?.open)
    // Ensure the proper arguments are passed
    updateRestaurantStatus({
      restaurantId: usersRestaurant.id,
      jwt: localStorage.getItem("jwt")
    });
  };

  return (
    <div className='container-lg px-1 pb-1' style={{ padding: '10px', paddingLeft: '50px' }}>
      <div className='py-1 d-flex justify-content-center align-items-center gap-5'>
        <h1 className='text-2xl text-center font-weight-bold p-3'>{usersRestaurant?.name}</h1>
        <div>
          <Button
            color={!usersRestaurant?.open ? "success" : "danger"}
            className='py-2 px-4'
            onClick={handleRestaurantStatus}
            size='lg'
          >
            {usersRestaurant?.open ? "Close" : "Open"}
          </Button>
        </div>
      </div>

      <Row style={{ backgroundColor: '#000000', color: 'white', height: '600px' }}>
        <Col xs={12} style={{ backgroundColor: '#000000', color: 'white', height: '340px' }}>
          <Card className='w-100' style={{ backgroundColor: '#191919', color: 'white' }}>
            <CardHeader tag="h5">Restaurant</CardHeader>
            <CardBody>
              <div className='space-y-4'>
                <div className='d-flex'>
                  <p className='w-40'>Owner</p>
                  <p className='text-secondary'>
                    <span>{usersRestaurant?.owner.fullName}</span>
                  </p>
                </div>
                <div className='d-flex'>
                  <p className='w-40'>Restaurant Name</p>
                  <p className='text-secondary'>
                    <span>{usersRestaurant?.name}</span>
                  </p>
                </div>
                <div className='d-flex'>
                  <p className='w-40'>Cuisine Type</p>
                  <p className='text-secondary'>
                    <span>{usersRestaurant?.cuisineType}</span>
                  </p>
                </div>
                <div className='d-flex'>
                  <p className='w-40'>Opening Hours</p>
                  <p className='text-secondary'>
                    <span>{usersRestaurant?.openingHours}</span>
                  </p>
                </div>
                <div className='d-flex'>
                  <p className='w-40'>Status</p>
                  <p className='text-secondary'>
                    {usersRestaurant?.open ? (
                      <span className='px-5 py-2 rounded-full bg-success text-white'>Open</span>
                    ) : (
                      <span className='px-5 py-2 rounded-full bg-danger text-white'>Closed</span>
                    )}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xs={12} lg={6} style={{ height: '100px', marginTop: '-120px' }}>
          <Card className='w-100' style={{ backgroundColor: '#191919', color: 'white' }}>
            <CardHeader tag="h5">Address</CardHeader>
            <CardBody>
              <div className='space-y-1'>
                <div className='d-flex'>
                  <p className='w-50'>Country</p>
                  <p className='text-secondary'>
                    <span>-{usersRestaurant.address.country}</span>
                  </p>
                </div>
                <div className='d-flex'>
                  <p className='w-50'>City</p>
                  <p className='text-secondary'>
                    <span>-{usersRestaurant.address.city}</span>
                  </p>
                </div>
                <div className='d-flex'>
                  <p className='w-50'>Postal Code</p>
                  <p className='text-secondary'>
                    <span>-{usersRestaurant.address.postalCode}</span>
                  </p>
                </div>
                <div className='d-flex'>
                  <p className='w-50'>Street Address</p>
                  <p className='text-secondary'>
                    <span>-{usersRestaurant.address.streetAddress}</span>
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xs={12} lg={6} style={{ marginTop: '5px', height: '100px', marginTop: '-120px' }}>
          <Card className='w-100' style={{ backgroundColor: '#191919', color: 'white' }}>
            <CardHeader tag="h5">Contact</CardHeader>
            <CardBody>
              <div className='space-y-4'>
                <div className='d-flex'>
                  <p className='w-50'>Email</p>
                  <p className='text-secondary'>
                    <span>{usersRestaurant?.contactInformation?.email}</span>
                  </p>
                </div>
                <div className='d-flex'>
                  <p className='w-50'>Mobile</p>
                  <p className='text-secondary'>
                    <span>{usersRestaurant?.contactInformation?.mobile}</span>
                  </p>
                </div>
                <div className='d-flex'>
                  <p className='w-50'>Social</p>
                  <div className='d-flex text-secondary align-items-center pb-3 text-muted'>
                    <a href={usersRestaurant?.contactInformation?.instagram} className='pr-3 text-white'>
                      <FaInstagram style={{ fontSize: '3rem' }} />
                    </a>
                    <a href={usersRestaurant?.contactInformation?.twitter} className='pr-3 text-white'>
                      <FaTwitter style={{ fontSize: '3rem' }} />
                    </a>
                    <a href={usersRestaurant?.contactInformation?.facebook} className='pr-3 text-white'>
                      <FaFacebook style={{ fontSize: '3rem' }} />
                    </a>
                    <a href={usersRestaurant?.contactInformation?.linklined} className='pr-3 text-white'>
                      <FaLinkedin style={{ fontSize: '3rem' }} />
                    </a>
                  </div>
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
