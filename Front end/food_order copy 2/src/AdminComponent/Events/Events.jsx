import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import EventCard from './EventCard';
import { useRestaurantContext } from '../../component/State/Restaurant/RestaurantContext';


const initialValues = {
  image: '',
  location: '',
  name: '',
  startedAt: '', // Default for datetime-local
  endsAt: '', // Default for datetime-local
};

const Events = () => {
  const { events, loading, error, getAllEvents, createEvent,usersRestaurant } = useRestaurantContext()
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);

  const jwt=localStorage.getItem('jwt')
  // Fetch events on mount
  useEffect(() => {
    getAllEvents(jwt);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("jwt in event",jwt)
  console.log("user id is in event",usersRestaurant.id)

const handleSubmit = (e) => {
  e.preventDefault();
 
  if (!usersRestaurant || !usersRestaurant.id) {
    console.error("Restaurant ID is missing.");
    return; // Prevent submission if Restaurant ID is not available
  }

  createEvent({ eventData: formValues, jwt, restaurantId: usersRestaurant.id });
  setFormValues(initialValues); // Reset the form after submission
  handleClose();
};

  
  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{marginTop:'20px',marginLeft:'50px'}}>
      <Button onClick={handleOpen} style={{backgroundColor:"#E91E63"}}>
        Create Event
      </Button>
      <Modal isOpen={open} toggle={handleClose}>
        
        <ModalBody  style={{ backgroundColor: '#191919', color: 'white' }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="image">Image URL</Label>
              <Input
                type="text"
                name="image"
                id="image"
                value={formValues.image}
                onChange={handleFormChange}
                placeholder="Enter Image URL"
                style={{ backgroundColor: '#333', color: 'white', borderColor: 'gray' }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="location">Location</Label>
              <Input
                type="text"
                name="location"
                id="location"
                value={formValues.location}
                onChange={handleFormChange}
                placeholder="Enter Event Location"
                style={{ backgroundColor: '#333', color: 'white', borderColor: 'gray' }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Event Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formValues.name}
                onChange={handleFormChange}
                placeholder="Enter Event Name"
                style={{ backgroundColor: '#333', color: 'white', borderColor: 'gray' }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="startedAt">Start Date and Time</Label>
              <Input
                type="datetime-local"
                name="startedAt"
                id="startedAt"
                value={formValues.startedAt}
                onChange={handleFormChange}
                style={{ backgroundColor: '#333', color: 'white', borderColor: 'gray' }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="endsAt">End Date and Time</Label>
              <Input
                type="datetime-local"
                name="endsAt"
                id="endsAt"
                value={formValues.endsAt}
                onChange={handleFormChange}
                style={{ backgroundColor: '#333', color: 'white', borderColor: 'gray' }}
              />
            </FormGroup>
            <ModalFooter>
              <Button type="submit" style={{backgroundColor:"#E91E63"}}>
                Submit
              </Button>
              <Button color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>

      <div className="mt-4">
        <h3>Events</h3>
        <div className="d-flex flex-wrap gap-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
