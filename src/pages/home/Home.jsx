import React from "react";
import {
  About,
  BenefitsOverview,
  ContactUSForm,
  OurPartners,
  Register,
  Slider,
} from "../../components/home/index";

export function Home() {
  return (
    <div>
      <Slider />
      <Register></Register>
      <About></About>
      <OurPartners></OurPartners>
      <ContactUSForm></ContactUSForm>
      <BenefitsOverview></BenefitsOverview>
    </div>
  );
}
