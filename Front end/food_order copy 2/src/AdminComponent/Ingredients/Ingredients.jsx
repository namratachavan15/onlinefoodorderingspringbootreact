import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import IngredientTable from './IngredientTable';
import IngredientCategoryTable from './IngredientCategoryTable';


const Ingredients = () => {
  return (
    <div className='px-2'>
      <Container>
        <Row>
          <Col xs={12} lg={8}>
            <IngredientTable/>
          </Col>
          <Col xs={12} lg={4}>
            <IngredientCategoryTable/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Ingredients;
