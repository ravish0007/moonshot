import { memo } from "react";
import styles from "./ProfileImage.module.css";

function ProfileImage({ char }) {
  return (
    <div className={styles["profile-image"]}>
      <span className={styles["profile-image--text"]}>
        {char.toUpperCase()}
      </span>
    </div>
  );
}

export default memo(ProfileImage);
