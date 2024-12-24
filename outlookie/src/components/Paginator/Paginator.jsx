import styles from "./Paginator.module.css";

function Paginator({ page, setPage }) {
  const increment = () => setPage((prev) => prev + 1);
  const decrement = () => setPage((prev) => (prev == 1 ? 1 : prev - 1));

  return (
    <div>
      <span onClick={decrement} className={styles["paginator__button"]}>
        {"<"}
      </span>
      <span className={styles["paginator__page-label"]}>{page}</span>
      <span onClick={increment} className={styles["paginator__button"]}>
        {">"}
      </span>
    </div>
  );
}

export default Paginator;
