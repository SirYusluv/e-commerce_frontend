import Upload from "@/layouts/upload-update/upload/upload";
import { ACCESS_TOKEN } from "@/util/data";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./upload-update.module.scss";

export default function UploadUpdate() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    !token && router.replace("/auth/signin");
  }, []);

  useEffect(() => {
    !router.query.path && router.replace("/agent?path=upload");
  }, []);

  const nav = (
    <nav className={styles.nav}>
      <Link
        href="?path=upload"
        className={
          router.query.path === "upload" || !router.query.path
            ? styles["nav__navi--active"]
            : ""
        }
      >
        Upload
      </Link>
      <Link
        href="?path=update"
        className={
          router.query.path === "update" ? styles["nav__navi--active"] : ""
        }
      >
        Update
      </Link>
    </nav>
  );

  return (
    <div className={styles.agent}>
      {nav}

      {router.query.path === "upload" && <Upload />}
      {/* { router.query.path !== "upload" && <Update /> } */}
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
