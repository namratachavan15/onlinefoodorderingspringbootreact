import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Badge } from "reactstrap";
import { FaInstagram, FaTwitter, FaMapMarkerAlt } from "react-icons/fa";

const RestaurantCardSearch = ({ restaurant }) => {
  const address = restaurant.address;
  const contact = restaurant.contactInformation;

  return (
    <Card className="bg-dark text-white border border-secondary shadow-lg" style={{width:'350px'}}>
      <CardImg
        top
        width="100%"
        height="200px"
        src={restaurant.images?.[0] || "https://via.placeholder.com/400x250?text=No+Image"}
        alt={restaurant.name}
        className="object-cover"
      />
      <CardBody>
        <CardTitle tag="h5" className="text-pink">{restaurant.name}</CardTitle>
        <CardText><strong>Cuisine:</strong> {restaurant.cuisineType || "N/A"}</CardText>
        <CardText><strong>Description:</strong> {restaurant.description || "No description."}</CardText>

        {address && (
  <CardText className="d-flex align-items-center">
    <FaMapMarkerAlt className="text-danger me-2" />
    <span>
      {`${address.streetAddress}, ${address.city}, ${address.state || ""} ${address.postalCode}, ${address.country}`}
    </span>
  </CardText>
)}


        {contact?.mobile && <CardText><strong>Contact:</strong> {contact.mobile}</CardText>}
        {restaurant.openingHours && <CardText><strong>Hours:</strong> {restaurant.openingHours}</CardText>}

        <div className="d-flex flex-column gap-1 mt-2">
  {contact?.instagram && (
    <a
      href={`https://instagram.com/${contact.instagram}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-pink d-flex align-items-center"
    >
      <FaInstagram className="me-2" />
      {contact.instagram}
    </a>
  )}
  {contact?.twitter && (
    <a
      href={`https://twitter.com/${contact.twitter}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-info d-flex align-items-center"
    >
      <FaTwitter className="me-2" />
      {contact.twitter}
    </a>
  )}
</div>


        <div className="mt-2">
          <Badge color={restaurant.open ? "success" : "danger"}>
            {restaurant.open ? "Open Now" : "Closed"}
          </Badge>
        </div>
      </CardBody>
    </Card>
  );
};

export default RestaurantCardSearch;
