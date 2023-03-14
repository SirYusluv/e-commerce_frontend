import styles from "input.module.scss";

interface IProps {
  text: string;
}

export default function Input({ text }: IProps) {
  return <input className={styles["input-box"]} placeholder={text} />;
}
