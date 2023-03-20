import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Backdrop from "@/layouts/backdrop/backdrop";
import { emailIsValid, nameIsValid, passwordIsValid } from "@/util/helper";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import logo from "../../../assets/logo.svg";
import styles from "./signup.module.scss";

export default function Signup() {
  const [submitButtonIsActive, setSubmitButtonIsActive] =
    useState<boolean>(true);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailAddressRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const firstName = firstNameRef.current?.value || "";
    const lastName = lastNameRef.current?.value || "";
    const emailAddress = emailAddressRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (
      !nameIsValid(firstName) ||
      !nameIsValid(lastName) ||
      !emailIsValid(emailAddress) ||
      passwordIsValid(password)
    ) {
    }
  }

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <main>
        <Backdrop onBackdropClick={() => {}} />
        <Image src={logo} alt="app" className={styles.logo} />
        <form
          className={styles["signup__form-el"]}
          onSubmit={formSubmitHandler}
        >
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
          <Button type="main" text="Signup" isActive={submitButtonIsActive} />
        </form>
        <p className={styles["bottom-text"]}>
          Already have an account? <span> Signin</span>
        </p>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
