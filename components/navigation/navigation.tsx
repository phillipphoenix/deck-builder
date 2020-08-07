import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faLayerGroup, faPlay } from "@fortawesome/free-solid-svg-icons";

import styles from "./navigation.module.scss";

const Nav: React.SFC<{}> = () => {
  return (
    <nav className={`${styles.navigation} ${styles.navigation__bottom}`}>
      <Link href="/">
        <span className={styles.btn}>
          <FontAwesomeIcon icon={faBook} />
        </span>
      </Link>
      <Link href="/decks">
        <span className={styles.btn}>
          <FontAwesomeIcon icon={faLayerGroup} />
        </span>
      </Link>
      <Link href="/play">
        <span className={styles.btn}>
          <FontAwesomeIcon icon={faPlay} />
        </span>
      </Link>
    </nav>
  );
};

export default Nav;
