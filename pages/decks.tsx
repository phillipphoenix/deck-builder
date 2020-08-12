import Head from "next/head";
import pageStyles from "./Page.module.scss";
import PageHeader from "../components/page-header/page-header";
import Nav from "../components/navigation/navigation";
import { DeckData } from "../types/DeckData";
import { useState, useEffect } from "react";
import { useCardDataRepo } from "../data-hooks/useCardDataRepo";
import { useDeckDataRepo } from "../data-hooks/useDeckDataRepo";
import HeaderBar from "../components/header-bar/header-bar";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Item from "../components/card-item/item";
import { TotalCardsInDeck } from "../utils/DeckUtils";

const header = "Deck Builder";
const subHeader = "Decks";

const DecksPage: React.SFC<{}> = () => {
  const [decks, setDecks] = useState<DeckData[]>([]);

  const deckDataRepo = useDeckDataRepo();

  useEffect(() => {
    deckDataRepo.getAll().then((fetchedDecks) => {
      // Sort cards alphabetically by name.
      fetchedDecks.sort((deckA, deckB) => (deckA.name > deckB.name ? 1 : -1));
      setDecks(fetchedDecks);
    });
  }, []);

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
          <h2>Your decks!</h2>
          <HeaderBar header="Decks">
            <Link href="/deck/create">
              <button>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </Link>
          </HeaderBar>
          <div className={pageStyles["item-list"]}>
            {decks.map((deck) => (
              <Link key={deck.id} href="/deck/:id/edit" as={`/deck/${deck.id}/edit`}>
                <a>
                  <Item itemData={deck} amount={TotalCardsInDeck(deck)} />
                </a>
              </Link>
            ))}
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

export default DecksPage;
