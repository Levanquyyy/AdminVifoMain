import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Claim from "@/components/Tables/claim/Claim";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Claim" />

      <Claim />
    </>
  );
};

export default TablesPage;
