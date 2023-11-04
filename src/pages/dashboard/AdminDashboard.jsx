import React from "react";
import { Route, Routes } from "react-router-dom";
import "./AdminDashboard.scss";
import { Navbar, Menu, Footer } from "../../components/dashboard/shared/index";
import Users from "./users/Users";
import Companies from "./companies/Companies";
import PendingRegisterations from "./pendingregisterations/PendingRegisterations";
import Company from "./companies/Company";
import User from "./users/User";
import Contracts from "./WarrantyContracts/Contracts";
import Compensations from "./compensationRequests/Compensations";
import Home from "./home/Home";
import CompaniesMap from "./companiesmap/CompaniesMap";
import { PendingRegisteration } from "./pendingregisterations/PendingRegisteration";
import { Contract } from "./WarrantyContracts/Contract";
import Compensation from "./compensationRequests/compensation";
import { Messages } from "./messages/Messages";
import { Message } from "./messages/Message";
export default function AdminDashboard() {
  return (
    <div
      className=""
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--primary-light-bg)",
        color: "var(--white-text)",
      }}
    >
      <Navbar />
      <div
        className="mt-3 d-flex justify-content-between text-light"
        style={{ flex: "1" }}
      >
        <div className="px-2 border-end border-start border-light">
          <Menu />
        </div>
        <div className="w-100 m-2 d-flex justify-content-center">
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="messages" element={<Messages />} />
            <Route path="messages/:id" element={<Message />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<User />} />
            <Route path="companies" element={<Companies />} />
            <Route path="companies/:id" element={<Company />} />
            <Route
              path="pendingregisterations"
              element={<PendingRegisterations />}
            />
            <Route
              path="pendingregisterations/:id"
              element={<PendingRegisteration />}
            />
            <Route path="companiesmap" element={<CompaniesMap />} />
            <Route path="warrantycontracts" element={<Contracts />} />
            <Route path="warrantycontracts/:id" element={<Contract />} />
            <Route path="compensationrequests" element={<Compensations />} />
            <Route path="compensationrequests/:id" element={<Compensation />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}
