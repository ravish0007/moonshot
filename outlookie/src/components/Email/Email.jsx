import { memo, useEffect, useState } from "react";
import { formatDate } from "../../utils";
import ProfileImage from "../ProfileImage/ProfileImage";
import styles from "./Email.module.css";
import API from "../../api.js";

function Email({ email, isFavorite, goBack, markFavorite, className }) {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email?.id) {
      return;
    }

    async function fetchEmail() {
      setLoading(true);
      const email_response = await API.getEmail(email.id);
      setLoading(false);
      setBody(email_response.body);
    }

    fetchEmail();
  }, [email?.id]);

  if (!email) {
    return (
      <main
        className={`${className} ${styles["email__container"]} ${styles["slide-out"]}`}
      ></main>
    );
  }

  return (
    <main
      className={`${className} ${styles["email__container"]} ${styles["slide-in"]}`}
    >
      <div className={styles["email__profile-container"]}>
        <ProfileImage char={email.from.name[0]} />
        <span onClick={goBack} className={styles["email__back-button"]}>
          {"back"}
        </span>
      </div>

      <div className={styles["email__header-outercontainer"]}>
        <div className={styles["email__header-container"]}>
          <div>
            <div className={styles["email__header-subject"]}>
              {email.subject}
            </div>
            <div className={styles["email__header-date"]}>
              {formatDate(email.date)}
            </div>
          </div>
          <button
            className={styles["email__favorite-button"]}
            onClick={markFavorite}
          >
            {isFavorite ? "Unmark favorite" : "Mark as favorite"}
          </button>
        </div>

        {loading && (
          <div className={styles["email__place-holder"]}>
            {" "}
            Fetching Content{" "}
          </div>
        )}

        {!loading && (
          <div
            className={styles["email__content"]}
            dangerouslySetInnerHTML={{ __html: body }}
          ></div>
        )}
      </div>
    </main>
  );
}

export default memo(Email);
