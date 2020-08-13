import React, { useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import pageStyles from "../../Page.module.scss";
import styles from "./play.module.scss";
import PageHeader from "../../../components/page-header/page-header";
import Nav from "../../../components/navigation/navigation";
import HeaderBar from "../../../components/header-bar/header-bar";
import { PlaySessionData } from "../../../types/PlaySessionData";
import { usePlaySessionDataRepo } from "../../../data-hooks/usePlaySessionDataRepo";
import { useDeckDataRepo } from "../../../data-hooks/useDeckDataRepo";
import { DeckData } from "../../../types/DeckData";
import { CardData } from "../../../types/CardData";
import { useCardDataRepo } from "../../../data-hooks/useCardDataRepo";
import Item from "../../../components/item/item";
import Card from "../../../components/card/card";
import CardPile from "../../../components/card-pile/card-pile";
import { GetCardsInDeck } from "../../../utils/DeckUtils";
import { shuffleCards } from "../../../utils/CardUtils";

const header = "Deck Builder";
const subHeader = "Run Play Session";

const PlaySessionPlayPage: React.SFC<any> = () => {
  const router = useRouter();
  const playSessionId = useMemo(() => router.query.id as string, [router]);
  const playSessionDataRepo = usePlaySessionDataRepo();
  const deckDataRepo = useDeckDataRepo();
  const cardDataRepo = useCardDataRepo();
  const [playSession, setPlaySession] = useState<PlaySessionData>(null);
  const [drawPile, setDrawPile] = useState<CardData[]>([]);
  const [hand, setHand] = useState<CardData[]>([]);
  const [discardPile, setDiscardPile] = useState<CardData[]>([]);
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
          return deckDataRepo.findById(playSessionData.deckId).then((deckData) => {
            GetCardsInDeck(deckData, cardDataRepo).then((deckCards) => {
              const shuffledDeckCards = shuffleCards(deckCards);
              setDrawPile(shuffledDeckCards);
            });
          });
        });
    }
  }, [playSessionId]);

  const drawCard = () => {
    const [topCard, ...restOfDeck] = drawPile;
    setHand([...hand, topCard]);
    setDrawPile(restOfDeck);
  };

  const moveToDiscardPile = (card: CardData) => {
    var index = hand.indexOf(card);
    if (index > -1) {
      hand.splice(index, 1);
      setHand(hand);
    }
    const updatedDiscardPile = [...discardPile, card];
    console.log(updatedDiscardPile);
    setDiscardPile(updatedDiscardPile);
  };

  const reshuffleDiscardPile = () => {
    const shuffledDiscardPile = shuffleCards(discardPile);
    setDrawPile([...drawPile, ...shuffledDiscardPile]);
    setDiscardPile([]);
  };

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
          <HeaderBar header={`${playSession?.name}`} backHref="/play" />
          <div>
            {playSession && (
              <div className={styles["deck-and-discard-piles"]}>
                <h4 className={styles["deck-header"]}>Deck pile</h4>
                <h4 className={styles["discard-header"]}>Discard pile</h4>
                <div className={styles["deck-pile"]}>
                  <CardPile cards={drawPile} isFaceUp={false} />
                </div>
                <div className={styles["discard-pile"]}>
                  <CardPile cards={discardPile} isFaceUp={true} />
                </div>
                <div className={styles["deck-actions"]}>
                  <button onClick={() => drawCard()}>Draw card</button>
                </div>
                <div className={styles["discard-actions"]}>
                  <button onClick={() => reshuffleDiscardPile()}>Reshuffle</button>
                </div>
              </div>
            )}
            <h4>Hand of cards</h4>
            {playSession && (
              <div className={pageStyles["item-list"]}>
                {hand.map((card, i) => (
                  <div key={i} onClick={() => moveToDiscardPile(card)}>
                    <Card cardData={card} />
                  </div>
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
