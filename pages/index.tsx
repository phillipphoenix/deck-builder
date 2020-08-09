import { useState, useEffect } from "react";
import Head from "next/head";
import pageStyles from "./Page.module.scss";
import PageHeader from "../components/page-header/page-header";
import Nav from "../components/navigation/navigation";
import { CardData } from "../types/CardData";
import Link from "next/link";
import HeaderBar from "../components/header-bar/header-bar";
import CardItem from "../components/card-item/card-item";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCardDataRepo } from "../data-hooks/useCardDataRepo";

const header = "Deck Builder";
const subHeader = "Cards";

const CardsPage: React.SFC<{}> = () => {
  const [cards, setCards] = useState<CardData[]>([]);

  const cardDataRepo = useCardDataRepo();

  useEffect(() => {
    cardDataRepo.getAll().then((fetchedCards) => {
      // Sort cards alphabetically by ID.
      fetchedCards.sort((cardA, cardB) =>
        cardA.id === cardB.id ? 0 : cardA.id > cardB.id ? 1 : -1
      );
      setCards(fetchedCards);
    });
  }, []);

  return (
    <div className={pageStyles.container}>
      <Head>
        <title>Deck Builder | Cards</title>
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
          <h2>Welcome to the Cards page!</h2>
          <HeaderBar header="Cards">
            <Link href="/card/create">
              <button>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </Link>
          </HeaderBar>
          <div className={pageStyles["item-list"]}>
            {cards.map((card) => (
              <Link key={card.id} href="/card/:id/edit" as={`/card/${card.id}/edit`}>
                <a>
                  <CardItem cardData={card} />
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

export default CardsPage;
