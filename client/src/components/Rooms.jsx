import React, { useState } from "react";
import { Card, Col, Row, Modal, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function Rooms({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Row className="mt-5 border shadow p-3 mb-2 bg-white rounded">
      <Col md={4}>
        {room.imageurls && room.imageurls.length > 0 ? (
          <img
            src={room.imageurls[0]}
            className="smallimg h-100 w-100 rounded"
            alt={`Room image for ${room.name}`}
          />
        ) : (
          <img
            src="https://via.placeholder.com/150"
            className="smallimg h-100 w-100 rounded"
            alt="Default room image"
          />
        )}
      </Col>
      <Col md={7} className="text-start pt-3">
        <h4 className="text-black">{room.name}</h4>
        <b className="font-monospace">
          <p>Room No: {room.room_no}</p>
          <p>No of Beds: {room.no_of_beds}</p>
          <p>Amenities: {room.amenities}</p>
          <p>Rent Per Day: {room.rentperday}</p>
          <p>Note: Min 1 day, max 30 days</p>
        </b>
        <div style={{ float: "right" }} className="pb-3 justify-content-evenly">
          {fromdate && todate && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <Button variant="dark" style={{ marginRight: "10px" ,backgroundColor:'black'}} >
                Book Now
              </Button>
            </Link>
          )}
          <Button variant="dark" onClick={handleShow} style={{backgroundColor:'black'}}>
            View Details
          </Button>
        </div>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{room.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel>
              {room.imageurls && room.imageurls.length > 0 ? (
                room.imageurls.map((url, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={url}
                      alt={`Room image ${index + 1}`}
                      style={{ maxHeight: "500px", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null; // prevents looping
                        e.target.src = "https://via.placeholder.com/800x400?text=Image+not+found";
                      }}
                    />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/800x400?text=No+Images+Available"
                    alt="No images available"
                  />
                </Carousel.Item>
              )}
            </Carousel>
            <p>{room.description}</p>
            <h4>Contact: {room.phonenumber}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} style={{backgroundColor:'black'}}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
}

export default Rooms;
