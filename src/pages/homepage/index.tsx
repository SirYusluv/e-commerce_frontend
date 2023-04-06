import Header from "@/layouts/header/header";
import SectionBenefits from "@/layouts/section-benefits/section-benefits";
import SectionLimited from "@/layouts/section-limited/section-limited";
import Head from "next/head";

export default function Homepage() {
  return (
    <>
      <Head>
        <title>E-Commerce</title>
      </Head>
      <>
        <Header />
        <SectionBenefits />
        <SectionLimited />
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
