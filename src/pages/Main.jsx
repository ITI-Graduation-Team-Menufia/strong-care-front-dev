import React from "react";
import { Footer, Navbar } from "../components/shared";
import { Route, Routes } from "react-router-dom";
import { Home } from "./home/Home";
import { SignIn } from "../components/SignIn";
import { ContactUSForm, Register } from "../components/home";
import { FormOne } from "../components/FormOne";
import { FormTwo } from "../components/FormTwo";
import { Review } from "../components/Review";
import { ConfirmPassword } from "../components/ConfirmPassword";
import { ForgotPassword } from "../components/ForgotPassword";
import { WarrantyContract } from "../components/WarrantyContract";
import { ConfirmationCode } from "../components/ConfirmationCode";
import Warranty from "../components/Warranty";
import { Compensation } from "../components/Compensation";
import { CompanyProfile } from "../components/company/CompanyProfile";
import AboutUs from "../components/AboutUs";
import NotFound from "../components/shared/NotFound";
import { ProtectedRoute } from "../components/ProtectedRoute";

export function Main() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<FormOne />} />
        <Route path="/signup2" element={<FormTwo />} />
        <Route path="/review" element={<Review />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/confirmpassword/:token" element={<ConfirmPassword />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/warrantycontract" element={<WarrantyContract />} />
        <Route path="/confirmationcode" element={<ConfirmationCode />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/contactus" element={<ContactUSForm />} />

        <Route
          path="/companyprofile"
          element={
            <ProtectedRoute allowedRoles={["company"]}>
              <CompanyProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/compensation" element={<Compensation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
