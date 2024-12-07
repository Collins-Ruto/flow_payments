// lib.rs
#[macro_use]
extern crate serde;
use candid::{CandidType, Decode, Encode, Principal};
use ic_cdk::api::caller;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{BoundedStorable, Cell, DefaultMemoryImpl, StableBTreeMap, Storable};
// use serde::{Deserialize, Serialize};
use std::borrow::Cow;
use std::cell::RefCell;
use std::collections::BTreeMap;
use validator::Validate;

mod models; // Import the models module

use models::*; // Use the models

// Define an Error enum for handling errors
#[derive(candid::CandidType, Deserialize, Serialize, Debug)]
pub enum Error {
    NotFound { msg: String },
    ValidationError { msg: String },
    Unauthorized { msg: String },
    InvalidInput { msg: String },
    StringError(String),
}

// Memory management
type Memory = VirtualMemory<DefaultMemoryImpl>;
type IdCell = Cell<u64, Memory>;

// Thread-local storage
thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(
        MemoryManager::init(DefaultMemoryImpl::default())
    );

    static ID_COUNTER: RefCell<IdCell> = RefCell::new(
        IdCell::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))), 0)
            .expect("Cannot create a counter")
    );

    //New line
    static ORDERS: RefCell<StableBTreeMap<u64, Order, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
        )
    );

    static CLIENTS: RefCell<StableBTreeMap<u64, Client, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(2)))
        )
    );

    static SUPPLIERS: RefCell<StableBTreeMap<u64, Supplier, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(3)))
        )
    );

    static QUOTATIONS: RefCell<StableBTreeMap<u64, Quotation, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(4)))
        )
    );
    static MAINTAINANCE_RECORDS: RefCell<StableBTreeMap<u64, MaintainanceRecord, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(5)))
        )
    );


    static DRIVERS: RefCell<StableBTreeMap<u64, Driver, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(6)))
        )
    );

    // static PENDING_RESERVATIONS: RefCell<StableBTreeMap<u64, Reservation, Memory>> = RefCell::new(
    //     StableBTreeMap::init(
    //         MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(7)))
    //     )
    // );

    static PAYMENT_RESERVATIONS: RefCell<StableBTreeMap<u64, PaymentReservation, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(8)))
        )
    );

    static COMPLETED_PAYMENTS: RefCell<StableBTreeMap<u64, PaymentReservation, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(9)))
        )
    );

    static ITEMS: RefCell<StableBTreeMap<u64, ItemDetails, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(10)))
        )
    );

    static BIDS: RefCell<StableBTreeMap<u64, Bid, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(11)))
        )
    );

    static WAREHOUSES: RefCell<StableBTreeMap<u64, Warehouse, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(12)))
        )
    );

    // static PENDING_DRIVER_RESERVATIONS: RefCell<StableBTreeMap<u64, DriverReservation, Memory>> = RefCell::new(
    //     StableBTreeMap::init(
    //         MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(10)))
    //     )
    // );
}


