import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddSuplier = ({ save }) => {
  const [name, setName] = useState("");
  const [bussiness_type, setbussiness_type] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [owner_name, setowner_name] = useState("");
  const [supply_chain_type, setsupply_chain_type] = useState("");
  const [reg_no, setreg_no] = useState("");
  const [logo, setLogo] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        className="rounded-pill px-0"
        style={{ width: "38px" }}
      >
        <i className="bi bi-plus"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Supplier</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel controlId="inputName" label="Name" className="mb-3">
              <Form.Control
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter name of supplier"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputbussiness_type"
              label="Bussiness Type"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Bussiness Type"
                onChange={(e) => {
                  setbussiness_type(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputAddress"
              label="Address"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputPhone"
              label="Phone"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Phone"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputWebsite"
              label="Website"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Website"
                onChange={(e) => {
                  setWebsite(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputowner_name"
              label="Owner Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Owner Name"
                onChange={(e) => {
                  setowner_name(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputsupply_chain_type"
              label="Supply chain time"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Supply Chain Type"
                onChange={(e) => {
                  setsupply_chain_type(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputreg_no"
              label="Registration No"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Registration No"
                onChange={(e) => {
                  setreg_no(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel controlId="inputLogo" label="Logo" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Logo"
                onChange={(e) => {
                  setLogo(e.target.value);
                }}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                save({
                  name,
                  bussiness_type,
                  address,
                  email,
                  phone,
                  website,
                  owner_name,
                  reg_no,
                  supply_chain_type,
                  logo,
                });
                handleClose();
              }}
            >
              Save Supplier
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddSuplier;
