import { useEffect, useState } from "react";
import API from "./api";
import styles from "./App.module.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import EmailList from "./components/EmailList/EmailList.jsx";
import Paginator from "./components/Paginator/Paginator.jsx";
import Email from "./components/Email/Email";

import { addItem, removeItem, extractSet, persistSet } from "./utils";

function App() {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);

  const [page, setPage] = useState(1);
  const [active, setActive] = useState("unread");
  const [currentSelection, setCurrentSelection] = useState(null);
  const [reads, setReads] = useState(() => new Set());
  const [favorites, setFavorites] = useState(() => new Set());

  useEffect(() => {
    // syncing state
    setReads(extractSet("reads"));
    setFavorites(extractSet("favorites"));
  }, []);

  useEffect(() => {
    async function fetchEmails() {
      const emails = await API.getEmails(page);
      setEmails(emails.list);
    }
    fetchEmails();
  }, [page]);

  useEffect(() => {
    setCurrentSelection(null);
    const filteredEmails = emails.filter((email) => {
      switch (active) {
        case "unread":
          return !reads.has(email.id);
        case "read":
          return reads.has(email.id);
        case "favorites":
          return favorites.has(email.id);
      }
    });
    setSelectedEmails(filteredEmails);
  }, [active, emails]);

  const addToReads = (id) => {
    addItem(id, setReads);
    persistSet("reads", new Set(reads).add(id));
  };

  const addToFavorites = (id) => {
    if (favorites.has(id)) {
      removeItem(id, setFavorites);
      const favs = new Set(favorites);
      favs.remove(id);
      persistSet("favorites", favs);
    } else {
      addItem(id, setFavorites);
      persistSet("favorites", new Set(favorites).add(id));
    }
  };

  const goBack = () => setCurrentSelection(null);

  const currentEmail = emails.find((email) => email.id == currentSelection);

  return (
    <>
      <div className={styles["app__nav"]}>
        <NavBar active={active} setActive={setActive} />
        <Paginator setPage={setPage} page={page} />
      </div>

      <div className={styles["app__body"]}>
        <EmailList
          emails={selectedEmails}
          reads={reads}
          addToReads={addToReads}
          favorites={favorites}
          currentSelection={currentSelection}
          setCurrentSelection={setCurrentSelection}
        />
        <Email
          markFavorite={() => addToFavorites(currentEmail?.id)}
          goBack={goBack}
          isFavorite={favorites.has(currentEmail?.id)}
          email={currentEmail}
        />
      </div>
    </>
  );
}

export default App;
