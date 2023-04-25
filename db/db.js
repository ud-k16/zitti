import { createRxDatabase } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { newsPaperSchema, zittiSchema } from './schema.js';

//variable to store room cleaned time
let cleanedHour;
let cleanedMinute;
//creation of a database
const db = await createRxDatabase({
  name: 'zitti',
  storage: getRxStorageMemory(),
});
//creating a collection for shopping list
const collection = await db.addCollections({
  shoppingList: {
    schema: zittiSchema,
  },
});
//creating a collection for newspaper fetched
const newsPaperCollection = await db.addCollections({
  newspaper: {
    schema: newsPaperSchema,
  },
});
/**
 * adds item to shopping list if not already present
 * @param {*} itemName
 * @returns true if added else false
 */
export const addToShoppingList = async (itemName) => {
  const isExist = await isExistAlready(itemName);
  let addedOrNot;
  console.log(`${itemName} `, 'already exist : ', isExist);
  //if item not exist add to shoppinglist and return true indicating item added to list
  if (!isExist) {
    addedOrNot = await collection.shoppingList
      .insert({
        itemName: itemName.toLowerCase(),
      })
      .catch((error) => console.log(error, 'error'));
  }
  //if item already exist return false indicating given item not added now
  return addedOrNot ? true : false;
};

/**
 * check if item exist in shopingList
 * @param {*} itemName
 * @returns true if item exist in shoppinglist or false if does not exist
 */
const isExistAlready = async (itemName) => {
  const document = await collection.shoppingList.find().exec();
  //check if data exist
  const exist = document.find((item) => item._data.itemName === itemName);
  //if exist return true else false
  return exist ? true : false;
};
/**
 * prints shopping list to console
 */
export const printShoppingList = () => {
  collection.shoppingList
    .find()
    .exec()
    .then((document) => {
      const resultSet = document.map((item) => item._data.itemName);
      console.log(`${JSON.stringify(resultSet, null, 4)}`);
    });
};
/**
 *
 * @returns the shopping list in an array
 */
export const getShoppingList = async () => {
  const document = await collection.shoppingList.find().exec();
  const shoppingList = document.map((item) => item._data.itemName);
  return shoppingList;
};
/**
 * checks for if the given date for newspaper is present in db or adds the given date to db
 * @param {*} date
 * @returns
 */
export const fetchPaper = async (date) => {
  let inserted;
  // check if already fetched
  const fetched = await isPaperFetched(date);
  if (!fetched) {
    inserted = await newsPaperCollection.newspaper
      .insert({
        date,
      })
      .catch((error) =>
        console.log(error, 'error occured in the newspaper insert')
      );
  }
  //if given date added true is returned or else fasle
  return inserted ? true : false;
};
/**
 * checks if given date is present in db returns true if exist or false
 * @param {*} date
 * @returns
 */
const isPaperFetched = async (date) => {
  const document = await newsPaperCollection.newspaper.find().exec();
  //check if data exist
  const exist = document.find((item) => item._data.date === date);
  //if exist return true else false
  return exist ? true : false;
};

//executes  room cleaning concept
export const cleanRoom = () => {
  const hourOfRequest = new Date().getHours();
  const minuteOfRequest = new Date().getMinutes();
  if (cleanedHour || cleanedMinute) {
    const hourElapsed = cleanedHour - hourOfRequest;
    const minutesElapsed = cleanedMinute - minuteOfRequest;
    if (hourElapsed == 0 && minutesElapsed < 10) {
      return `The room was just cleaned ${minutesElapsed} minute(s) ago. I hope it's not dirty`;
    } else {
      //if cleaned time is more than 10 minutes this else block executes
      cleanedHour = hourOfRequest;
      cleanedMinute = minuteOfRequest;
      return `Room is cleaned. It looks tidy now. Job completed at ${cleanedHour}:${cleanedMinute}`;
    }
  } else {
    //else block executes when its the first time requested
    cleanedHour = hourOfRequest;
    cleanedMinute = minuteOfRequest;
    return `Room is cleaned. It looks tidy now. Job completed at ${cleanedHour}:${cleanedMinute}`;
  }
};
