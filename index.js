import axios from 'axios';
import { userInput } from './input/userinput.js';

const zitti = () => {
  //userInput is an array of input sentence
  userInput.forEach((input, index) => processInput(input, index));
};

/**
 * performs http post request
 * @param {*} routeName
 * @param {*} data
 * @returns
 */
const post = async (routeName, data) => {
  const { data: response } = await axios.post(
    `http://127.0.0.1:3000/${routeName}`,
    data
  );
  return response;
};
/**
 * performs an http get request without query
 * @param {*} routeName
 
 * @returns
 */
const get = async (routeName) => {
  const { data: response } = await axios.get(
    `http://127.0.0.1:3000/${routeName}`
  );
  return response;
};
/**
 * parses the sentence and return item to add in shopping list
 * @param {*} inputInSmallCase
 * @returns
 */
const getItemFromSentence = (inputInSmallCase) => {
  const inputWithoutSpace = inputInSmallCase.replaceAll('.', '');

  const words = inputWithoutSpace.split(' ');

  const referenceSet = new Set(['add', 'to', 'my', 'shopping', 'list']);
  const object = words.filter((eachWord) => !referenceSet.has(eachWord));

  return object[0];
};
/**
 * process the given input
 * @param {*} input
 */
const processInput = async (input) => {
  {
    const inputInSmallCase = input.toLowerCase();
    //finding out the main word from given input to process further as they have many task related
    //if match found matchFound is an array of result or null otherwise
    const matchFound = inputInSmallCase.match(/\bshopping\b/);
    const mainWord = matchFound ? matchFound[0] : inputInSmallCase;
    switch (mainWord) {
      case 'shopping':
        if (inputInSmallCase.match(/\bread/)) {
          const { response } = await get('getShoppingList');
          //list of items comes in an array
          response.length > 0
            ? console.log(
                '\nQ:',
                input,
                '\nA:',
                'Here is your shopping list.',
                response.join(','),
                '\n'
              )
            : console.log(
                'Q:',
                input,
                '\nA:',
                'You have no items in your shopping list',
                '\n'
              );
        } else if (inputInSmallCase.includes('add')) {
          const itemName = getItemFromSentence(inputInSmallCase);
          const { response } = await post('addToShoppingList', {
            itemName,
          });
          console.log('Q:', input, '\nA:', response, '\n');
        }
        break;
      case 'fetch the newspaper.': {
        const { response } = await post('fetchPaper', {
          date: new Date().getDate(),
        });
        console.log(`Q:`, input, `\nA: ${response}\n`);
        break;
      }
      case 'clean my room.':
        const { response } = await get('cleanRoom');
        console.log(`Q: ${input} \nA: ${response}\n`);
        break;
      case "how's the weather outside?":
        console.log(
          `Q:`,
          input,
          "\nA. It's pleasant outside. You should take a walk.\n"
        );
        break;
      case 'hey. how are you?':
        console.log(`Q:`, input, `\nA :Hello, I am doing great.\n`);

        break;
      default:
        console.log(`Q:`, input, "\nA. Hmm.. I don't know that\n");
        break;
    }
  }
};
//execution of zitti
zitti();
