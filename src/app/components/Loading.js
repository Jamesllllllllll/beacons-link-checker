import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div class={styles.spinnerBox}>
      <div class={`${styles.blueOrbit} ${styles.leo}`}></div>

      <div class={`${styles.greenOrbit} ${styles.leo}`}></div>

      <div class={`${styles.redOrbit} ${styles.leo}`}></div>

      <div class={`${styles.whiteOrbit} ${styles.w1} ${styles.leo}`}></div>
      <div class={`${styles.whiteOrbit} ${styles.w2} ${styles.leo}`}></div>
      <div class={`${styles.whiteOrbit} ${styles.w3} ${styles.leo}`}></div>
    </div>
  );
}
