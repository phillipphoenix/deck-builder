import styles from "./header.module.scss";

export interface HeaderProps {
  header: string;
  subHeader?: string;
}

const PageHeader: React.SFC<HeaderProps> = ({ header, subHeader }) => {
  return (
    <header className={styles.header}>
      <h1 className={`${subHeader ? styles["has-sub-header"] : ""}`}>{header}</h1>
      {subHeader && <h3 className={styles["sub-header"]}>{subHeader}</h3>}
    </header>
  );
};

export default PageHeader;
