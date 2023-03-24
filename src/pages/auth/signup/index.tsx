import Button from "@/components/button/button";
import Input from "@/components/input/input";
import useRequest, { IOption } from "@/hooks/use-http";
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import { hideBackdrop } from "@/store/slices/backdropSlice";
import { emailIsValid, nameIsValid, passwordIsValid } from "@/util/helper";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import logo from "../../../assets/logo.svg";
import { API_URL } from "@/util/data";
import styles from "./signup.module.scss";
import { useRouter } from "next/router";

export default function Signup() {
  const [sendRequest, reset, isLoading, isError, errMsg, response] =
    useRequest();
  const dispatch = useDispatch();
  const router = useRouter();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailAddressRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [Modal, setModal] = useState<JSX.Element | null>(null);

  useEffect(
    function () {
      if (isLoading) return;

      if (isError || errMsg)
        return setModal(
          <AlertDialog
            message={errMsg || "Error processing request."}
            buttonPri="Ok"
            onButtonPriClick={removeModalAndBackdrop}
            backdropClickHandler={removeModalAndBackdrop}
          />
        );

      response.message &&
        setModal(
          <AlertDialog
            message={response.message}
            buttonPri="Ok"
            onButtonPriClick={removeModalAndBackdrop}
            backdropClickHandler={removeModalAndBackdrop}
          />
        );
    },
    [isLoading, isError, errMsg, response.message]
  );

  function removeModalAndBackdrop() {
    setModal(null);
    dispatch(hideBackdrop());
  }

  function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    reset();
    const firstName = firstNameRef.current?.value || "";
    const lastName = lastNameRef.current?.value || "";
    const emailAddress = emailAddressRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (
      !nameIsValid(firstName) ||
      !nameIsValid(lastName) ||
      !emailIsValid(emailAddress) ||
      !passwordIsValid(password)
    ) {
      return setModal(() => (
        <AlertDialog
          message="Invalid input data provided."
          buttonPri="Ok"
          onButtonPriClick={removeModalAndBackdrop}
          backdropClickHandler={removeModalAndBackdrop}
        />
      ));
    }

    const options: IOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        firstName,
        lastName,
        emailAddress,
        password,
      },
    };
    sendRequest(`${API_URL}/auth/signup`, options);
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
          <Button
            type="submit"
            buttonType="main"
            text="Signup"
            isActive={!isLoading}
          />
        </form>
        <p className={styles["bottom-text"]}>
          Already have an account?{" "}
          <span onClick={() => router.push("/auth/signin")}> Signin</span>
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
