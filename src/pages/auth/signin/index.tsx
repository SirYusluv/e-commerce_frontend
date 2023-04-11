import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import logo from "../../../assets/logo.svg";
import styles from "./signin.module.scss";
import signupStyles from "../signup/signup.module.scss";
import { useRouter } from "next/router";
import { emailIsValid, passwordIsValid } from "@/util/helper";
import AlertDialog from "@/layouts/alert-dialog/alert-dialog";
import { useDispatch } from "react-redux";
import { hideBackdrop } from "@/store/slices/backdrop-slice";
import useRequest, { IOption } from "@/hooks/use-http";
import { ACCESS_TOKEN, API_URL, HTTP_STATUS } from "@/util/data";

export default function Signin() {
  const [Modal, setModal] = useState<JSX.Element | null>(null);
  const emailAddressRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [sendRequest, reset, isLoading, isError, errMsg, response] =
    useRequest();

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

      if (response.status === HTTP_STATUS.ok) {
        localStorage.setItem(ACCESS_TOKEN, response.user?.accessToken || "");
        router.push("/user");
        return;
      }

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
    const password = passwordRef.current?.value;

    if (!emailIsValid(emailAddress || "") || !passwordIsValid(password || "")) {
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
        emailAddress: emailAddress!!,
        password: password!!,
      },
    };
    sendRequest(`${API_URL}/auth/signin`, options);
  }

  return (
    <>
      <Head>
        <title>Signin</title>
      </Head>
      <main>
        {Modal && Modal}
        <Image src={logo} alt="app" className={signupStyles.logo} />
        <form
          className={styles["signin__form-el"]}
          onSubmit={formSubmitHandler}
        >
          <Input
            extraClasses={styles["signin__input"]}
            text="Email address"
            inputType="email"
            inputRef={emailAddressRef}
          />
          <Input
            extraClasses={styles["signin__input"]}
            text="Password"
            inputType="password"
            inputRef={passwordRef}
          />
          <Button type="submit" buttonType="main" text="Signin" />
        </form>
        <div className={styles["bottom"]}>
          <p className={styles["bottom__account"]}>
            Don't have an account?{" "}
            <span onClick={() => router.push("/auth/signup")}> Signup</span>
          </p>
          <p
            className={styles["bottom__password"]}
            onClick={() => router.push("/auth/forget-password")}
          >
            Forget password?
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
