"use client";
import CustomNavbar from "@/components/CustomNavbar/CustomNavbar";
import Footer from "@/components/Footer/Footer";
import links from "./links";
import NotFound from "@/components/404/404";
export default function notFound() {
  return (
    <>
      <CustomNavbar isDocsPage={false} staticHeader={true} />
      <NotFound />
      <Footer variant="dark" links={links} />
    </>
  );
}
