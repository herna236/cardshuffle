import axios from 'axios';

const asyncCards = async () => {
  try {
    const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    console.log(res.data); 
    return res.data; 
  } catch (error) {
    console.error('Error fetching data:', error); 
    throw error; 
  }
};

export default asyncCards; 

