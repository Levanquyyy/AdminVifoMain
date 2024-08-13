import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Provider from "@/components/Tables/distributors/Distributors";
import TPA from "@/components/Tables/tpa/TPA";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="" />

      <div className="flex flex-col gap-10">
        <TPA />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
