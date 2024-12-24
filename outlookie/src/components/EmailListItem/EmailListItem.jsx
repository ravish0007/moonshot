import ProfileImage from "../ProfileImage/ProfileImage";
import styles from "./EmailListItem.module.css";
import { formatDate } from "../../utils.js";

function EmailListItem({
  email,
  isRead,
  isFavorite,
  isSelected,
  onClick,
  enableTrim,
}) {
  const item_style = `${styles["email-list-item"]} ${
    isRead ? styles["email-list-item--read"] : ""
  } ${isSelected ? styles["email-list-item--selected"] : ""}`;

  return (
    <div className={item_style} onClick={onClick}>
      <ProfileImage char={email.from.name[0]} />
      <div className={styles["email-list-item__content"]}>
        <p>
          From:{" "}
          <span>
            <span className={styles["email-list-item__name"]}>
              {email.from.name}
            </span>
            <span className={styles["email-list-item__email"]}>
              {`<${email.from.email}>`}
            </span>
          </span>
        </p>
        <p>
          Subject:{" "}
          <span className={styles["email-list-item__subject"]}>
            {email.subject}
          </span>
        </p>
        <p
          className={
            enableTrim
              ? styles["email-list-item__short-description--trimmed"]
              : styles["email-list-item__short-description"]
          }
        >
          {email.short_description + email.short_description}
        </p>
        <div className={styles["email-list-item__date"]}>
          <p> {formatDate(email.date)} </p>
          {isFavorite && (
            <p className={styles["email-list-item__favorite"]}> Favorite</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailListItem;