impl Storable for Client {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for Client {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}


impl Storable for Order {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for Order {
    const MAX_SIZE: u32 = 1024; // Adjust size as needed
    const IS_FIXED_SIZE: bool = false;
}

// Update the Storable implementation for Bid
impl Storable for Bid {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for Bid {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}


// Implementation for Storable trait
impl Storable for ItemDetails {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

// Implementation for BoundedStorable trait
impl BoundedStorable for ItemDetails {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}


impl Storable for MaintainanceRecord {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for MaintainanceRecord {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}


impl Storable for Driver {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

}

impl BoundedStorable for Driver {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}


impl Storable for Supplier {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for Supplier {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}


impl Storable for Quotation {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for Quotation {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}

// Implementation for Storable trait
impl Storable for Warehouse {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

// Implementation for BoundedStorable trait
impl BoundedStorable for Warehouse {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}

// Payment Status Enum
#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub enum PaymentStatus {
    PaymentPending(String),
    Completed(String),
}

// Helper functions
fn generate_uuid() -> u64 {
    let id = ID_COUNTER
        .with(|counter| {
            let current_id = *counter.borrow().get(); // Use the binding to get the current ID
            counter.borrow_mut().set(current_id + 1); // Now you can safely mutate the counter
            current_id // Return the current_id
        });

    id
}

///// Functions Section Start /////
/// Start of Client Functions ///
// Create Client Company
#[ic_cdk::update]
fn create_client_company(payload: ClientCompanyPayload) -> Result<Client, String> {
    let client = Client {
        id: generate_uuid(),
        name: payload.name,
        bussiness_type: payload.bussiness_type,
        industry: payload.industry,
        address: payload.address,
        email: payload.email,
        phone: payload.phone,
        website: payload.website,
        owner: caller(),
        owner_name: payload.owner_name,
        reg_no: payload.reg_no,
        logo: payload.logo,
        affiliated_companies: Vec::new(),
        products: Vec::new(),
    };

    CLIENTS.with(|clients| {
        clients
            .borrow_mut()
            .insert(client.id.clone(), client.clone());
        Ok(client)
    })
}

// Add affiliation to client company
#[ic_cdk::update]
fn add_affiliation(client_id: u64, company_name: String) -> Result<Client, String> {
    CLIENTS.with(|clients| {
        let clients = clients.borrow_mut(); // Get a mutable reference to the clients
        match clients.iter().find(|(key, _)| *key == client_id) {
            Some((_, mut client)) => {
                // Assuming `client` has a field `affiliated_companies` which is a Vec<String>
                client.affiliated_companies.push(company_name); // Add the company name
                Ok(client.clone()) // Return the updated client
            },
            None => Err(format!("Client with id={} not found", client_id)), // Handle the case where the client is not found
        }
    })
}

// Function to add product to client company
// Product that Clients have in their inventory eg. Cars, Electronics, etc
#[ic_cdk::update]
fn add_product(client_id: u64, product_name: String) -> Result<Client, String> {
    CLIENTS.with(|clients| {
        let clients = clients.borrow_mut(); // Get a mutable reference to the clients
        match clients.iter().find(|(key, _)| *key == client_id) {
            Some((_, mut client)) => {
                // Assuming `client` has a field `products` which is a Vec<String>
                client.products.push(product_name); // Add the product name
                Ok(client.clone()) // Return the updated client
            },
            None => Err(format!("Client with id={} not found", client_id)), // Handle the case where the client is not found
        }
    })
}

// Function to get all clients
#[ic_cdk::query]
fn get_all_clients() -> Vec<Client> {
    CLIENTS.with(|clients| {
        clients
            .borrow()
            .iter()
            .map(|(_, client)| client.clone())
            .collect()
    })
}

//Function to get a client by ID
#[ic_cdk::query]
fn get_client(id: u64) -> Result<Client, String> {
    CLIENTS.with(|clients| match clients.borrow().get(&id) {
        Some(client) => Ok(client.clone()),
        None => Err(format!("Client with id={} not found", id)),
    })
}



//Function to get Client company by Owner
#[ic_cdk::query]
fn get_client_by_owner() -> Result<Client, String> {
    CLIENTS.with(|clients| {
        let clients = clients.borrow();
        let client = clients
            .iter()
            .find(|(_, client)| client.owner.to_text() == caller().to_text());
        match client {
            Some((_, client)) => Ok(client.clone()),
            None => Err("Client company not found".to_string()),
        }
    })
}

//Function to get Client Company Active Orders
#[ic_cdk::query]
fn get_client_active_orders(client_id: u64) -> Vec<Order> {
    ORDERS.with(|orders| {
        orders
            .borrow()
            .iter()
            .filter_map(|(_, order)| {
                if order.company_id == client_id && order.supplier_id.is_some() {
                    Some(order.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

//Function to get Client Company Completed Orders
#[ic_cdk::query]
fn get_client_completed_orders(client_id: u64) -> Vec<Order> {
    ORDERS.with(|orders| {
        orders
            .borrow()
            .iter()
            .filter_map(|(_, order)| {
                if order.company_id == client_id && order.order_status == "Completed" {
                    Some(order.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

// function to get client company orders
#[ic_cdk::query]
fn get_client_orders(client_id: u64) -> Vec<Order> {
    ORDERS.with(|orders| {
        orders
            .borrow()
            .iter()
            .filter_map(|(_, order)| {
                if order.company_id == client_id {
                    Some(order.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}



//Function to get Client Company New Orders
#[ic_cdk::query]
fn get_client_new_orders(client_id: u64) -> Vec<Order> {
    ORDERS.with(|orders| {
        orders
            .borrow()
            .iter()
            .filter_map(|(_, order)| {
                println!("Order: {:?}", order);
                println!("Client ID: {:?}", client_id);
                if order.company_id == client_id && order.supplier_id == None {

                    Some(order.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

//   // search for client company by name or business type
//   searchClientCompany: query([text], Vec(Types.ClientCompany), (search) => {
//     const clientCompanies = clientsCompanyStorage.values();
//     return clientCompanies.filter(
//       (clientCompany) =>
//         clientCompany.name.toLowerCase() === search.toLowerCase() ||
//         clientCompany.bussinessType.toLowerCase() === search.toLowerCase()
//     );
//   }),
// Function to search client company by name or bussiness type 
#[ic_cdk::query]
fn search_client_company(search_term: String) -> Vec<Client> {
    CLIENTS.with(|clients| {
        clients
            .borrow()
            .iter()
            .filter_map(|(_, client)| {
                if client.name.to_lowercase() == search_term.to_lowercase()
                    || client.bussiness_type.to_lowercase() == search_term.to_lowercase()
                {
                    Some(client.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

//Function to update client company
#[ic_cdk::update]
fn update_client_company(id: u64, payload: ClientCompanyPayload) -> Result<Client, String> {
    CLIENTS.with(|clients| {
        let mut clients = clients.borrow_mut();
        match clients.get(&id) {
            Some(existing_client) => {
                let mut client = existing_client.clone();
                client.name = payload.name;
                client.bussiness_type = payload.bussiness_type;
                client.industry = payload.industry;
                client.address = payload.address;
                client.email = payload.email;
                client.phone = payload.phone;
                client.website = payload.website;
                client.owner_name = payload.owner_name;
                client.reg_no = payload.reg_no;
                client.logo = payload.logo;
                clients.insert(id, client.clone());
                Ok(client)
            }
            None => Err(format!("Client with id={} not found", id)),
        }
    })
}

// Function to delete client company
#[ic_cdk::update]
fn delete_client_company(id: u64) -> Result<Client, String> {
    CLIENTS.with(|clients| {
        let mut clients = clients.borrow_mut();
        match clients.remove(&id) {
            Some(client) => Ok(client),
            None => Err(format!("Client with id={} not found", id)),
        }
    })
}

/// End of Client Functions ///
/// Start of Supplier Functions ///
/// Create Supplier Company
#[ic_cdk::update]
pub fn create_supplier_company(payload: SupplierCompanyPayload) -> Result<Supplier, String> {
    let supplier = Supplier {
        id: generate_uuid(),
        name: payload.name,
        bussiness_type: payload.bussiness_type,
        address: payload.address,
        email: payload.email,
        phone: payload.phone,
        website: payload.website,
        owner: caller(),
        owner_name: payload.owner_name,
        supply_chain_type: payload.supply_chain_type,
        reg_no: payload.reg_no,
        logo: payload.logo,
        drivers: Vec::new(),
        reviews: Vec::new(),
    };

    SUPPLIERS.with(|suppliers| {
        suppliers
            .borrow_mut()
            .insert(supplier.id.clone(), supplier.clone());
        Ok(supplier)
    })
}

// get All Suppliers
#[ic_cdk::query]
fn get_all_suppliers() -> Vec<Supplier> {
    SUPPLIERS.with(|suppliers| {
        suppliers
            .borrow()
            .iter()
            .map(|(_, supplier)| supplier.clone())
            .collect()
    })
}

//Function to get Supplier Company by ID
#[ic_cdk::query]
fn get_supplier(id: u64) -> Result<Supplier, String> {
    SUPPLIERS.with(|suppliers| match suppliers.borrow().get(&id) {
        Some(supplier) => Ok(supplier.clone()),
        None => Err(format!("Supplier with id={} not found", id)),
    })
}

//Function to get Supplier Company by Owner
#[ic_cdk::query]
fn get_supplier_by_owner() -> Result<Supplier, String> {
    SUPPLIERS.with(|suppliers| {
        let suppliers = suppliers.borrow();
        let supplier = suppliers
            .iter()
            .find(|(_, supplier)| supplier.owner.to_text() == caller().to_text());
        match supplier {
            Some((_, supplier)) => Ok(supplier.clone()),
            None => Err("Supplier company not found".to_string()),
        }
    })
}

//Function to get Supplier Company Active Orders
#[ic_cdk::query]
fn get_supplier_active_orders(supplier_id: u64) -> Vec<Order> {
    ORDERS.with(|orders| {
        orders
            .borrow()
            .iter()
            .filter_map(|(_, order)| {
                if order.supplier_id == Some(supplier_id.to_string()) && order.order_status == "Assigned" {
                    Some(order.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

//Function to get Supplier Company Completed Orders
#[ic_cdk::query]
fn get_supplier_completed_orders(supplier_id: u64) -> Vec<Order> {
    ORDERS.with(|orders| {
        orders
            .borrow()
            .iter()
            .filter_map(|(_, order)| {
                if order.supplier_id == Some(supplier_id.to_string()) && order.order_status == "Completed" {
                    Some(order.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

//Function to get Supplier Company New Orders
#[ic_cdk::query]
fn get_supplier_new_orders(supplier_id: u64) -> Vec<Order> {
    ORDERS.with(|orders| {
        orders
            .borrow()
            .iter()
            .filter_map(|(_, order)| {
                if order.supplier_id == Some(supplier_id.to_string()) && order.order_status == "New" {
                    Some(order.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

// Function to get New Orders
#[ic_cdk::query]
fn get_new_orders() -> Vec<Order> {
    ORDERS.with(|orders| {
        orders
            .borrow()
            .iter()
            .filter_map(|(_, order)| {
                if order.supplier_id == None {
                    Some(order.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

//Function to search supplier company by name or bussiness type
#[ic_cdk::query]
fn search_supplier_company(search_term: String) -> Vec<Supplier> {
    SUPPLIERS.with(|suppliers| {
        suppliers
            .borrow()
            .iter()
            .filter_map(|(_, supplier)| {
                if supplier.name.to_lowercase() == search_term.to_lowercase()
                    || supplier.bussiness_type.to_lowercase() == search_term.to_lowercase()
                {
                    Some(supplier.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

//Function to update supplier company
#[ic_cdk::update]
fn update_supplier_company(id: u64, payload: SupplierCompanyPayload) -> Result<Supplier, String> {
    SUPPLIERS.with(|suppliers| {
        let mut suppliers = suppliers.borrow_mut();
        match suppliers.get(&id) {
            Some(existing_supplier) => {
                let mut supplier = existing_supplier.clone();
                supplier.name = payload.name;
                supplier.bussiness_type = payload.bussiness_type;
                supplier.address = payload.address;
                supplier.email = payload.email;
                supplier.phone = payload.phone;
                supplier.website = payload.website;
                supplier.owner_name = payload.owner_name;
                supplier.supply_chain_type = payload.supply_chain_type;
                supplier.reg_no = payload.reg_no;
                supplier.logo = payload.logo;
                suppliers.insert(id, supplier.clone());
                Ok(supplier)
            }
            None => Err(format!("Supplier with id={} not found", id)),
        }
    })
}

//Function to delete supplier company
#[ic_cdk::update]
fn delete_supplier_company(id: u64) -> Result<Supplier, String> {
    SUPPLIERS.with(|suppliers| {
        let mut suppliers = suppliers.borrow_mut();
        match suppliers.remove(&id) {
            Some(supplier) => Ok(supplier),
            None => Err(format!("Supplier with id={} not found", id)),
        }
    })
}


//Function to add driver to supply company
#[ic_cdk::update]
fn add_driver_to_supply_company(supplier_id: u64, driver_id: u64) -> Result<Supplier, String> {
    SUPPLIERS.with(|suppliers| {
        let mut suppliers = suppliers.borrow_mut();
        let driver_opt = DRIVERS.with(|drivers| drivers.borrow().get(&driver_id));
        match suppliers.get(&supplier_id) {
            Some(existing_supplier) => {
                let mut supplier = existing_supplier.clone();
                supplier.drivers.push(driver_opt.unwrap().clone());
                suppliers.insert(supplier_id, supplier.clone());
                Ok(supplier)
            }
            None => Err(format!("Supplier with id={} not found", supplier_id)),
        }
    })
}

// Create Driver Function
#[ic_cdk::update]
fn create_driver(payload: DriverPayload) -> Result<Driver, String> {
    let driver = Driver {
        id: generate_uuid(),  // Generate unique ID
        full_name: payload.full_name,
        contact_info: payload.contact_info,
        experience: payload.experience,
        license_no: payload.license_no,
        license_expiry: payload.license_expiry,
        vehicle_make: payload.vehicle_make,
        vehicle_model: payload.vehicle_model,
        vehicle_type: payload.vehicle_type,
        vehicle_reg_no: payload.vehicle_reg_no,
        trainings: payload.trainings,
        maintenance_records: Vec::new(),
        driver_rating: 0,
        company: payload.company,
        driver_status: "available".to_string(),  // Set initial status as available
        owner: ic_cdk::caller(),  // Set the owner as the caller's principal
    };

    // Store the driver in your storage
    DRIVERS.with(|drivers| {
        drivers.borrow_mut().insert(driver.id, driver.clone());
        Ok(driver)
    })
}

// update driver 
#[ic_cdk::update]
fn update_driver(id: u64, payload: UpdateDriverPayload) -> Result<Driver, String> {
    DRIVERS.with(|drivers| {
        let mut drivers = drivers.borrow_mut();
        
        // Check if driver exists
        if let Some(existing_driver) = drivers.get(&id) {
            // Create updated driver instance
            let updated_driver = Driver {
                id: existing_driver.id,  // Keep the same ID
                full_name: existing_driver.full_name,
                contact_info: payload.contact_info,
                experience: payload.experience,
                license_no: existing_driver.license_no,
                license_expiry: payload.license_expiry,
                vehicle_make: payload.vehicle_make,
                vehicle_model: payload.vehicle_model,
                vehicle_type: payload.vehicle_type,
                vehicle_reg_no: payload.vehicle_reg_no,
                company: payload.company,
                trainings: existing_driver.trainings,
                maintenance_records: existing_driver.maintenance_records,
                driver_status: existing_driver.driver_status,
                driver_rating: existing_driver.driver_rating,
                owner: existing_driver.owner,  // Keep the same owner
            };

            // Update the driver in storage
            drivers.insert(id, updated_driver.clone());
            Ok(updated_driver)
        } else {
            Err(format!("Driver with id={} not found", id))
        }
    })
}

// function to get all drivers
#[ic_cdk::query]
fn get_all_drivers() -> Vec<Driver> {
    DRIVERS.with(|drivers| {
        drivers
            .borrow()
            .iter()
            .map(|(_, driver)| driver.clone())
            .collect()
    })
}

// get supplier drivers 
#[ic_cdk::query]
fn get_supplier_drivers(supplier_id: u64) -> Vec<Driver> {
    SUPPLIERS.with(|suppliers| {
        let suppliers = suppliers.borrow();
        let supplier = suppliers.get(&supplier_id);
        match supplier {
            Some(supplier) => supplier.drivers.clone(),
            None => Vec::new(),
        }
    })
}

// Function to get driver active order
#[ic_cdk::query]
fn get_driver_active_orders(driver_id: u64) -> Vec<Order> {
    ORDERS.with(|orders| {
        orders
            .borrow()
            .iter()
            .filter_map(|(_, order)| {
                if order.driver_id == Some(driver_id.to_string()) && order.order_status == "Assigned" {
                    Some(order.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

// Function to get driver by ID
#[ic_cdk::query]
fn get_driver(id: u64) -> Result<Driver, String> {
    DRIVERS.with(|drivers| match drivers.borrow().get(&id) {
        Some(driver) => Ok(driver.clone()),
        None => Err(format!("Driver with id={} not found", id)),
    })
}

//Function to get driver by Owner
#[ic_cdk::query]
fn get_driver_by_owner() -> Result<Driver, String> {
    DRIVERS.with(|drivers| {
        let drivers = drivers.borrow();
        let driver = drivers
            .iter()
            .find(|(_, driver)| driver.owner.to_text() == caller().to_text());
        match driver {
            Some((_, driver)) => Ok(driver.clone()),
            None => Err("Driver not found".to_string()),
        }
    })
}   

// Function to get driver Completed Orders
#[ic_cdk::query]
fn get_driver_completed_orders(driver_id: u64) -> Vec<Order> {
    ORDERS.with(|orders| {
        orders
            .borrow()
            .iter()
            .filter_map(|(_, order)| {
                if order.driver_id == Some(driver_id.to_string()) && order.order_status == "Completed" {
                    Some(order.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

// Function to get driver Maintenance Records
#[ic_cdk::query]
fn get_driver_maintenance_records(driver_id: u64) -> Vec<MaintainanceRecord> {
    DRIVERS.with(|drivers| {
        let drivers = drivers.borrow();
        let driver = drivers.get(&driver_id);
        match driver {
            Some(driver) => driver.maintenance_records.clone(),
            None => Vec::new(),
        }
    })
}

// Maintainance Records

// Function to create Maintainance Record
#[ic_cdk::update]
fn create_maintainance_record(payload: MaintainanceRecordPayload) -> Result<MaintainanceRecord, String> {
    let record = MaintainanceRecord {
        id: generate_uuid(),
        vehicle_reg_no: payload.vehicle_reg_no,
        date: payload.date,
        description: payload.description,
        cost: payload.cost,
        mechanic: payload.mechanic,
        mechanic_contact: payload.mechanic_contact,
        mechanic_address: payload.mechanic_address,
        mechanic_email: payload.mechanic_email,
        mechanic_phone: payload.mechanic_phone,
    };

    MAINTAINANCE_RECORDS.with(|records| {
        records
            .borrow_mut()
            .insert(record.id.clone(), record.clone());
        Ok(record)
    })
}

// Function to get all Maintainance Records
#[ic_cdk::query]
fn get_all_maintainance_records() -> Vec<MaintainanceRecord> {
    MAINTAINANCE_RECORDS.with(|records| {
        records
            .borrow()
            .iter()
            .map(|(_, record)| record.clone())
            .collect()
    })
}

// Function to get Maintainance Record by ID    
#[ic_cdk::query]
fn get_maintainance_record(id: u64) -> Result<MaintainanceRecord, String> {
    MAINTAINANCE_RECORDS.with(|records| match records.borrow().get(&id) {
        Some(record) => Ok(record.clone()),
        None => Err(format!("Maintainance Record with id={} not found", id)),
    })
}

/// End of Supplier Functions ///
// Function get Address from Principal




/// Start of Order Functions ///
/// Create Order
#[ic_cdk::update]
fn create_order(payload: OrderDetailsPayload) -> Result<Order, String> {
    // get client company name
    let client_company = CLIENTS.with(|clients| clients.borrow().get(&payload.company_id));
    let client_company_name = match client_company {
        Some(client) => client.name,
        None => return Err(format!("Client company with id={} not found", payload.company_id)),
    };
    let order = Order {
        id: generate_uuid(),
        company_id: payload.company_id,
        company_name: client_company_name,
        order_name: payload.order_name,
        expected_delivery: payload.expected_delivery,
        delivery: None,
        driver_id: None,
        supplier_id: None,
        pickup_address: payload.pickup_address,
        delivery_address: payload.delivery_address,
        order_status: "New".to_string(),
        order_type: payload.order_type,
        order_weight: payload.order_weight,
        priority: payload.priority,
        vehicle_type: payload.vehicle_type,
        category: payload.category,
        items: payload.items,
    };

    ORDERS.with(|orders| {
        orders
            .borrow_mut()
            .insert(order.id.clone(), order.clone());
        Ok(order)
    })
}

// Function to get order details
#[ic_cdk::query]
fn get_order(id: u64) -> Result<Order, String> {
    ORDERS.with(|orders| match orders.borrow().get(&id) {
        Some(order) => Ok(order.clone()),
        None => Err(format!("Order with id={} not found", id)),
    })
}

// Function to get all orders
#[ic_cdk::query]
fn get_all_orders() -> Vec<Order> {
    ORDERS.with(|orders| {
        orders
            .borrow()
            .iter()
            .map(|(_, order)| order.clone())
            .collect()
    })
}
// get order quotation
#[ic_cdk::query]
fn get_order_quotation(order_id: u64) -> Result<Vec<Quotation>, String> {
    QUOTATIONS.with(|quotations| {
        let quotations = quotations.borrow();
        let order_quotations: Vec<Quotation> = quotations
            .iter()
            .filter_map(|(_, quotation)| {
                if quotation.order_id == order_id {
                    Some(quotation.clone())
                } else {
                    None
                }
            })
            .collect();
        if order_quotations.is_empty() {
            Err("No quotations found for this order".to_string())
        } else {
            Ok(order_quotations)
        }
    })
}

// Update Order Status
#[ic_cdk::update]
fn update_order_status(order_id: u64, status: String) -> Result<Order, String> {
    ORDERS.with(|orders| {
        let mut orders = orders.borrow_mut();
        match orders.get(&order_id) {
            Some(existing_order) => {
                let mut order = existing_order.clone();
                order.order_status = status;
                orders.insert(order_id, order.clone());
                Ok(order)
            }
            None => Err(format!("Order with id={} not found", order_id)),
        }
    })
}

// Mark order as completed
#[ic_cdk::update]
fn mark_order_as_completed(order_id: u64) -> Result<Order, String> {
    ORDERS.with(|orders| {
        let mut orders = orders.borrow_mut();
        match orders.get(&order_id) {
            Some(existing_order) => {
                let mut order = existing_order.clone();
                order.order_status = "Completed".to_string();
                orders.insert(order_id, order.clone());
                Ok(order)
            }
            None => Err(format!("Order with id={} not found", order_id)),
        }
    })
}
#[ic_cdk::query]
fn get_order_items(order_id: u64) -> Result<Vec<(ItemDetails, u64)>, String> {
    // First get the order
    let order = ORDERS.with(|orders| {
        orders.borrow()
            .get(&order_id)
            .clone()  // Changed from .cloned()
    }).ok_or(format!("Order with id={} not found", order_id))?;

    // Get item details for each item in the order
    let mut order_items = Vec::new();

    // Iterate through order items and get their details
    for order_item in order.items {
        // Get the item details from storage
        if let Some(item_details) = ITEMS.with(|items| {
            items.borrow()
                .get(&order_item.item_id)
                .clone()  // Changed from .cloned()
        }) {
            // Push tuple of (ItemDetails, quantity ordered)
            order_items.push((item_details, order_item.quantity));
        }
    }

    if order_items.is_empty() {
        Err("No items found for this order".to_string())
    } else {
        Ok(order_items)
    }
}

//Function to add Item 
#[ic_cdk::update]
fn add_item_to_order(order_id: u64, item: OrderItem) -> Result<Order, String> {
    ORDERS.with(|orders| {
        let mut orders = orders.borrow_mut();
        match orders.get(&order_id) {
            Some(existing_order) => {
                let mut order = existing_order.clone();
                order.items.push(item);
                orders.insert(order_id, order.clone());
                Ok(order)
            }
            None => Err(format!("Order with id={} not found", order_id)),
        }
    })
}

// Now implement the bidding functionality:
#[ic_cdk::update]
fn create_bid(payload: BidPayload) -> Result<Bid, String> {
    println!("Payload: {:?}", payload);
    let caller = ic_cdk::caller();
    
    // Verify the order exists and is open for bidding
    let order = ORDERS.with(|orders| {
        orders.borrow().get(&payload.order_id).clone()
    }).ok_or("Order not found")?;

    if order.supplier_id.is_some() {
        return Err("This order already has an assigned supplier".to_string());
    }

    // Get supplier details
    let supplier = SUPPLIERS.with(|suppliers| {
        suppliers.borrow()
            .iter()
            .find(|(_, s)| s.owner.to_text() == caller.to_text())
            .map(|(_, s)| s.clone())
    }).ok_or("Only registered suppliers can bid")?;

    println!("Supplier: {:?}", supplier);

    let current_time = ic_cdk::api::time().to_string();
    
    let bid = Bid {
        id: generate_uuid(),
        order_id: payload.order_id,
        supplier_id: supplier.id,
        supplier_name: supplier.name,
        amount: payload.amount,
        delivery_time: payload.delivery_time,
        notes: payload.notes,
        status: BidStatus::Pending,
        created_at: current_time.clone(),
        updated_at: current_time,
    };

    // Save the bid
    BIDS.with(|bids| {
        bids.borrow_mut().insert(bid.id, bid.clone());
        Ok(bid)
    })
}
// create quotation
#[ic_cdk::update]
fn create_quotation(payload: QuotationPayload) -> Result<Quotation, String> {
    let caller = ic_cdk::caller();
    
    // Verify the order exists and is open for bidding
    let order = ORDERS.with(|orders| {
        orders.borrow().get(&payload.order_id).clone()
    }).ok_or("Order not found")?;

    if order.supplier_id.is_some() {
        return Err("This order has an assigned supplier".to_string());
    }

    // Get supplier details
    let supplier = SUPPLIERS.with(|suppliers| {
        suppliers.borrow()
            .iter()
            .find(|(_, s)| s.owner.to_text() == caller.to_text())
            .map(|(_, s)| s.clone())
    }).ok_or("Only registered suppliers can bid")?;

    
    let quotation = Quotation {
        id: generate_uuid(),
        quotation_title: payload.quotation_title,
        supplier_id: supplier.id,
        order_id: payload.order_id,
        supplier_name: supplier.name,
        supplier_address: supplier.address,
        supplier_email: supplier.email,
        service_description: payload.service_description,
        shipping_cost: payload.shipping_cost,
        quotation_status: "Pending".to_string(),
    };

       

    // Save the quotation
    QUOTATIONS.with(|quotations| {
        quotations.borrow_mut().insert(quotation.id, quotation.clone());
        Ok(quotation)
    })
}


#[ic_cdk::query]
fn get_order_bids(order_id: u64) -> Vec<Bid> {
    BIDS.with(|bids| {
        bids.borrow()
            .iter()
            .filter_map(|(_, bid)| {
                if bid.order_id == order_id {
                    Some(bid.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

#[ic_cdk::query]
fn get_supplier_bids(supplier_id: u64) -> Result<Vec<Bid>, String> {
    SUPPLIERS.with(|suppliers| {
        if suppliers.borrow().get(&supplier_id).is_none() {
            return Err("Supplier not found".to_string());
        }
        
        Ok(BIDS.with(|bids| {
            bids.borrow()
                .iter()
                .filter_map(|(_, bid)| {
                    if bid.supplier_id == supplier_id {
                        Some(bid.clone())
                    } else {
                        None
                    }
                })
                .collect()
        }))
    })
}

#[ic_cdk::update]
fn approve_bid(bid_id: u64) -> Result<(Bid, Order), String> {
    let caller = ic_cdk::caller();
    
    // Get the bid
    let bid = BIDS.with(|bids| {
        bids.borrow().get(&bid_id).clone()
    }).ok_or("Bid not found")?;

    // Get the order and verify caller is the client
    let order = ORDERS.with(|orders| {
        orders.borrow().get(&bid.order_id).clone()
    }).ok_or("Order not found")?;

    // Verify the caller is the client who created the order
    let client = CLIENTS.with(|clients| {
        clients.borrow()
            .iter()
            .find(|(_, c)| c.owner == caller)
            .map(|(_, c)| c.clone())
    }).ok_or("Only the client who created the order can approve bids")?;

    if order.company_id != client.id {
        return Err("Only the client who created the order can approve bids".to_string());
    }

    // First, collect all bids that need to be rejected
    let bids_to_reject: Vec<(u64, Bid)> = BIDS.with(|bids| {
        bids.borrow()
            .iter()
            .filter(|(_, b)| b.order_id == order.id && b.id != bid_id)
            .map(|(id, b)| (id, b.clone()))
            .collect()
    });

    // Update the bid status
    let updated_bid = Bid {
        status: BidStatus::Approved,
        updated_at: ic_cdk::api::time().to_string(),
        ..bid
    };

    // Update the order with the selected supplier
    let updated_order = Order {
        supplier_id: Some(updated_bid.supplier_id.to_string()),
        ..order
    };

    // Save the updated bid and order
    BIDS.with(|bids| {
        let mut bids = bids.borrow_mut();
        bids.insert(bid_id, updated_bid.clone());

        // Now reject all other bids
        let current_time = ic_cdk::api::time().to_string();
        for (other_bid_id, other_bid) in bids_to_reject {
            let rejected_bid = Bid {
                status: BidStatus::Rejected,
                updated_at: current_time.clone(),
                ..other_bid
            };
            bids.insert(other_bid_id, rejected_bid);
        }
    });

    ORDERS.with(|orders| {
        orders.borrow_mut().insert(order.id, updated_order.clone());
    });

    Ok((updated_bid, updated_order))
}

#[ic_cdk::update]
fn withdraw_bid(bid_id: u64) -> Result<Bid, String> {
    let caller = ic_cdk::caller();
    
    // Get the bid
    let bid = BIDS.with(|bids| {
        bids.borrow().get(&bid_id).clone()
    }).ok_or("Bid not found")?;

    // Verify the caller is the supplier who created the bid
    let supplier = SUPPLIERS.with(|suppliers| {
        suppliers.borrow()
            .iter()
            .find(|(_, s)| s.owner == caller && s.id == bid.supplier_id)
            .map(|(_, s)| s.clone())
    }).ok_or("Only the supplier who created the bid can withdraw it")?;

    if bid.status != BidStatus::Pending {
        return Err("Can only withdraw pending bids".to_string());
    }

    // Remove the bid
    BIDS.with(|bids| {
        bids.borrow_mut().remove(&bid_id);
        Ok(bid)
    })
}

#[ic_cdk::query]
fn get_bid(bid_id: u64) -> Result<Bid, String> {
    BIDS.with(|bids| {
        bids.borrow()
            .get(&bid_id)
            .clone()
            .ok_or("Bid not found".to_string())
    })
}

#[ic_cdk::query]
fn get_pending_bids_for_order(order_id: u64) -> Vec<Bid> {
    BIDS.with(|bids| {
        bids.borrow()
            .iter()
            .filter_map(|(_, bid)| {
                if bid.order_id == order_id && bid.status == BidStatus::Pending {
                    Some(bid.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

#[ic_cdk::query]
fn get_supplier_active_bids(supplier_id: u64) -> Vec<Bid> {
    BIDS.with(|bids| {
        bids.borrow()
            .iter()
            .filter_map(|(_, bid)| {
                if bid.supplier_id == supplier_id && bid.status == BidStatus::Pending {
                    Some(bid.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

// Function to assign supplier and Change Quotation Status
#[ic_cdk::update]
fn assign_supplier(order_id: u64, supplier_id: u64) -> Result<Order, String> {
    ORDERS.with(|orders| {
        let mut orders = orders.borrow_mut();
        let quotations = QUOTATIONS.with(|quotations| {
            let quotations = quotations.borrow();
            let values: Vec<_> = quotations.iter().map(|(_key, value)| value.clone()).collect();
            // Now `values` contains all the values from the `StableBTreeMap`
        });
        let quotation = QUOTATIONS.with(|quotations| {
            let quotations_borrowed = quotations.borrow();
            let quotation = quotations_borrowed.iter().find(|(_key, value)| {
                value.order_id == order_id && value.supplier_id == supplier_id
            }).map(|(_key, value)| value.clone());  // Cloning the value if necessary

            match quotation {
                Some(quotation) => Ok(quotation),
                None => Err(format!("Quotation not found")),
            }
        });
        match quotation {
            Ok(quotation) => {
                let mut quotation = quotation.clone();
                quotation.quotation_status = "approved".to_string();
                QUOTATIONS.with(|quotations| {
                    quotations.borrow_mut().insert(quotation.id, quotation.clone());
                });
            }
            Err(e) => return Err(e),
        }
        
        match orders.get(&order_id) {
            Some(existing_order) => {
                let mut order = existing_order.clone();
                order.supplier_id = Some(supplier_id.to_string());
                orders.insert(order_id, order.clone());

                Ok(order)
            }
            None => Err(format!("Order with id={} not found", order_id)),
        }
    })
}

//   //   assign driver to order
//   assignDriver: update(
//     [text, text],
//     Result(Types.OrderDetails, Types.Message),
//     (orderId, driverId) => {
//       const orderDetailsOpt = orderDetailsStorage.get(orderId);
//       if ("None" in orderDetailsOpt) {
//         return Err({ NotFound: `order details with id=${orderId} not found` });
//       }
//       const orderDetails = orderDetailsOpt.Some;
//       orderDetails.driverId = Some(driverId);
//       orderDetails.orderStatus = "Assigned";
//       // change driver status
//       const driverOpt = driverStorage.get(driverId);
//       if ("None" in driverOpt) {
//         return Err({ NotFound: `driver with id=${driverId} not found` });
//       }
//       const driver = driverOpt.Some;
//       driver.driverStatus = "busy";
//       driverStorage.insert(driver.id, driver);
//       orderDetailsStorage.insert(orderDetails.id, orderDetails);
//       return Ok(orderDetails);
//     }
//   ),

// function to assign Driver 
#[ic_cdk::update]
fn assign_driver(order_id: u64, driver_id: u64) -> Result<Order, String> {
    ORDERS.with(|orders| {
        let mut orders = orders.borrow_mut();
        match orders.get(&order_id) {
            Some(existing_order) => {
                let mut order = existing_order.clone();
                order.driver_id = Some(driver_id.to_string());
                order.order_status = "Assigned".to_string();
                // change driver status to busy dont use match 
                let driver_opt = DRIVERS.with(|drivers| drivers.borrow().get(&driver_id));
                if let Some(mut driver) = driver_opt {
                    driver.driver_status = "busy".to_string();
                    DRIVERS.with(|drivers| {
                        drivers.borrow_mut().insert(driver_id, driver.clone());
                    });
                }
                orders.insert(order_id, order.clone());
                Ok(order)
            }
            None => Err(format!("Order with id={} not found", order_id)),
        }
    })
}

// Function to create a new item


// Fn creat Item as a Client make supplier_id None
#[ic_cdk::update]
fn create_item_as_client(payload: ItemDetailsClientPayload) -> Result<ItemDetails, String> {
    let current_time = ic_cdk::api::time();
    let formatted_time = format!("{}", current_time);

    let item = ItemDetails {
        id: generate_uuid(),
        name: payload.name,
        description: payload.description,
        category: payload.category,
        unit_price: payload.unit_price,
        quantity: payload.quantity,
        weight: payload.weight,
        dimensions: payload.dimensions,
        manufacturer: payload.manufacturer,
        sku: payload.sku,
        status: if payload.quantity > 0 { "In Stock".to_string() } else { "Out of Stock".to_string() },
        client_id: match payload.client_id {
            Some(id) => Some(id),
            None => None,
        }
        ,
        supplier_id: None,
        created_at: formatted_time.clone(),
        updated_at: formatted_time,
    };

    ITEMS.with(|items| {
        items.borrow_mut().insert(item.id, item.clone());
        Ok(item)
    })
}

// Function to update an item
#[ic_cdk::update]
fn update_item_as_client(id: u64, payload: ItemDetailsClientPayload) -> Result<ItemDetails, String> {
    ITEMS.with(|items| {
        let mut items = items.borrow_mut();
        
        if let Some(existing_item) = items.get(&id) {
            let updated_item = ItemDetails {
                id: existing_item.id,
                name: payload.name,
                description: payload.description,
                category: payload.category,
                unit_price: payload.unit_price,
                quantity: payload.quantity,
                weight: payload.weight,
                dimensions: payload.dimensions,
                manufacturer: payload.manufacturer,
                sku: payload.sku,
                status: if payload.quantity > 0 { "In Stock".to_string() } else { "Out of Stock".to_string() },
                client_id: payload.client_id,
                supplier_id: None,
                created_at: existing_item.created_at.clone(),
                updated_at: format!("{}", ic_cdk::api::time()),
            };

            items.insert(id, updated_item.clone());
            Ok(updated_item)
        } else {
            Err(format!("Item with id={} not found", id))
        }
    })
}

// Function to get an item by ID
#[ic_cdk::query]
fn get_item(id: u64) -> Result<ItemDetails, String> {
    ITEMS.with(|items| {
        items.borrow()
            .get(&id)
            .map(|item| item.clone())
            .ok_or(format!("Item with id={} not found", id))
    })
}

// Function to list all items
#[ic_cdk::query]
fn list_items() -> Vec<ItemDetails> {
    ITEMS.with(|items| {
        items.borrow()
            .iter()
            .map(|(_, item)| item.clone())
            .collect()
    })
}

// Function to list all items by client
#[ic_cdk::query]
fn list_items_by_client(client_id: u64) -> Vec<ItemDetails> {
    ITEMS.with(|items| {
        items.borrow()
            .iter()
            .filter_map(|(_, item)| {
                if item.client_id == Some(client_id) {

                    println!("Item: {:?}", item.client_id);
                    println!("Client ID: {:?}", client_id);
                    Some(item.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

// Function to list all items by supplier
#[ic_cdk::query]
fn list_items_by_supplier(supplier_id: u64) -> Vec<ItemDetails> {
    ITEMS.with(|items| {
        items.borrow()
            .iter()
            .filter_map(|(_, item)| {
                if item.supplier_id == Some(supplier_id) {
                    Some(item.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}


// Function to delete an item
#[ic_cdk::update]
fn delete_item(id: u64) -> Result<ItemDetails, String> {
    ITEMS.with(|items| {
        let mut items = items.borrow_mut();
        if let Some(item) = items.remove(&id) {
            Ok(item)
        } else {
            Err(format!("Item with id={} not found", id))
        }
    })
}

// Function to search items by category
#[ic_cdk::query]
fn search_items_by_category(category: String) -> Vec<ItemDetails> {
    ITEMS.with(|items| {
        items.borrow()
            .iter()
            .filter(|(_, item)| item.category.to_lowercase() == category.to_lowercase())
            .map(|(_, item)| item.clone())
            .collect()
    })
}

// Create Warehouse
#[ic_cdk::update]
fn create_warehouse(supplier_id: u64, payload: WarehousePayload) -> Result<Warehouse, String> {
    // Verify if the supplier exists

    let supplier = SUPPLIERS.with(|suppliers| {
        suppliers.borrow().get(&supplier_id)
    }).ok_or("Supplier not found")?;

    println!("Supplier: {:?}", supplier);

    let warehouse = Warehouse {
        id: generate_uuid(),
        supplier_id,
        name: payload.name,
        location: payload.location,
        capacity: payload.capacity,
        used_capacity: 0,
        status: "Active".to_string(),
        inventory: Vec::new(),
    };

    WAREHOUSES.with(|warehouses| {
        warehouses.borrow_mut().insert(warehouse.id, warehouse.clone());
        Ok(warehouse)
    })
}

// Get Supplier's Warehouses
#[ic_cdk::query]
fn get_supplier_warehouses(supplier_id: u64) -> Vec<Warehouse> {
    WAREHOUSES.with(|warehouses| {
        warehouses.borrow()
            .iter()
            .filter_map(|(_, warehouse)| {
                if warehouse.supplier_id == supplier_id {
                    Some(warehouse.clone())
                } else {
                    None
                }
            })
            .collect()
    })
}

// Add Item to Warehouse Inventory
#[ic_cdk::update]
fn add_item_to_warehouse(
    payload: WarehouseAddItemPayload
) -> Result<Warehouse, String> {
    WAREHOUSES.with(|warehouses| {
        let mut warehouses = warehouses.borrow_mut();
        
        if let Some(mut warehouse) = warehouses.get(&payload.warehouse_id) {
            // Check if item exists
            let item = ITEMS.with(|items| {
                items.borrow().get(&payload.item_id)
            }).ok_or("Item not found")?;

            // Check warehouse capacity
            if warehouse.used_capacity + payload.quantity > warehouse.capacity {
                return Err("Warehouse capacity exceeded".to_string());
            }

            // Check if item already exists in inventory
            if let Some(inventory_item) = warehouse.inventory.iter_mut()
                .find(|inv| inv.item_id == payload.item_id) {
                // Update existing inventory
                inventory_item.quantity += payload.quantity;
                inventory_item.last_updated = ic_cdk::api::time().to_string();
            } else {
                // Add new inventory item
                warehouse.inventory.push(WarehouseInventory {
                    item_id: payload.item_id,
                    quantity: payload.quantity,
                    shelf_location: payload.shelf_location,
                    last_updated: ic_cdk::api::time().to_string(),
                });
            }

            // Update current capacity
            warehouse.used_capacity += payload.quantity;

            // Update warehouse status if full
            if warehouse.used_capacity >= warehouse.capacity {
                warehouse.status = "Full".to_string();
            }

            warehouses.insert(payload.warehouse_id, warehouse.clone());
            Ok(warehouse)
        } else {
            Err(format!("Warehouse with id={} not found", payload.warehouse_id))
        }
    })
}

#[ic_cdk::update]
fn update_item_quantity(
    warehouse_id: u64,
    item_id: u64,
    new_quantity: u64
) -> Result<Warehouse, String> {
    WAREHOUSES.with(|warehouses| {
        let mut warehouses = warehouses.borrow_mut();
        
        // Get the current warehouse
        if let Some(warehouse) = warehouses.get(&warehouse_id) {
            let mut updated_warehouse = warehouse.clone();
            
            // Find the item in the warehouse inventory
            if let Some(index) = updated_warehouse.inventory
                .iter()
                .position(|inv| inv.item_id == item_id) {
                
                let old_quantity = updated_warehouse.inventory[index].quantity;
                let quantity_difference = new_quantity as i64 - old_quantity as i64;
                
                // Check if new quantity would exceed capacity
                if quantity_difference > 0 && 
                   (updated_warehouse.used_capacity as i64 + quantity_difference) as u64 > updated_warehouse.capacity {
                    return Err("New quantity would exceed warehouse capacity".to_string());
                }

                // Update the item quantity
                updated_warehouse.inventory[index].quantity = new_quantity;
                updated_warehouse.inventory[index].last_updated = ic_cdk::api::time().to_string();

                // Update warehouse capacity
                updated_warehouse.used_capacity = (updated_warehouse.used_capacity as i64 + quantity_difference) as u64;

                // Update warehouse status
                if updated_warehouse.used_capacity >= updated_warehouse.capacity {
                    updated_warehouse.status = "Full".to_string();
                } else {
                    updated_warehouse.status = "Active".to_string();
                }

                // Save the updated warehouse
                warehouses.insert(warehouse_id, updated_warehouse.clone());
                Ok(updated_warehouse)
            } else {
                Err(format!("Item with id={} not found in warehouse inventory", item_id))
            }
        } else {
            Err(format!("Warehouse with id={} not found", warehouse_id))
        }
    })
}

// Remove Item from Warehouse Inventory
#[ic_cdk::update]
fn remove_item_from_warehouse(
    warehouse_id: u64,
    item_id: u64,
    quantity: u64
) -> Result<Warehouse, String> {
    WAREHOUSES.with(|warehouses| {
        let mut warehouses = warehouses.borrow_mut();
        
        if let Some(mut warehouse) = warehouses.get(&warehouse_id) {
            // Find item in inventory
            if let Some(inventory_item) = warehouse.inventory.iter_mut()
                .find(|inv| inv.item_id == item_id) {
                if inventory_item.quantity < quantity {
                    return Err("Insufficient quantity in warehouse".to_string());
                }

                // Update quantity
                inventory_item.quantity -= quantity;
                inventory_item.last_updated = ic_cdk::api::time().to_string();

                // Remove item if quantity is 0
                if inventory_item.quantity == 0 {
                    warehouse.inventory.retain(|inv| inv.item_id != item_id);
                }

                // Update current capacity
                warehouse.used_capacity -= quantity;

                // Update warehouse status
                if warehouse.used_capacity < warehouse.capacity {
                    warehouse.status = "Active".to_string();
                }

                warehouses.insert(warehouse_id, warehouse.clone());
                Ok(warehouse)
            } else {
                Err("Item not found in warehouse inventory".to_string())
            }
        } else {
            Err(format!("Warehouse with id={} not found", warehouse_id))
        }
    })
}

// Get Warehouse Inventory
#[ic_cdk::query]
fn get_warehouse_inventory(warehouse_id: u64) -> Result<Vec<(ItemDetails, u64, String)>, String> {
    WAREHOUSES.with(|warehouses| {
        if let Some(warehouse) = warehouses.borrow().get(&warehouse_id) {
            let mut inventory_details = Vec::new();
            
            for inv_item in &warehouse.inventory {
                if let Some(item) = ITEMS.with(|items| items.borrow().get(&inv_item.item_id)) {
                    inventory_details.push((
                        item.clone(),
                        inv_item.quantity,
                        inv_item.shelf_location.clone()
                    ));
                }
            }
            
            Ok(inventory_details)
        } else {
            Err(format!("Warehouse with id={} not found", warehouse_id))
        }
    })
}

// get all warehouse inventory for a given supplier
#[ic_cdk::query]
fn get_all_warehouse_inventory(supplier_id: u64) -> Vec<(Warehouse, Vec<(ItemDetails, u64, String)>)> {
    WAREHOUSES.with(|warehouses| {
        warehouses
            .borrow()
            .iter()
            .filter_map(|(_, warehouse)| {
                if warehouse.supplier_id == supplier_id {
                    let mut inventory_details = Vec::new();
                    for inv_item in &warehouse.inventory {
                        if let Some(item) = ITEMS.with(|items| items.borrow().get(&inv_item.item_id)) {
                            inventory_details.push((
                                item.clone(),
                                inv_item.quantity,
                                inv_item.shelf_location.clone()
                            ));
                        }
                    }
                    Some((warehouse.clone(), inventory_details))
                } else {
                    None
                }
            })
            .collect()
    })
}

// Update Warehouse Details
#[ic_cdk::update]
fn update_warehouse(
    warehouse_id: u64,
    payload: WarehousePayload
) -> Result<Warehouse, String> {
    WAREHOUSES.with(|warehouses| {
        let mut warehouses = warehouses.borrow_mut();
        
        if let Some(existing_warehouse) = warehouses.get(&warehouse_id) {
            let updated_warehouse = Warehouse {
                id: existing_warehouse.id,
                supplier_id: existing_warehouse.supplier_id,
                name: payload.name,
                location: payload.location,
                capacity: payload.capacity,
                used_capacity: existing_warehouse.used_capacity,
                status: existing_warehouse.status.clone(),
                inventory: existing_warehouse.inventory.clone(),
            };

            warehouses.insert(warehouse_id, updated_warehouse.clone());
            Ok(updated_warehouse)
        } else {
            Err(format!("Warehouse with id={} not found", warehouse_id))
        }
    })
}

// Get Warehouse Capacity Status
#[ic_cdk::query]
fn get_warehouse_capacity_status(warehouse_id: u64) -> Result<(u64, u64, f64), String> {
    WAREHOUSES.with(|warehouses| {
        if let Some(warehouse) = warehouses.borrow().get(&warehouse_id) {
            let capacity_percentage = (warehouse.used_capacity as f64 / warehouse.capacity as f64) * 100.0;
            Ok((warehouse.used_capacity, warehouse.capacity, capacity_percentage))
        } else {
            Err(format!("Warehouse with id={} not found", warehouse_id))
        }
    })
}

// Payment System Types and Constants
const ICP_FEE: u64 = 10_000;
const PAYMENT_RESERVATION_PERIOD: u64 = 120;

impl Storable for PaymentReservation {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for PaymentReservation {
    const MAX_SIZE: u32 = 256;
    const IS_FIXED_SIZE: bool = false;
}

#[ic_cdk::update]
fn create_reserve_pay(order_id: u64) -> Result<PaymentReservation , Error> {
    let caller = caller();
    let now = ic_cdk::api::time();

    let order = ORDERS.with(|orders| {
        orders
            .borrow()
            .iter()
            .find(|(_, order)| order.id == order_id)
            .map(|(_, order)| order.clone())
            .ok_or_else(|| Error::NotFound {
                msg: format!("Order with id={} not found", order_id),
            })
    })?;

    // get order winnig bid - order bid with same supplier id
    let bid = BIDS.with(|bids| {
        bids
            .borrow()
            .iter()
            .find(|(_, bid)| bid.order_id == order_id && bid.status == BidStatus::Approved)
            .map(|(_, bid)| bid.clone())
            .ok_or_else(|| Error::NotFound {
                msg: format!("Winning bid not found for order with id={}", order_id),
            })
    })?;

    let supplier = SUPPLIERS.with(|suppliers| {
        suppliers
            .borrow()
            .iter()
            .find(|(_, supplier)| supplier.id == bid.supplier_id)
            .map(|(_, supplier)| supplier.clone())
            .ok_or_else(|| Error::NotFound {
                msg: format!("Supplier with id={} not found", bid.supplier_id),
            })
    })?;
    
    let amount = bid.amount + ICP_FEE;

    
    let memo = generate_payment_memo();
    println!("Payment memo created: {:?}", memo);
    
    let reservation = PaymentReservation {
        price: amount,
        status: "Pending".to_string(),
        client_payer: caller,
        supplier_receiver: supplier.owner,
        paid_at_block: None,
        memo
    };

    PAYMENT_RESERVATIONS.with(|reservations| {
        reservations
            .borrow_mut()
            .insert(memo, reservation.clone());
    });

    // discard_by_timeout(memo)?;

    Ok(reservation)    
    
}

#[ic_cdk::update]
async fn verify_payment(reservation_id: u64, block_height: u64) -> Result<bool, Error> {
    
    PAYMENT_RESERVATIONS.with(|reservations| {
        let caller = caller();
        let mut reservations = reservations.borrow_mut();
        if let Some(reservation) = reservations.get(&reservation_id) {
            if reservation.client_payer != caller {
                return Err(Error::Unauthorized {
                    msg: "Unauthorized to verify payment".to_string(),
                });
            }

            let updated_reservation = PaymentReservation {
                status: "Paid".to_string(),
                paid_at_block: Some(block_height),
                ..reservation.clone()
            };
            
            // remove the payment reservation
            reservations.remove(&reservation_id);

            // Save the payment reservation to completed payments
            COMPLETED_PAYMENTS.with(|payments| {
                payments
                    .borrow_mut()
                    .insert(reservation.client_payer.to_string().parse::<u64>().unwrap(), updated_reservation.clone());
            });

            Ok(true)
        } else {
            Err(Error::NotFound {
                msg: format!("Payment reservation with memo={} not found", reservation_id),
            })
        }
    })
}

// Additional Helper Functions
fn generate_payment_memo() -> u64 {
    let now = ic_cdk::api::time();
    let random = ic_cdk::api::call::arg_data_raw(); // Directly assign the Vec<u8>
    let combined = format!("{}{:?}", now, random);
    let hash = hash_string(&combined);
    (hash as u64) & 0xFFFFFFFFFFFFFFFF
}

fn hash_string(input: &str) -> u32 {
    let mut hash: u32 = 5381;
    for byte in input.bytes() {
        hash = ((hash << 5).wrapping_add(hash)).wrapping_add(byte as u32);
    }
    hash
}

// discardByTimeout
fn discard_by_timeout(memo: u64) -> Result<(), Error> {
    ic_cdk_timers::set_timer(
        std::time::Duration::from_secs(PAYMENT_RESERVATION_PERIOD),
        move || {
            PAYMENT_RESERVATIONS.with(|reservations| {
                let mut reservations = reservations.borrow_mut();
                if let Some(reservation) = reservations.remove(&memo) {
                    println!("Discarded payment reservation: {:?}", reservation);
                }
            });
        },
    );
    Ok(())
}

// Additional Query Functions
#[ic_cdk::query]
fn get_pending_payments() -> Vec<PaymentReservation> {
    PAYMENT_RESERVATIONS.with(|payments| {
        payments
            .borrow()
            .iter() // Use iter() to get key-value pairs
            .map(|(_, reservation)| reservation.clone()) // Clone the payment reservation values
            .collect() // Collect into a Vec<PaymentReservation>
    })
}

//TODO fix logic of fpersisted payments
#[ic_cdk::query]
fn get_persisted_payments(user: Principal) -> Option<PaymentReservation> {
    COMPLETED_PAYMENTS.with(|payments| {
        payments.borrow().get(&(user.to_string().parse::<u64>().unwrap())).map(|v| v.clone()) // Use map to clone the value inside Option
    })
}

impl Storable for Transaction {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for Transaction {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}


// Candid generator for exporting the Candid interface
ic_cdk::export_candid!();
