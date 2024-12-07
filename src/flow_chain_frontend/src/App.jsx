import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import SupplierDashboard from "./pages/dashboard/SupplierDashboard";
import FieldWorkerDashboard from "./pages/dashboard/FieldWorkerDashboard";
import Client from "./pages/Client";
import SupplierRegistrationForm from "./components/forms/SupplierRegistrationForm";
import DriverRegistrationForm from "./components/forms/DriverRegistrationForm";
import Supplier from "./pages/Supplier";
import ClientDashboard from "./pages/dashboard/ClientDashboard";
import Driver from "./pages/Driver/driver";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/clients" element={<Client />} />
        <Route
          path="/supplier-registration"
          element={<SupplierRegistrationForm />}
        />
        <Route
          path="/driver-registration"
          element={<DriverRegistrationForm />}
        />
        <Route path="/driver" element={<Driver />} />
        <Route path="/suppliers" element={<Supplier />} />
        <Route path="/dashboard/client" element={<ClientDashboard />} />
        <Route path="/dashboard/supplier" element={<SupplierDashboard />} />

        <Route
          path="/dashboard/field-worker"
          element={<FieldWorkerDashboard />}
        />
      </Routes>
    </Router>
  );
}
