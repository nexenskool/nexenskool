import React from "react";
import ComingSoon from "@/components/ComingSoon";

const UserDashboardPage = () => {
  return (
    <ComingSoon
      title="User Dashboard Under Construction"
      description="Your dashboard is being built. You’ll see your orders, resources, and progress here."
      primaryCta={{ label: "Go Home", href: "/" }}
      // secondaryCta={{ label: "Login", href: "/login" }}
      features={["Order history", "Saved resources", "Profile management"]}
    />
  );
};

export default UserDashboardPage;
