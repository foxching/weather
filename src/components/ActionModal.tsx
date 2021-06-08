import React, { ChangeEvent } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface MProps {
  show: boolean;
  onHide: () => void;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  handleChangeLocation: () => void;
  error: string | undefined;
}

const ActionModal: React.FC<MProps> = ({
  show,
  onHide,
  location,
  setLocation,
  handleChangeLocation,
  error,
}) => {
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
                onChange={(e: any) => setLocation(e.target.value)}
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
};

export default ActionModal;
