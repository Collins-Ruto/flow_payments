import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button as BButton, Modal, Form, FloatingLabel } from "react-bootstrap";
// import { Button } from "../../components/utils";

const AddItem = ({ save }) => {


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [unit_price, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [sku, setSku] = useState("");
 

  
  console.log("first", typeof 0n);
  // const supplier_id = parseInt(5, 10);
  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

 

  return (
    <>
      <BButton
        onClick={handleShow}
        color="blue_gray_900_02"
        size="11xl"
        className="min-w-[115px] items-center gap-2 flex rounded-[28px]"
      >
        <i className="bi bi-plus"></i> + Create Item
      </BButton>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel controlId="floatingInput" label="Item Name">
              <Form.Control
                type="text"
                placeholder="Item Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Description">
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Category">
              <Form.Control
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Unit Price">
              <Form.Control
                type="text"
                placeholder="Unit Price"
                value={unit_price}
                onChange={(e) => setUnitPrice(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Quantity">
              <Form.Control
                type="text"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Weight">
              <Form.Control
                type="text"
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Dimensions">
              <Form.Control
                type="text"
                placeholder="Dimensions"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Manufacturer">
              <Form.Control
                type="text"
                placeholder="Manufacturer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="SKU">
              <Form.Control
                type="text"
                placeholder="SKU"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </FloatingLabel>
            {/* Set  */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <BButton variant="secondary" onClick={handleClose}>
            Close
          </BButton>
          <BButton
            variant="primary"
            onClick={() => {
              save({
                name,
                description,
                category,
                unit_price,
                quantity,
                weight,
                dimensions,
                manufacturer,
                sku,
              });
              handleClose();
            }}
          >
            Save
          </BButton>
        </Modal.Footer>
      </Modal>
      
    </>
  );
};

export default AddItem;
