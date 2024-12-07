// src/flowchain_test_backend/models.rs

use candid::{CandidType, Principal};
// use serde::{Deserialize, Serialize};

// Client Company Struct 
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Client {
    pub(crate) id: u64,
    pub(crate) name: String,
    pub(crate) bussiness_type: String,
    pub(crate) industry: String,
    pub(crate) address: String,
    pub(crate) email: String,
    pub(crate) phone: String,
    pub(crate) website: String,
    pub(crate) owner: Principal,
    pub(crate) owner_name: String,
    pub(crate) reg_no: String,
    pub(crate) logo: String,
    pub(crate) affiliated_companies: Vec<String>,
    pub(crate) products: Vec<String>,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct OrderItem {
    pub(crate) item_id: u64,
    pub(crate) quantity: u64,
}

// Update the Order struct to use OrderItem
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Order {
    pub id: u64,
    pub(crate) company_id: u64,
    pub(crate) company_name: String,
    pub(crate) order_name: String,
    pub(crate) expected_delivery: String,
    pub(crate) delivery: Option<String>,
    pub(crate) driver_id: Option<String>,
    pub(crate) supplier_id: Option<String>,
    pub(crate) pickup_address: String,
    pub(crate) delivery_address: String,
    pub(crate) order_status: String,
    pub(crate) order_type: String,
    pub(crate) order_weight: String,
    pub(crate) priority: String,
    pub(crate) vehicle_type: String,
    pub(crate) category: String,
    pub(crate) items: Vec<OrderItem>, // Updated to use OrderItem
}

// First, add these structs to your models.rs file:
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Bid {
    pub id: u64,
    pub(crate) order_id: u64,
    pub(crate) supplier_id: u64,
    pub(crate) supplier_name: String,
    pub(crate) amount: u64,
    pub(crate) delivery_time: String,  // Estimated delivery time
    pub(crate) notes: String,
    pub(crate) status: BidStatus,     // Pending, Approved, Rejected
    pub(crate) created_at: String,
    pub(crate) updated_at: String,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum BidStatus {
    Pending,
    Approved,
    Rejected,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct BidPayload {
    pub(crate) order_id: u64,
    pub(crate) amount: u64,
    pub(crate) delivery_time: String,
    pub(crate) notes: String,
}


// Item Details Struct
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct ItemDetails {
    pub(crate) id: u64,
    pub(crate) name: String,
    pub(crate) description: String,
    pub(crate) category: String,
    pub(crate) unit_price: u64,
    pub(crate) quantity: u64,
    pub(crate) weight: String,
    pub(crate) dimensions: String,
    pub(crate) manufacturer: String,
    pub(crate) sku: String,  // Stock Keeping Unit
    pub(crate) status: String, // e.g., "In Stock", "Out of Stock"
    pub(crate) client_id: Option<u64>,
    pub(crate) supplier_id: Option<u64>,
    pub(crate) created_at: String,
    pub(crate) updated_at: String,
}
// Payload struct for creating/updating items
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct ItemDetailsClientPayload {
    pub(crate) name: String,
    pub(crate) description: String,
    pub(crate) category: String,
    pub(crate) unit_price: u64,
    pub(crate) quantity: u64,
    pub(crate) weight: String,
    pub(crate) dimensions: String,
    pub(crate) manufacturer: String,
    pub(crate) sku: String,
    pub(crate) client_id: Option<u64>,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct ItemDetailsSupplierPayload {
    pub(crate) name: String,
    pub(crate) description: String,
    pub(crate) category: String,
    pub(crate) unit_price: u64,
    pub(crate) quantity: u64,
    pub(crate) weight: String,
    pub(crate) dimensions: String,
    pub(crate) manufacturer: String,
    pub(crate) sku: String,
    pub(crate) supplier_id: Option<u64>,
}

// Maintainance Record Struct
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct MaintainanceRecord {
    pub(crate) id: u64,
    pub(crate) vehicle_reg_no: String,
    pub(crate) date: String,
    pub(crate) description: String,
    pub(crate) cost: String,
    pub(crate) mechanic: String,
    pub(crate) mechanic_contact: String,
    pub(crate) mechanic_address: String,
    pub(crate) mechanic_email: String,
    pub(crate) mechanic_phone: String,
}
// Driver Struct
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Driver{
    pub(crate) id: u64,
    pub(crate) owner: Principal,
    pub(crate) full_name: String,
    pub(crate) contact_info: String,
    pub(crate) trainings: Vec<String>,
    pub(crate) experience: String,
    pub(crate) license_no: String,
    pub(crate) license_expiry: String,
    pub(crate) vehicle_make: String,
    pub(crate) vehicle_model: String,
    pub(crate) vehicle_type: String,
    pub(crate) vehicle_reg_no: String,
    pub(crate) maintenance_records: Vec<MaintainanceRecord>,
    pub(crate) company: String,
    pub(crate) driver_rating: u64,
    pub(crate) driver_status: String,
}
// Supplier Company Struct
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Supplier {
    pub(crate) id: u64,
    pub(crate) name: String,
    pub(crate) bussiness_type: String,
    pub(crate) address: String,
    pub(crate) email: String,
    pub(crate) phone: String,
    pub(crate) website: String,
    pub(crate) owner: Principal,
    pub(crate) owner_name: String,
    pub(crate) supply_chain_type: String,
    pub(crate) reg_no: String,
    pub(crate) logo: String,
    pub(crate) drivers: Vec<Driver>,
    pub(crate) reviews: Vec<String>,
}
// Quotation Struct
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Quotation {
    pub(crate) id: u64,
    pub(crate) quotation_title: String,
    pub(crate) supplier_id: u64,
    pub(crate) order_id: u64,
    pub(crate) supplier_name: String,
    pub(crate) supplier_address: String,
    pub(crate) supplier_email: String,
    pub(crate) service_description: String,
    pub(crate) shipping_cost: u64,
    pub(crate) quotation_status: String,
}

// Client Company Payload
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct ClientCompanyPayload {
    pub(crate) name: String,
    pub(crate) bussiness_type: String,
    pub(crate) industry: String,
    pub(crate) address: String,
    pub(crate) email: String,
    pub(crate) phone: String,
    pub(crate) website: String,
    pub(crate) owner_name: String,
    pub(crate) reg_no: String,
    pub(crate) logo: String,
}

// Maintainance Record Payload
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct MaintainanceRecordPayload {
    pub(crate) vehicle_reg_no: String,
    pub(crate) date: String,
    pub(crate) description: String,
    pub(crate) cost: String,
    pub(crate) mechanic: String,
    pub(crate) mechanic_contact: String,
    pub(crate) mechanic_address: String,
    pub(crate) mechanic_email: String,
    pub(crate) mechanic_phone: String,
}

// Driver Payload
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct DriverPayload {
    pub(crate) full_name: String,
    pub(crate) contact_info: String,
    pub(crate) experience: String,
    pub(crate) license_no: String,
    pub(crate) license_expiry: String,
    pub(crate) vehicle_make: String,
    pub(crate) vehicle_model: String,
    pub(crate) vehicle_type: String,
    pub(crate) vehicle_reg_no: String,
    pub(crate) trainings: Vec<String>,
    pub(crate) company: String,
}

// Supplier Company Payload
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct SupplierCompanyPayload {
    pub(crate) name: String,
    pub(crate) bussiness_type: String,
    pub(crate) address: String,
    pub(crate) email: String,
    pub(crate) phone: String,
    pub(crate) website: String,
    pub(crate) owner_name: String,
    pub(crate) supply_chain_type: String,
    pub(crate) reg_no: String,
    pub(crate) logo: String,
}

// Order Details Payload
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct OrderDetailsPayload {
    pub(crate) company_id: u64,
    pub(crate) order_name: String,
    pub(crate) expected_delivery: String,
    pub(crate) pickup_address: String,
    pub(crate) delivery_address: String,
    pub(crate) order_type: String,
    pub(crate) order_weight: String,
    pub(crate) priority: String,
    pub(crate) vehicle_type: String,
    pub(crate) category: String,
    pub(crate) items: Vec<OrderItem>,
}

// Quotation Payload
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct QuotationPayload {
    pub(crate) quotation_title: String,
    pub(crate) order_id: u64,
    pub(crate) service_description: String,
    pub(crate) shipping_cost: u64,
}

// Update Driver Payload
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct UpdateDriverPayload {
    pub(crate) id: u64,
    pub(crate) contact_info: String,
    pub(crate) experience: String,
    pub(crate) license_expiry: String,
    pub(crate) vehicle_make: String,
    pub(crate) vehicle_model: String,
    pub(crate) vehicle_type: String,
    pub(crate) vehicle_reg_no: String,
    pub(crate) company: String,
}

// Completion Payload
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct CompletionPayload {
    pub(crate) id: u64,
    pub(crate) condition: String,
    pub(crate) review: String,
}

// Reserve Payment Struct
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct ReservePayment {
    pub(crate) supplier_id: String,
    pub(crate) price: u64,
    pub(crate) status: String,
    pub(crate) client_payer: Principal,
    pub(crate) supplier_receiver: Principal,
    pub(crate) paid_at_block: Option<u64>,
    pub(crate) memo: u64,
}

// Reserve Driver Payment Struct
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct ReserveDriverPayment {
    pub(crate) supplier_id: String,
    pub(crate) price: u64,
    pub(crate) status: String,
    pub(crate) supplier_payer: Principal,
    pub(crate) driver_reciever: Principal,
    pub(crate) paid_at_block: Option<u64>,
    pub(crate) memo: u64,
}

// Warehouse Struct
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Warehouse {
    pub(crate) id: u64,
    pub(crate) supplier_id: u64,
    pub(crate) name: String,
    pub(crate) location: String,
    pub(crate) capacity: u64,
    pub(crate) used_capacity: u64,
    pub(crate) status: String, // "Active", "Inactive", "Full"
    pub(crate) inventory: Vec<WarehouseInventory>,
}

// Warehouse Inventory Struct
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct WarehouseInventory {
    pub(crate) item_id: u64,
    pub(crate) quantity: u64,
    pub(crate) shelf_location: String,
    pub(crate) last_updated: String,
}

// Warehouse Payload
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct WarehousePayload {
    pub(crate) name: String,
    pub(crate) location: String,
    pub(crate) capacity: u64,
    pub(crate) supplier_id: u64,
}

// warehouse add item payload
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct WarehouseAddItemPayload {
    pub(crate) warehouse_id: u64,
    pub(crate) item_id: u64,
    pub(crate) quantity: u64,
    pub(crate) shelf_location: String,
}


// #[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
// pub struct  {
//     pub(crate) id: u64,
//     pub(crate) payer: Principal,
//     pub(crate) amount: u64,
//     pub(crate) expires_at: u64,
// }


// Transaction Management System
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Transaction {
    pub(crate) id: u64,
    pub(crate) transaction_type: String,
    pub(crate) entity_id: u64,
    pub(crate) entity_type: String,
    pub(crate) caller: Principal,
    pub(crate) timestamp: u64,
    pub(crate) status: String,
    pub(crate) details: String,
    pub(crate) related_tx_id: Option<u64>,
}

// Reserve Response
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct PaymentReservation {
    pub(crate) price: u64,
    pub(crate) status: String,
    pub(crate) client_payer: Principal,
    pub(crate) supplier_receiver: Principal,
    pub(crate) paid_at_block: Option<u64>,
    pub(crate) memo: u64,
}