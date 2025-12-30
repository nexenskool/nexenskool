import React from "react";
import ContactForm from "../../../components/forms/ContactForm";

const Contact = () => {
  return (
    <div className="container-fluid flex py-20">
      <div className="left flex-1"></div>

      <div className="flex-1">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
