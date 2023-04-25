import { createRxDatabase } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { newsPaperSchema, zittiSchema } from './schema.js';

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
//creating a collection for shopping list
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
  console.log('already exist : ', isExist);
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
  return inserted ? true : false;
};
const isPaperFetched = async (date) => {
  const document = await newsPaperCollection.newspaper.find().exec();
  //check if data exist
  const exist = document.find((item) => item._data.date === date);
  //if exist return true else false
  return exist ? true : false;
};
