import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import VirtualPayments from "@/components/Tables/virtualpayments/VirtualPayments";

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
      <Breadcrumb pageName="Virtual Payments" />

      <div className="flex flex-col gap-10 ">
        <VirtualPayments />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
