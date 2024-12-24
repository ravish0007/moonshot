import styles from "./NavBar.module.css";

function NavBar({ active, setActive }) {
  const items = ["unread", "read", "favorites"];

  const isActive = (item) => active == item;

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__label}>Filter By: </div>
      <nav className={styles.navbar__nav}>
        {items.map((item) => (
          <span
            key={item}
            className={
              isActive(item)
                ? styles["navbar__list-item--active"]
                : styles["navbar__list-item"]
            }
            onClick={() => setActive(item)}
          >
            {item}
          </span>
        ))}
      </nav>
    </div>
  );
}

export default NavBar;
