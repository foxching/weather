import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ActionModal({
  show,
  onHide,
  error,
  location,
  handleChange,
  handleChangeLocation
}) {
  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Change Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mb-3">
            <Form.Group>
              <Form.Label>Enter City Name</Form.Label>
              {error && (
                <p style={{ color: "red", fontSize: "15px" }}>{error}</p>
              )}
              <Form.Control
                type="text"
                name="location"
                value={location}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="right"
            onClick={handleChangeLocation}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ActionModal;
