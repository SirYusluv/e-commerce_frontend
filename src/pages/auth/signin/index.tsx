import Button from "@/components/button/button";
import Input from "@/components/input/input";
import Head from "next/head";
import Image from "next/image";
import { useRef } from "react";
import logo from "../../../assets/logo.svg";
import styles from "./signin.module.scss";
import signupStyles from "../signup/signup.module.scss";

export default function Signin() {
  const emailAddressRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <>
      <Head>
        <title>Signin</title>
      </Head>
      <main>
        <Image src={logo} alt="app" className={signupStyles.logo} />
        <form className={styles["signin__form-el"]}>
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
          <Button type="main" text="Signin" />
        </form>
        <div className={styles["bottom"]}>
          <p className={styles["bottom__account"]}>
            Don't have an account? <span> Signup</span>
          </p>
          <p className={styles["bottom__password"]}>Forget password?</p>
        </div>
      </main>
    </>
  );
}
