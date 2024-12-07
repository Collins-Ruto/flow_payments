import React from "react";
import { toast } from "react-toastify";

const ActiveOrders = ({ orders }) => {
    const { company_id, company_name, order_name, expected_delivery, delivery, pickup_address, delivery_address, order_status } = orders;

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{order_name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{company_name}</h6>
                    <p className="card-text">
                        <strong>Expected Delivery:</strong> {expected_delivery}
                    </p>
                    <p className="card-text">
                        <strong>Delivery:</strong> {delivery}
                    </p>
                    <p className="card-text">
                        <strong>Pickup Address:</strong> {pickup_address}
                    </p>
                    <p className="card-text">
                        <strong>Delivery Address:</strong> {delivery_address}
                    </p>
                    <p className="card-text">
                        <strong>Order Status:</strong> {order_status}
                    </p>
                    <button className="btn btn-primary">Accept Order</button>
                </div>
            </div>  
        </>
    );
}

export default ActiveOrders;