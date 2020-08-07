import React from "react";
import Head from "next/head";
import pageStyles from "../Page.module.scss";
import PageHeader from "../../components/page-header/page-header";
import Nav from "../../components/navigation/navigation";
import { CardData } from "../../types/card-data";
import HeaderBar from "../../components/header-bar/header-bar";

const header = "Deck Builder";
const subHeader = "Create card";

const CreateCardPage: React.SFC<any> = () => {
  return (
    <div className={pageStyles.container}>
      <Head>
        <title>Deck Builder | Create Card</title>
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
          <HeaderBar header="Create a card" backHref="/" />
        </main>
        <footer className={pageStyles.footer}>Build with ☕ by Phillip</footer>
      </div>

      <div className={pageStyles["nav-container"]}>
        <Nav />
      </div>
    </div>
  );
};

export default CreateCardPage;
