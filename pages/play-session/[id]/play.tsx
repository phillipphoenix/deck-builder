import React, { useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import pageStyles from "../../Page.module.scss";
import PageHeader from "../../../components/page-header/page-header";
import Nav from "../../../components/navigation/navigation";
import HeaderBar from "../../../components/header-bar/header-bar";
import { PlaySessionData } from "../../../types/PlaySessionData";
import { usePlaySessionDataRepo } from "../../../data-hooks/usePlaySessionDataRepo";
import { useDeckDataRepo } from "../../../data-hooks/useDeckDataRepo";
import { DeckData } from "../../../types/DeckData";
import { CardData } from "../../../types/CardData";
import { useCardDataRepo } from "../../../data-hooks/useCardDataRepo";
import Item from "../../../components/card-item/item";

const header = "Deck Builder";
const subHeader = "Run Play Session";

const PlaySessionPlayPage: React.SFC<any> = () => {
  const router = useRouter();
  const playSessionId = useMemo(() => router.query.id as string, [router]);
  const playSessionDataRepo = usePlaySessionDataRepo();
  const deckDataRepo = useDeckDataRepo();
  const cardDataRepo = useCardDataRepo();
  const [playSession, setPlaySession] = useState<PlaySessionData>(null);
  const [deck, setDeck] = useState<DeckData>(null);
  const [allCards, setAllCards] = useState<{ [cardId: string]: CardData }>({});

  useEffect(() => {
    cardDataRepo
      .getAll()
      .then((fetchedCards) =>
        setAllCards(fetchedCards.reduce((acc, card) => ({ ...acc, [card.id]: card }), {}))
      );
  }, []);

  useEffect(() => {
    if (playSessionId) {
      playSessionDataRepo
        .findById(playSessionId)
        .then((playSessionData) => {
          setPlaySession(playSessionData);
          return playSessionData;
        })
        .then((playSessionData) => {
          return deckDataRepo
            .findById(playSessionData.deckId)
            .then((deckData) => setDeck(deckData));
        });
    }
  }, [playSessionId]);

  return (
    <div className={pageStyles.container}>
      <Head>
        <title>Deck Builder | Run Play Session</title>
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
          <HeaderBar header="Run play session" backHref="/play" />
          <div>
            <p>RUN {playSession?.name}!</p>
            {deck && (
              <div>
                {Object.keys(deck.cards).map((cardId) => (
                  <Item key={cardId} itemData={allCards[cardId]} />
                ))}
              </div>
            )}
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

export default PlaySessionPlayPage;
