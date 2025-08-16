"use client";
import CustomNavbar from "@/components/customNavbar/customNavbar";
import Footer from "@/components/footer/footer";
import NotFound from "@/components/404/404";
export default function notFound() {
  return (
    <>
      <CustomNavbar isDocsPage={false} staticHeader={true} />
      <NotFound />
      <Footer variant="dark" />
    </>
  );
}
