import axios from 'axios';

const drawCard = async (deckId) => {
  try {
    const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    if (res.data.success) {
      console.log(res.data)
      return res.data.cards[0];
      
    } else {
      throw new Error('No cards remaining in the deck.');
    }
  } catch (error) {
    console.error('Error drawing card:', error);
    throw error; // Rethrow the error for further handling
  }
};

export default drawCard;