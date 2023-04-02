import Header from "@/layouts/header/header";
import SectionBenefits from "@/layouts/section-benefits/section-benefits";
import Head from "next/head";
import styles from "./homepage.module.scss";

export default function Homepage() {
  return (
    <>
      <Head>
        <title>E-Commerce</title>
      </Head>
      <>
        <Header />
        <SectionBenefits />
      </>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 48 * 60 * 60, // every 48hrs
  };
}
