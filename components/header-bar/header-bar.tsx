import styles from "./header-bar.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export interface HeaderBarProps {
  header: string;
  backHref?: string;
  backAs?: string;
}

const HeaderBar: React.SFC<HeaderBarProps> = ({ header, backHref, backAs, children }) => {
  return (
    <div className={styles["header-bar"]}>
      <h3 className={styles["header-bar__headline"]}>
        {backHref && (
          <Link href={backHref} as={backAs}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        )}
        <span>{header}</span>
      </h3>
      <div className={styles["header-bar__actions"]}>{children}</div>
    </div>
  );
};

export default HeaderBar;
