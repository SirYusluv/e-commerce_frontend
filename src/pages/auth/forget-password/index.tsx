import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Head from "next/head";
import Image from "next/image";
import { useRef } from "react";
import styles from "./forget-password.module.scss";
import signupStyles from "../signup/signup.module.scss";
import logo from "../../../assets/logo.svg";

export default function ForgetPassword() {
  const emailAddressRef = useRef(null);
  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <main>
        <Image src={logo} alt="app" className={signupStyles.logo} />
        <form className={styles["forget-password__form-el"]}>
          <Input
            extraClasses={styles["forget-password__input"]}
            text="Email address"
            inputType="email"
            inputRef={emailAddressRef}
          />

          <Button type="submit" buttonType="main" text="Signup" />
        </form>
        <div className={styles.bottom}>
          <p className={styles["bottom__signup"]}>
            Don't have an account? <span> Signup</span>
          </p>
          <p className={styles["bottom__signin"]}>Signin</p>
        </div>
      </main>
    </>
  );
}
