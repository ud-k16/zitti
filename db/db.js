import { createRxDatabase } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { zittiSchema } from './schema.js';

//creation of a database
const db = await createRxDatabase({
  name: 'zitti',
  storage: getRxStorageMemory(),
});
//creating a collection
const collection = await db.addCollections({
  zittiCollection: {
    schema: zittiSchema,
  },
});

export const addToShoppingList = async (itemName) => {
  const isExist = await isExistAlready(itemName);
  let addedOrNot;
  console.log('already exist : ', isExist);
  //if item not exist add to shoppinglist and return true indicating item added to list
  if (!isExist) {
    addedOrNot = await collection.zittiCollection
      .insert({
        itemName,
      })
      .catch((error) => console.log(error, 'error'));
  }
  //if item already exist return false indicating given item not added now
  return addedOrNot ? true : false;
};

export const printShoppingList = () => {
  collection.zittiCollection
    .find()
    .exec()
    .then((document) => {
      const resultSet = document.map((item) => item._data.itemName);
      console.log(`${JSON.stringify(resultSet, null, 4)}`);
    });
};

//check if item exist in shopingList
const isExistAlready = async (itemName) => {
  const document = await collection.zittiCollection.find().exec();
  //check if data exist
  const exist = document.find((item) => item._data.itemName == itemName);
  //if exist return true else false
  return exist ? true : false;
};
