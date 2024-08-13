import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ValidDay from "@/components/Tables/valid-day/ValidDay";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddFormValidate from "@/components/Tables/valid-day/add/AddFormValidate";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10 lg:flex-row">
        <ValidDay />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
