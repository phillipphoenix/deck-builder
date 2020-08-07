import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import pageStyles from "../../Page.module.scss";
import PageHeader from "../../../components/page-header/page-header";
import Nav from "../../../components/navigation/navigation";
import { CardData } from "../../../types/card-data";

const header = "Deck Builder";

const EditCardPage: React.SFC<any> = () => {
  const router = useRouter();

  const { id: cardId } = router.query;

  const subHeader = `Edit card: ${cardId}`;

  return (
    <div className={pageStyles.container}>
      <Head>
        <title>Deck Builder | Edit Card</title>
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
          <h2>Edit a card!</h2>
        </main>
        <footer className={pageStyles.footer}>Build with ☕ by Phillip</footer>
      </div>

      <div className={pageStyles["nav-container"]}>
        <Nav />
      </div>
    </div>
  );
};

export default EditCardPage;
