import axios from 'axios';
import { userInput } from './input/userinput.js';

const zitti = async () => {
  userInput.forEach(async (input) => {
    const inputInSmallCase = input.toLowerCase();
    //finding out the main word from given input to process further as they have many task related
    //if match found matchFound is an array of result or null otherwise
    const matchFound = inputInSmallCase.match(/\bshopping\b|\bclean\b/);
    const mainWord = matchFound ? matchFound[0] : inputInSmallCase;
    switch (mainWord) {
      case 'shopping':
        console.log('Q:', input, `\nA:${''}`);
        break;
      case 'fetch the newspaper.':
        const { response } = await post('fetchPaper', { date: new Date() });
        console.log('Q:', input, `\nA:${response}`);
        break;
      case 'clean':
        console.log('Q:', input, `\nA:${''}`);

        break;
      case "how's the weather outside?":
        console.log(
          'Q:',
          input,
          "\nA.It's pleasant outside. You should take a walk."
        );
        break;
      default:
        console.log('Q:', input, "\nA.Hmm.. I don't know that");
        break;
    }
  });

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
const post = async (routeName, data) => {
  const { data: response } = await axios.post(
    `http://127.0.0.1:3000/${routeName}`,
    data
  );
  return response;
};
zitti();
