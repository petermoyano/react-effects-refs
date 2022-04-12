import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { v4 } from 'uuid';
function App() {
  const NEW_DECK_URL = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
  let [DECK_ID, setDECK_ID] = useState("");
  let [cards, setCards] = useState([]);
  let [setIntervalID, setSetIntervalID] = useState(0);
  let [remainingCards, setRemainingCards] = useState("");
  let [restart, setRestart] = useState(0);

  useEffect(function fetchDeckIdWhenMounted() {
    setCards([]);
    async function fetchDeckId() {
      const res = await axios.get(NEW_DECK_URL);
      setDECK_ID(res.data.deck_id);
    }
    fetchDeckId();
  }, [restart]);

  async function drawCard() {
    const drawCardURL = `http://deckofcardsapi.com/api/deck/${DECK_ID}/draw/?count=1`;
    setIntervalID = setInterval(async () => {
      const res = await axios.get(drawCardURL);
      setRemainingCards(res.data.remaining);
      const card = res.data.cards[0];
      setCards(cards => [...cards, card]);
    }, 1000)
    setSetIntervalID(setIntervalID);
  }

  const stopDrawCard = () => {
    clearTimeout(setIntervalID);
  }

  const showCards = cards.map(card => {
    let id = v4()
    return (<Card img={card.image} key={id} id={id} />)
  })

  if(remainingCards === 46){
    alert("Error: no cards remaining!");
    clearTimeout(setIntervalID);
    setRemainingCards(52);
    setRestart(() => restart + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Draw a card, I dare you and restart is {restart}</h1>
        <button onClick={drawCard}>Hit me!</button>
        <button onClick={stopDrawCard}>Stop draw</button>
        <div>{showCards}</div>
      </header>
    </div>
  );
}

export default App;
