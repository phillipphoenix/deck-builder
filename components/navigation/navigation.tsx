import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faLayerGroup, faPlay } from "@fortawesome/free-solid-svg-icons";

import styles from "./navigation.module.scss";

const Nav: React.SFC<{}> = () => {
  return (
    <nav className={`${styles.navigation} ${styles.navigation__bottom}`}>
      <span className={styles.btn}>
        <FontAwesomeIcon icon={faBook} />
      </span>
      <span className={styles.btn}>
        <FontAwesomeIcon icon={faLayerGroup} />
      </span>
      <span className={styles.btn}>
        <FontAwesomeIcon icon={faPlay} />
      </span>
    </nav>
  );
};

export default Nav;
