import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { v4 } from 'uuid';
function App() {
  const NEW_DECK_URL = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
  let [DECK_ID, setDECK_ID] = useState("");
  let [cards, setCards] = useState([]);
  console.log("I just rendered!")

  useEffect(function fetchDeckIdWhenMounted() {
    async function fetchDeckId() {
      const res = await axios.get(NEW_DECK_URL);
      setDECK_ID(res.data.deck_id);
    }
    fetchDeckId();
  }, []);



  async function drawCard() {
    const drawCardURL = `http://deckofcardsapi.com/api/deck/${DECK_ID}/draw/?count=1`;
    const res = await axios.get(drawCardURL);
    console.log(res);
    const card = res.data.cards[0];
    setCards(cards => [...cards, card]);
  }
  const showCards = cards.map(card => {
    let id = v4()
    return (<Card img={card.image} key={id} id={id} />)
  })


  return (
    <div className="App">
      <header className="App-header">
        <h1>Draw a card, I dare you</h1>
        <button onClick={drawCard}>Hit me!</button>
        <div>{showCards}</div>
      </header>
    </div>
  );
}

export default App;
