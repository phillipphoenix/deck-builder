import React, { useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import pageStyles from "../../Page.module.scss";
import PageHeader from "../../../components/page-header/page-header";
import HeaderBar from "../../../components/header-bar/header-bar";
import Nav from "../../../components/navigation/navigation";
import { useDeckDataRepo } from "../../../data-hooks/useDeckDataRepo";
import { DeckData } from "../../../types/DeckData";
import EditDeck from "../../../components/edit-deck/edit-deck";

const header = "Deck Builder";

const EditDeckPage: React.SFC<any> = () => {
  const router = useRouter();
  const deckId = useMemo(() => router.query.id as string, [router]);
  const deckDataRepo = useDeckDataRepo();
  const [deck, setDeck] = useState<DeckData>(null);

  useEffect(() => {
    if (deckId) {
      deckDataRepo.findById(deckId).then((deckData) => setDeck(deckData));
    }
  }, [deckId]);

  const subHeader = `Edit deck: ${deck?.name}`;

  return (
    <div className={pageStyles.container}>
      <Head>
        <title>Deck Builder | Edit Deck</title>
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
          <HeaderBar header="Edit a deck" backHref="/decks" />
          <div>
            <EditDeck deckId={deckId} navigateBack={() => router.back()} />
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

export default EditDeckPage;
