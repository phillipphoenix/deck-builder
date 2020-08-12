import { useState, useEffect } from "react";
import Head from "next/head";
import pageStyles from "./Page.module.scss";
import styles from "./play.module.scss";
import PageHeader from "../components/page-header/page-header";
import Nav from "../components/navigation/navigation";
import Link from "next/link";
import HeaderBar from "../components/header-bar/header-bar";
import Item from "../components/card-item/item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { PlaySessionData } from "../types/PlaySessionData";
import { usePlaySessionDataRepo } from "../data-hooks/usePlaySessionDataRepo";

const header = "Deck Builder";
const subHeader = "Play";

const PlayPage: React.SFC<{}> = () => {
  const [playSessions, setPlaySessions] = useState<PlaySessionData[]>([]);

  const playSessionDataRepo = usePlaySessionDataRepo();

  useEffect(() => {
    playSessionDataRepo.getAll().then((fetchedPlaySessions) => {
      // Sort cards alphabetically by name.
      fetchedPlaySessions = fetchedPlaySessions.sortByAttr((ps) => ps.name);
      // fetchedPlaySessions.sort((deckA, deckB) => (deckA.name > deckB.name ? 1 : -1));
      setPlaySessions(fetchedPlaySessions);
    });
  }, []);

  return (
    <div className={pageStyles.container}>
      <Head>
        <title>Deck Builder | Play</title>
      </Head>

      <div
        className={`${pageStyles["header-container"]} ${
          subHeader ? pageStyles["header-container__with-sub-header"] : ""
        }`}
      >
        <PageHeader header={header} subHeader={subHeader} />
      </div>

      <div className={pageStyles["main-container"]}>
        <main className={pageStyles.main}>
          <h2>Welcome to the Play page!</h2>
          <HeaderBar header="Play sessions">
            <Link href="/play-session/create">
              <button>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </Link>
          </HeaderBar>
          <div>
            {playSessions.map((ps) => (
              <div key={ps.id} className={styles["item-with-button"]}>
                <Link href="/play-session/:id/play" as={`/play-session/${ps.id}/play`}>
                  <span className={styles["item-with-button--item"]}>
                    <Item itemData={ps} />
                  </span>
                </Link>
                <span className={styles["item-with-button--button-right"]}>
                  <Link href="/play-session/:id/edit" as={`/play-session/${ps.id}/edit`}>
                    <button>Edit</button>
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </main>
        <footer className={pageStyles.footer}>Build with ☕ by Phillip</footer>
      </div>

      <div className={pageStyles["nav-container"]}>
        <Nav />
      </div>
    </div>
  );
};

export default PlayPage;
