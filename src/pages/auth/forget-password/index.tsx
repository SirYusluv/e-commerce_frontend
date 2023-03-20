import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Head from "next/head";
import Image from "next/image";
import { useRef } from "react";
import styles from "./forget-password.module.scss";
import logo from "../../../assets/logo.svg";

export default function ForgetPassword() {
  const emailAddressRef = useRef(null);
  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <main>
        <Image src={logo} alt="app" className={styles.logo} />
        <form className={styles["signup__form-el"]}>
          <Input
            extraClasses={styles["signup__input"]}
            text="Email address"
            inputType="email"
            ref={emailAddressRef}
          />

          <Button type="main" text="Signup" />
        </form>
        <p className={styles["bottom-text"]}>
          Already have an account? <span> Signin</span>
        </p>
      </main>
    </>
  );
}
