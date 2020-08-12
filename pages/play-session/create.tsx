import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import pageStyles from "../Page.module.scss";
import PageHeader from "../../components/page-header/page-header";
import Nav from "../../components/navigation/navigation";
import HeaderBar from "../../components/header-bar/header-bar";
import EditPlaySession from "../../components/edit-play-session/edit-play-session";

const header = "Deck Builder";
const subHeader = "Setup Play Session";

const CreateCardPage: React.SFC<any> = () => {
  const router = useRouter();

  return (
    <div className={pageStyles.container}>
      <Head>
        <title>Deck Builder | Setup Play Session</title>
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
          <HeaderBar header="Setup play session" backHref="/play" />
          <div>
            <EditPlaySession navigateBack={() => router.back()} />
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

export default CreateCardPage;
