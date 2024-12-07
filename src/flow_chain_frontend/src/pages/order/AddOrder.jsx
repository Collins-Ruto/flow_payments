import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button as BButton, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddOrder = ({ save }) => {
  const [order_name, setOrderName] = useState("");
  const [expected_delivery, setExpectedDelivery] = useState("");
  const [pickup_address, setPickupAddress] = useState("");
  const [delivery_address, setDeliveryAddress] = useState("");
  const [order_type, setOrderType] = useState("");
  const [order_weight, setOrderWeight] = useState("");
  const [priority, setPriority] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);// This is an array of objects with the following keys: item_id: u64, quantity: u64,
  const [item_id, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateItems = (newItemId, newQuantity) => {
    if (newItemId && newQuantity && !isNaN(newItemId) && !isNaN(newQuantity)) {
      const newItem = {
        item_id: parseInt(newItemId, 10),
        quantity: parseInt(newQuantity, 10),
      };
      setItems((prevItems) => {
        // Prevent duplicates based on `item_id`
        const existingIndex = prevItems.findIndex((item) => item.item_id === newItem.item_id);
        if (existingIndex !== -1) {
          // Update the quantity of an existing item
          const updatedItems = [...prevItems];
          updatedItems[existingIndex] = newItem;
          return updatedItems;
        }
        // Add a new item if it doesn't exist
        return [...prevItems, newItem];
      });
    }
  };

  const handleItemIdChange = (value) => {
    setItemId(value);
    updateItems(value, quantity);
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
    updateItems(item_id, value);
  };

  return (
    <>
      <BButton
        onClick={handleShow}
        color="blue_gray_900_02"
        size="11xl"
        className="min-w-[115px] items-center gap-2 flex rounded-[28px]"
      >
        <i className="bi bi-plus"></i> Create Order 
      </BButton>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel controlId="floatingInput" label="Order Name">
              <Form.Control
                type="text"
                placeholder="Order Name"
                value={order_name}
                onChange={(e) => setOrderName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Expected Delivery">
              <Form.Control
                type="date"
                placeholder="Expected Delivery"
                value={expected_delivery}
                onChange={(e) => setExpectedDelivery(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Pickup Address">
              <Form.Control
                type="text"
                placeholder="Pickup Address"
                value={pickup_address}
                onChange={(e) => setPickupAddress(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Delivery Address">
              <Form.Control
                type="text"
                placeholder="Delivery Address"
                value={delivery_address}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Order Type">
              <Form.Control
                type="text"
                placeholder="Order Type"
                value={order_type}
                onChange={(e) => setOrderType(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Order Weight">
              <Form.Control
                type="text"
                placeholder="Order Weight"
                value={order_weight}
                onChange={(e) => setOrderWeight(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Priority">
              <Form.Control
                type="text"
                placeholder="Priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Vehicle Type">
              <Form.Control
                type="text"
                placeholder="Vehicle Type"
                value={vehicle_type}
                onChange={(e) => setVehicleType(e.target.value)}
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
            {/* Set Items */}
            <FloatingLabel controlId="floatingItemId" label="Item ID">
              <Form.Control
                type="number"
                placeholder="Item ID"
                value={item_id}
                onChange={(e) => setItemId(e.target.value)}
              />
            </FloatingLabel>
            <br />

            <FloatingLabel controlId="floatingQuantity" label="Quantity">
              <Form.Control
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FloatingLabel>
            
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
                order_name,
                expected_delivery,
                pickup_address,
                delivery_address,
                order_type,
                order_weight,
                priority,
                vehicle_type,
                category,
                items,
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

export default AddOrder;
