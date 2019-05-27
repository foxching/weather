import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class ActionModal extends Component {
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Change Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="mb-3">
              <Form.Group>
                <Form.Label>Enter City Name</Form.Label>
                {this.props.error && (
                  <p style={{ color: "red", fontSize: "15px" }}>
                    {this.props.error}
                  </p>
                )}
                <Form.Control
                  type="text"
                  name="location"
                  value={this.props.value}
                  onChange={this.props.handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="right"
              onClick={this.props.handleChangeLocation}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ActionModal;
