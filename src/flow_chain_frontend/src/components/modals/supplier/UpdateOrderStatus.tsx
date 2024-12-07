import React, { useState } from 'react';

interface UpdateOrderStatusProps {
    orderId: string;
    currentStatus: string;
    onUpdate: (orderId: string, status: string) => void;
}

const UpdateOrderStatus: React.FC<UpdateOrderStatusProps> = ({ orderId, currentStatus, onUpdate }) => {
    const [status, setStatus] = useState(currentStatus);

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    };

    const handleSubmit = () => {
        onUpdate(orderId, status);
    };

    return (
        <div>
            <h2>Update Order Status</h2>
            <p>Order ID: {orderId}</p>
            <select value={status} onChange={handleStatusChange}>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>
            <button onClick={handleSubmit}>Update Status</button>
        </div>
    );
};

export default UpdateOrderStatus;