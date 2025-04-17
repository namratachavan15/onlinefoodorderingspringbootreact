import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';

const EventCard = ({ event }) => {
  return (
    <div>
      <Card style={{ width: '18rem',backgroundColor: '#212529', color: 'white', borderColor: 'gray'}}>
        {/* CardImg is the equivalent of CardMedia in reactstrap */}
        <CardImg
          top
          width="100%"
          src={event.image || 'https://cdn.pixabay.com/photo/2017/01/13/03/02/burgers-1976198_1280.jpg'}
          alt={event.name}
        />
        <CardBody>
          {/* CardTitle is the equivalent of Typography variant="h5" */}
          <CardTitle tag="h5">{event.name}</CardTitle>
          {/* CardText is the equivalent of Typography variant="body2" */}
          <CardText>{event.description || 'No description available'}</CardText>
          <div className="py-2">
            <p>{event.location}</p>
            <p className="text-gray-700">
              {event.startedAt ? new Date(event.startedAt).toLocaleString() : 'N/A'}
            </p>
            <p className="text-danger">
              {event.endsAt ? new Date(event.endsAt).toLocaleString() : 'N/A'}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EventCard;
