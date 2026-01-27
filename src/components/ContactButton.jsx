import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContactButton = () => {
  return (
    <Link
      target="_blank"
      href={"https:/wa.me/+8801779184386"}
      className="inline-flex fixed bottom-6 right-6 bg-gray-200 rounded-full p-2 z-50"
    >
      <Image
        src={"/icons/whatsapp.svg"}
        alt="whatsapp"
        width={40}
        height={40}
      />
    </Link>
  );
};

export default ContactButton;
