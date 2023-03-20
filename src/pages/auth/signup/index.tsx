import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Head from "next/head";
import Image from "next/image";
import { useRef } from "react";
import logo from "../../../assets/logo.svg";
import styles from "./signup.module.scss";

export default function Signup() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailAddressRef = useRef(null);
  const passwordRef = useRef(null);

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
            text="First Name"
            inputType="text"
            inputRef={firstNameRef}
          />
          <Input
            extraClasses={styles["signup__input"]}
            text="Last Name"
            inputType="text"
            inputRef={lastNameRef}
          />
          <Input
            extraClasses={styles["signup__input"]}
            text="Email address"
            inputType="email"
            inputRef={emailAddressRef}
          />
          <Input
            extraClasses={styles["signup__input"]}
            text="Password"
            inputType="password"
            inputRef={passwordRef}
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
