import { memo } from "react";
import styles from "./EmailList.module.css";
import EmailListItem from "../EmailListItem/EmailListItem";

function EmailList({
  emails,
  reads,
  favorites,
  currentSelection,
  setCurrentSelection,
  addToReads,
}) {
  if (emails.length == 0) {
    return (
      <section className={styles["email-list__empty"]}>No Emails...</section>
    );
  }

  const isRead = (email) => reads.has(email.id);
  const isFavorite = (email) => favorites.has(email.id);
  const isSelected = (email) => email.id == currentSelection;

  const onClickofMail = (id) => {
    addToReads(id);
    //toggling selection
    if (id == currentSelection) {
      setCurrentSelection(null);
    } else {
      setCurrentSelection(id);
    }
  };

  return (
    <section className={styles["email-list__container"]}>
      {emails.map((email) => (
        <EmailListItem
          isSelected={isSelected(email)}
          onClick={() => {
            onClickofMail(email.id);
          }}
          enableTrim={!!currentSelection}
          email={email}
          isRead={isRead(email)}
          isFavorite={isFavorite(email)}
        />
      ))}
    </section>
  );
}

export default memo(EmailList);
