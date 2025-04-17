import React from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import { topMeel } from './topMeal';  // Assuming topMeel contains image and title info
import CarouselItem from './CarouselItem';

const MultiitemCarousel = () => {
  return (
    <Carousel interval={2000} controls={true} indicators={true}>
      {/* First Slide */}
      <Carousel.Item>
        <Row className="d-flex justify-content-between">
          {topMeel.slice(0, 5).map((item, index) => (
            <Col key={index} sm={2} className="mb-4">
              
              <CarouselItem image={item.image} title={item.title} />
            </Col>
          ))}
        </Row>
      </Carousel.Item>

      {/* Second Slide */}
      <Carousel.Item>
        <Row className="d-flex justify-content-between">
          {topMeel.slice(5, 10).map((item, index) => (
            <Col key={index} sm={2} className="mb-4">
              <CarouselItem image={item.image} title={item.title} />
            </Col>
          ))}
        </Row>
      </Carousel.Item>
    </Carousel>
  );
};

export default MultiitemCarousel;
