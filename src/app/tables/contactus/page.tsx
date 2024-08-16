import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ContactUs from "@/components/Tables/contactus/ContactUs";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Contact Us From Customers
"
      />

      <div className="flex flex-col gap-10 ">
        <ContactUs />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
