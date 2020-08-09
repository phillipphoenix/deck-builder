import Head from "next/head";
import pageStyles from "./Page.module.scss";
import PageHeader from "../components/page-header/page-header";
import Nav from "../components/navigation/navigation";

const header = "Deck Builder";
const subHeader = "Play";

const PlayPage: React.SFC<{}> = () => {
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