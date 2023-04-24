import axios from 'axios';
import { userInput } from './input/userinput.js';

const zitti = async () => {
  userInput.forEach((input) => {
    const inputInSmallCase = input.toLowerCase();
    //finding out the main word from given input to process further as they have many task related
    //if match found matchFound is an array of result or null otherwise
    const matchFound = inputInSmallCase.match(/\bshopping\b|\bclean\b/);
    const mainWord = matchFound ? matchFound[0] : inputInSmallCase;
    switch (mainWord) {
      case 'shopping':
        console.log('match found for shopping');
        break;
      case 'fetch the newspaper.':
        console.log('match found for newspaper');
        break;
      case 'clean':
        console.log('match found for clean');

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
zitti();
