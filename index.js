import axios from 'axios';

const zitti = async (userInput) => {
  await axios
    .post('http://127.0.0.1:3000/addToShoppingList', {
      itemName: 'SWeet',
    })
    .then((result) => {
      console.log(result.data, 'post result');
    });
  axios.get('http://127.0.0.1:3000/getShoppingList').then((result) => {
    console.log(result.data);
  });
};
zitti('Hey. How are you?');
