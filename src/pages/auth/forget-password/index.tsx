import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./forget-password.module.scss";
import signupStyles from "../signup/signup.module.scss";
import logo from "../../../assets/logo.svg";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ACCESS_TOKEN, API_URL } from "@/util/data";
import { emailIsValid } from "@/util/helper";
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import { hideBackdrop } from "@/store/slices/backdrop-slice";
import useRequest, { IOption } from "@/hooks/use-http";

export default function ForgetPassword() {
  const [Modal, setModal] = useState<JSX.Element | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [sendRequest, reset, isLoading, isError, errMsg, response] =
    useRequest();

  const emailAddressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    token && router.replace("/user");
  }, []);

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
    dispatch(hideBackdrop());
    setModal(null);
  }

  function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const emailAddress = emailAddressRef.current?.value;

    if (!emailIsValid(emailAddress || "")) {
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
      method: "GET",
      headers: {},
    };
    sendRequest(
      `${API_URL}/auth/send-password-reset-mail/${emailAddress}`,
      options
    );
  }

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <main>
        {Modal && Modal}
        <Image src={logo} alt="app" className={signupStyles.logo} />
        <form
          onSubmit={formSubmitHandler}
          className={styles["forget-password__form-el"]}
        >
          <Input
            extraClasses={styles["forget-password__input"]}
            text="Email address"
            inputType="email"
            inputRef={emailAddressRef}
          />

          <Button
            type="submit"
            buttonType="main"
            text="Forget Password"
            isActive={!isLoading}
          />
        </form>
        <div className={styles.bottom}>
          <p
            onClick={() => router.push(`/auth/signup`)}
            className={styles["bottom__signup"]}
          >
            Don't have an account? <span> Signup</span>
          </p>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
