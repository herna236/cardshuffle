import React, { useEffect, useState } from 'react';
import './App.css';
import asyncCards from './cards'; // Importing asyncCards function
import drawCard from './drawCard'; // Importing drawCard function

function App() {
  const [deckData, setDeckData] = useState(null); // State to hold deck data
  const [drawnCard, setDrawnCard] = useState(null); // State to hold drawn card data
  const [remainingCards, setRemainingCards] = useState(null); // State to hold remaining cards count

  useEffect(() => {
    const fetchDeckData = async () => {
      try {
        const data = await asyncCards(); // Fetch initial deck data
        setDeckData(data); // Set deckData state with fetched data
        setRemainingCards(data.remaining); // Set remainingCards state with remaining count
      } catch (error) {
        console.error('Error fetching deck data:', error);
      }
    };

    fetchDeckData(); // Call fetchDeckData function
  }, []);

  const handleDrawCard = async () => {
    try {
      if (!deckData || !deckData.deck_id) {
        alert('No deck available. Please fetch a new deck.');
        return;
      }

      const drawn = await drawCard(deckData.deck_id); // Draw a card from current deck
      setDrawnCard(drawn); // Set drawnCard state with drawn card data
      setRemainingCards(drawn.remaining); // Update remainingCards state with new remaining count
    } catch (error) {
      alert('Error: no cards remaining! please select a new deck'); // Alert if no cards remaining
      console.error('Error drawing card:', error);
    }
  };

  const handleNewDeck = async () => {
    try {
      const data = await asyncCards(); // Fetch new deck data
      setDeckData(data); // Set deckData state with fetched new deck data
      setDrawnCard(null); // Reset drawnCard state
      setRemainingCards(data.remaining); // Update remainingCards state with new remaining count
    } catch (error) {
      console.error('Error fetching new deck:', error);
    }
  };

  return (
    <div className="App">
      <h1>Card Drawing App</h1>
      <button onClick={handleDrawCard}>Draw a Card</button>
      <button onClick={handleNewDeck}>New Deck</button>
      {drawnCard && (
        <div>
          <h2>Drawn Card:</h2>
          <p>{drawnCard.value} of {drawnCard.suit}</p>
          {drawnCard.image && <img src={drawnCard.image} alt={`${drawnCard.value} of ${drawnCard.suit}`} />} {/* Render card image */}
          <h3>Cards Remaining: {remainingCards}</h3>
        </div>
      )}
    </div>
  );
}

export default App;


