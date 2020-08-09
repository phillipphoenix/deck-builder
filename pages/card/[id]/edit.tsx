import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import pageStyles from "../../Page.module.scss";
import PageHeader from "../../../components/page-header/page-header";
import HeaderBar from "../../../components/header-bar/header-bar";
import EditCard from "../../../components/edit-card/edit-card";
import Nav from "../../../components/navigation/navigation";
import { CardData } from "../../../types/CardData";

const header = "Deck Builder";

const EditCardPage: React.SFC<any> = () => {
  const router = useRouter();

  const cardId = useMemo(() => router.query.id as string, [router]);

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
          <HeaderBar header="Edit a card" backHref="/" />
          <div>
            <EditCard cardId={cardId} navigateBack={() => router.back()} />
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

export default EditCardPage;
