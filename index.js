import axios from 'axios';
import { userInput } from './input/userinput.js';

const zitti = () => {
  userInput.forEach(async (input, index) => await processInput(input, index));

  // await axios
  //   .post('http://127.0.0.1:3000/addToShoppingList', {
  //     itemName: 'SWeet',
  //   })
  //   .then((result) => {
  //     console.log(result.data, 'post result');
  //   });
  // axios.get('http://127.0.0.1:3000/getShoppingList').then((result) => {
  //   console.log(result.data);
  // });
};
const processInput = async (input) => {
  {
    const inputInSmallCase = input.toLowerCase();
    //finding out the main word from given input to process further as they have many task related
    //if match found matchFound is an array of result or null otherwise
    const matchFound = inputInSmallCase.match(/\bshopping\b|\bclean\b/);
    const mainWord = matchFound ? matchFound[0] : inputInSmallCase;
    switch (mainWord) {
      case 'hey. how are you?':
        console.log('Hello, I am doing great.');
        break;
      case 'shopping':
        if (inputInSmallCase.includes('read' || 'get' || 'tell')) {
          const { response } = await get('getShoppingList');
          response.length > 0
            ? console.log('Here is your shopping list.', response)
            : console.log('You have no items in your shopping list');
        }
        break;
      case 'fetch the newspaper.':
        const { response } = await post('fetchPaper', {
          date: new Date().getDate(),
        });
        console.log(`Q:`, input, `\nA:${response}`);
        break;
      case 'clean':
        break;
      case "how's the weather outside?":
        console.log(
          `Q:`,
          input,
          "\nA.It's pleasant outside. You should take a walk."
        );
        break;
      default:
        console.log(`Q:`, input, "\nA.Hmm.. I don't know that");
        break;
    }
  }
};
const post = async (routeName, data) => {
  const { data: response } = await axios.post(
    `http://127.0.0.1:3000/${routeName}`,
    data
  );
  return response;
};
const get = async (routeName, query) => {
  const { data: response } = await axios.get(
    `http://127.0.0.1:3000/${routeName}`
  );
  return response;
};
zitti();
