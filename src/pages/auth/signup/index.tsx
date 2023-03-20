import Button from "@/components/button/button";
import Input from "@/components/input/input";
import useRequest from "@/hooks/use-http";
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import { hideBackdrop, showBackdrop } from "@/store/slices/backdropSlice";
import { emailIsValid, nameIsValid, passwordIsValid } from "@/util/helper";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import logo from "../../../assets/logo.svg";
import styles from "./signup.module.scss";

export default function Signup() {
  const [sendRequest, reset, isLoading, isError, errMsg, response] =
    useRequest();
  const [submitButtonIsActive, setSubmitButtonIsActive] = useState<boolean>(
    !isLoading
  );
  const dispatch = useDispatch();

  useEffect(() => setSubmitButtonIsActive(!isLoading), [isLoading]);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailAddressRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  let [Modal, setModal] = useState<JSX.Element | null>(null);

  function removeModalAndBackdrop() {
    setModal(null);
    dispatch(hideBackdrop());
  }

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
      setModal(() => {
        dispatch(showBackdrop());
        return (
          <AlertDialog
            message="Invalid input data provided."
            buttonPri="Ok"
            onButtonPriClick={removeModalAndBackdrop}
            backdropClickHandler={removeModalAndBackdrop}
          />
        );
      });
    }
  }

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      {Modal && Modal}
      <main>
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
