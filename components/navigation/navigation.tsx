import Link from "next/link";
import CardIcon from "../../resources/playing-card.svg";
import CardsIcon from "../../resources/playing-cards.svg";
import PlayIcon from "../../resources/flag-play.svg";

import styles from "./navigation.module.scss";

const Nav: React.SFC<{}> = () => {
  return (
    <nav className={`${styles.navigation} ${styles.navigation__bottom}`}>
      <Link href="/">
        <span className={styles.btn}>
          <CardIcon />
        </span>
      </Link>
      <Link href="/decks">
        <span className={styles.btn}>
          <CardsIcon />
        </span>
      </Link>
      <Link href="/play">
        <span className={styles.btn}>
          <PlayIcon />
        </span>
      </Link>
    </nav>
  );
};

export default Nav;
