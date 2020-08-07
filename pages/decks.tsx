import Head from "next/head";
import pageStyles from "./Page.module.scss";
import PageHeader from "../components/page-header/page-header";
import Nav from "../components/navigation/navigation";

const header = "Deck Builder";
const subHeader = "Decks";

const DecksPage: React.SFC<{}> = () => {
  return (
    <div className={pageStyles.container}>
      <Head>
        <title>Deck Builder | Decks</title>
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
          <p>Lorem ipsum dolor sit amet!</p>
          <p>Lorem ipsum dolor sit amet!</p>
          <p>Lorem ipsum dolor sit amet!</p>
          <p>Lorem ipsum dolor sit amet!</p>
          <p>Lorem ipsum dolor sit amet!</p>
          <p>Lorem ipsum dolor sit amet!</p>
          <p>Lorem ipsum dolor sit amet!</p>
          <p>Lorem ipsum dolor sit amet!</p>
          <p>Lorem ipsum dolor sit amet!</p>
          <p>Lorem ipsum dolor sit amet!</p>
        </main>
        <footer className={pageStyles.footer}>Build with ☕ by Phillip</footer>
      </div>

      <div className={pageStyles["nav-container"]}>
        <Nav />
      </div>
    </div>
  );
};

export default DecksPage;
