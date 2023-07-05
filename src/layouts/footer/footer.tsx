import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer__links"]}>
        <div className={styles["footer__side"]}>
          <h5 className={styles["footer__title"]}>Quick links</h5>
          <div className={styles["footer__items"]}>
            <p>Home</p>
            <p>Items</p>
            <p>Contact Us</p>
          </div>
        </div>

        <div className={styles["footer__side"]}>
          <h5 className={styles["footer__title"]}>Social media</h5>
          <div className={styles["footer__items"]}>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Youtube</p>
          </div>
        </div>
      </div>

      <p className={styles["footer__copy"]}>
        &copy; Copyright {new Date().getFullYear()}. All rights reserved.
      </p>
    </footer>
  );
}
